import { readFileSync, writeFileSync } from "fs";
import { Server } from "http";
import Koa from "koa";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { v4 as uuidv4, validate } from "uuid";
import { addCookies, cookieJar, writeCookieJar } from "../cookie-parser.js";
import { Config } from "../index.js";
import { Logger } from "../io.js";
import { ContainerMetadata, EpisodeMetadata, Extractor, Metadata } from "../service.js";

export default class AniwatchService extends Extractor {
  private _config: Config;
  private _logger: Logger;
  private _initialized = false;
  private _browser?: Browser;
  private _koa: Koa;
  private _koaServer: Server;
  private _koaAddress: string;
  private _manifests: Record<string, string> = {};
  private _userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";

  constructor(config: Config, logger: Logger) {
    super();
    this._config = config;
    this._logger = logger;
    this._koa = new Koa();
    this._koa.use((context) => {
      const paths = context.request.path.split("/");
      if (paths.length < 2) {
        return (context.response.status = 400);
      }
      const episodeId = paths[1];
      if (!validate(episodeId)) {
        return (context.response.status = 400);
      }
      const manifest = this._manifests[episodeId];
      if (!manifest) {
        return (context.response.status = 400);
      }
      context.response.headers["content-type"] = "application/dash+xml";
      context.response.body = manifest;
    });
    this._koaServer = this._koa.listen();
    const serverAddress = this._koaServer.address();
    const port = typeof serverAddress !== "string" ? serverAddress?.port : Number(serverAddress.split(":")[1]);
    this._koaAddress = `http://localhost:${port}`;
    logger.debug(this.name, `koa server online on port ${port}`, this._koaAddress);
  }

  async initialize() {
    this._initialized = true;
    this._browser = <Browser>await puppeteer.launch({
      headless: !this._config.visual,
      channel:
        typeof this._config.chromeChannel === "string"
          ? (this._config.chromeChannel as "chrome" | "chrome-beta" | "chrome-dev" | "chrome-canary")
          : "chrome",
      args: [`--window-size=${840},${560}`, ...(this._config.chromeUnsecure ? ["--no-sandbox"] : [])]
    });
    this._userAgent = (await this._browser.userAgent()).replace("HeadlessChrome/", "Chrome/");
    if (this._userAgent.includes("Linux") && !this._userAgent.includes("Android")) {
      this._userAgent = this._userAgent.replace(/\(([^)]+)\)/, "(Windows NT 10.0; Win64; x64)");
    }
  }

  async release() {
    this._initialized = false;
    this._browser?.close();
    this._koaServer.closeAllConnections();
    this._koaServer.close();
  }

  private _makeManifestAvailable(id: string, manifest: string) {
    this._manifests[id] = manifest;
  }

  private _removeManifest(id: string) {
    delete this._manifests[id];
  }

  checkResponsibility(url: string): boolean {
    return /^(https?:)\/\/(www\.)?aniwatch\.to\/(watch\/)?([a-z0-9]+\-)+([0-9]+)(\?ep=([0-9]+))?/gi.test(url) /* https://regex101.com/r/HswxzC/1 */;
  }

  async fetchMetadata(url: string): Promise<Metadata | null> {
    if (/^(https?:)\/\/(www\.)?aniwatch\.to\/watch\/([a-z0-9]+\-)+([0-9]+)(\?ep=([0-9]+))/gi.test(url) /* https://regex101.com/r/ChlN5x/1 */) {
      return await this._fetchEpisodeMetadata(url);
    } else if (/^(https?:)\/\/(www\.)?aniwatch\.to\/(watch\/)?([a-z0-9]+\-)+([0-9]+)$/gi.test(url) /* https://regex101.com/r/kVwqQC/1 */) {
      return await this._fetchSeasonMetadata(url);
    } else {
      throw new Error("whole containers are not supported yet");
    }
  }

  private async _fetchSeasonMetadata(url: string): Promise<ContainerMetadata | null> {
    const pages: Page[] = [];
    try {
      const page = await this._setupPage(url, pages);

      await this._saveCookies(page);
      return null;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async _fetchEpisodeMetadata(url: string): Promise<EpisodeMetadata | null> {
    const pages: Page[] = [];
    try {
      const page = await this._setupPage(url, pages);

      await this._saveCookies(page);
      return null;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async _setupPage(url: string, pages: Page[]): Promise<Page> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const page = await this._browser.newPage();
    pages.push(page);
    page.on("popup", (page) => (page ? pages.push(page) : null));
    await page.setCookie(...cookieJar);
    this._logger.jsonDump("DEBUG", this.name, cookieJar);

    await page.setRequestInterception(true);

    this._logger.debug(this.name, `${process.cwd()}`);

    page.on("request", (request) => {
      this._logger.debug(this.name, `request "${request.url()}"`);
      if (request.url() === "https://aniwatch.to/js/watch.min.js?v=2.3") {
        request.respond({
          body: readFileSync("./watch_min.js")
        });
      } else {
        request.continue();
      }
    });

    this._logger.debug(this.name, `visiting "${url}"`);
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    await delay(200000);
    this._logger.debug(this.name, `finished loading "${url}"`);
    if (this._config.verbose) {
      writeFileSync(`aniwatch-page-${uuidv4()}.html`, await page.content());
    }
    return page;
  }

  private async _saveCookies(page: Page) {
    const client = await page.target().createCDPSession();
    if (client) {
      const cookies = (await client.send("Network.getAllCookies")).cookies;
      addCookies(cookies);
      writeCookieJar();
    }
  }

  get name(): string {
    return "Aniwatch";
  }
  get version(): string {
    return "0.0.1";
  }

  get ready(): boolean {
    return this._initialized;
  }
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
