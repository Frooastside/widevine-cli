import cookie from "cookie";
import { writeFileSync } from "fs";
import { Server } from "http";
import Koa from "koa";
import fetch from "node-fetch";
import { exit } from "process";
import { Browser, Page, Protocol } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { v4 as uuidv4, validate } from "uuid";
import { addCookies, cookieJar, writeCookieJar } from "../cookie-parser.js";
import { extractPsshData } from "../drm.js";
import { extractObject } from "../extractor.js";
import { Config } from "../index.js";
import { Logger } from "../io.js";
import { ContainerMetadata, EpisodeMetadata, Extractor, Metadata } from "../service.js";

export default class WakanimService extends Extractor {
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
    return /^(https?:)\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/(show|episode)\/[0-9]+\/[\-a-zA-Z0-9]+\/?(season\/[0-9]+\/[\-a-zA-Z0-9]+)?\/?/gi.test(
      url
    ) /* https://regex101.com/r/y0G0tj/2 */;
  }

  async fetchMetadata(url: string): Promise<Metadata | null> {
    if (
      /^(https?:)\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/(episode)\/[0-9]+\/[\-a-zA-Z0-9]+\/?/gi.test(
        url
      ) /* https://regex101.com/r/2T6ZsI/1 */
    ) {
      return await this._fetchEpisodeMetadata(url);
    } else if (
      /^(https?:)\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/(show)\/[0-9]+\/[\-a-zA-Z0-9]+\/?(season\/[0-9]+\/[\-a-zA-Z0-9]+)\/?/gi.test(
        url
      ) /* https://regex101.com/r/PHufNF/1 */
    ) {
      return await this._fetchSeasonMetadata(url);
    } else {
      throw new Error("whole containers are not supported yet");
    }
  }

  private async _fetchSeasonMetadata(url: string): Promise<ContainerMetadata | null> {
    const pages: Page[] = [];
    try {
      const page = await this._setupPage(url, pages);
      const title = await page.evaluate(() => (<{ content?: string }>document.querySelector(".serie .container meta[itemprop=\"name\"]"))?.content);
      const episodes = await page.evaluate(() =>
        [...document.querySelectorAll("#container-sub .list-episodes .list-episodes-container>li>div>a")].map(
          (episode) => (<HTMLLinkElement>episode)?.href
        )
      );
      if (!episodes) {
        throw new Error("an error occurred while extracting the episodes");
      }
      const episodeMetadataList: EpisodeMetadata[] = [];
      for (const url of episodes) {
        try {
          const episodeMetadata = await this._fetchEpisodeMetadata(url);
          if (!episodeMetadata) {
            throw new Error(`got empty episode metadata from "${url}"`);
          }
          episodeMetadataList.push(episodeMetadata);
        } catch (error) {
          this._logger.debug(this.name, error, (<Error>error)?.stack);
          this._logger.error(this.name, error);
          if (this._config.ignoreErrors) {
            continue;
          } else {
            exit(1);
          }
        }
      }
      if (!episodeMetadataList.length) {
        throw new Error("could not fetch the metadata of any episode");
      }
      const containerMetadata: ContainerMetadata = {
        type: "container",
        source: {
          url: url
        },
        contents: episodeMetadataList,
        title: title
      };
      await this._saveCookies(page);
      return containerMetadata;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }
  private async _saveCookies(page: Page) {
    const client = await page.target().createCDPSession();
    if (client) {
      const cookies = (await client.send("Network.getAllCookies")).cookies;
      addCookies(cookies);
      writeCookieJar();
    }
  }

  private async _fetchEpisodeMetadata(url: string): Promise<EpisodeMetadata | null> {
    const pages: Page[] = [];
    try {
      const page = await this._setupPage(url, pages);
      const embeddedMetadata = await this._extractDrmMetadata(page);
      if (embeddedMetadata === null) {
        throw new Error("Embedded Metadata was not found! Make sure you're logged in");
      }
      const manifest = await this._fetchWakanimManifest(embeddedMetadata.file, await page.cookies());
      let psshData: Record<string, Buffer>;
      if (!manifest || !(psshData = await extractPsshData(this._logger, manifest))) {
        throw new Error("an error occurred while parsing the manifest");
      }

      const rqId: string | undefined = await page.evaluate(() => (window as { rqId?: string }).rqId);
      const rqIdS: string | undefined = await page.evaluate(() => (window as { rqIdS?: string }).rqIdS);
      if (!rqId || !rqIdS) {
        throw new Error("Essential fields were missing!");
      }
      const episodeIndex = await page.evaluate(
        () => (<{ content?: string }>document.querySelector(".episode .container meta[itemprop=\"episodeNumber\"]"))?.content
      );
      const seasonIndex = await page.evaluate(
        () =>
          (<{ content?: string }>document.querySelector(".episode .container span[itemprop=\"partOfSeason\"] meta[itemprop=\"seasonNumber\"]"))?.content
      );
      const container = await page.evaluate(
        () => (<{ content?: string }>document.querySelector(".episode .container span[itemprop=\"partOfSeries\"] meta[itemprop=\"name\"]"))?.content
      );
      const title = await page.evaluate(() => (<{ content?: string }>document.querySelector(".episode .container meta[itemprop=\"name\"]"))?.content);

      const episodeId = uuidv4();
      if (!this._config.simulate && !this._config.onlyDrm) {
        this._makeManifestAvailable(episodeId, manifest);
      }
      const metadata: Metadata = {
        type: "episode",
        title: title,
        container: container,
        season: !!seasonIndex ? Number(seasonIndex) : undefined,
        index: !!episodeIndex ? Number(episodeIndex) : undefined,
        source: {
          url: url,
          manifest: {
            url: `${this._koaAddress}/${episodeId}`,
            cleanup: () => this._removeManifest(episodeId)
          },
          licenseInformation: {
            url: embeddedMetadata.drm.widevine.url,
            headers: {
              "user-agent": this._userAgent,
              authorization: embeddedMetadata.drm.widevine.headers[0].value,
              userid: embeddedMetadata.drm.widevine.headers[1].value,
              d1: embeddedMetadata.drm.widevine.headers[2].value,
              rqid: rqId,
              rqids: rqIdS
            },
            psshData: psshData
          }
        }
      };
      await this._saveCookies(page);
      return metadata;
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
    this._logger.debug(this.name, `visiting "${url}"`);
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    await page.waitForSelector("#main-iframe, #breakpoints");
    await delay(2000);
    const mainIframe = await page.$("#main-iframe");
    if (mainIframe !== null) {
      this._logger.debug(this.name, "seems like incapsula wants us to solve a captcha, be prepared.");
      for (const frame of page.mainFrame().childFrames()) {
        await frame.solveRecaptchas();
      }
      await delay(1000);
      await page.waitForSelector("#main-iframe, #breakpoints");
      await delay(2000);
    }
    this._logger.debug(this.name, `finished loading "${url}"`);
    if (this._config.verbose) {
      writeFileSync(`wakanim-page-${uuidv4()}.html`, await page.content());
    }
    return page;
  }

  private async _extractDrmMetadata(page: Page): Promise<WakanimDrmMetadata | null> {
    const scripts = await Promise.all(
      (
        await page.$$("script")
      ).map(async (scriptHandle) => ({ handle: scriptHandle, innerHTML: await scriptHandle.evaluate((script) => script.innerHTML) }))
    );
    for (const script of scripts) {
      if (!script.innerHTML || !script.innerHTML.trim()) {
        continue;
      }
      const unparsed = script.innerHTML.trim();
      try {
        const foundMetadata = extractObject<WakanimDrmMetadata>(unparsed, _isWakanimDrmMetadata);
        if (foundMetadata) {
          return foundMetadata;
        }
      } catch (error) {
        this._logger.debug(this.name, "an error occurred while trying to find metadata objects, ignoring", error, (<Error>error)?.stack);
      }
    }
    return null;
  }

  private async _fetchWakanimManifest(url: string, cookies: Protocol.Network.Cookie[]): Promise<string | null> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const cookieHeader = cookies.map((cookieObject) => cookie.serialize(cookieObject.name, cookieObject.value)).join("; ");
    this._logger.debug(this.name, "fetching manifest");
    const response = await fetch(url, {
      headers: {
        "user-agent": this._userAgent,
        cookie: cookieHeader
      }
    });
    const manifest = await response.text();
    if (this._config.verbose) {
      writeFileSync(`wakanim-manifest-${uuidv4()}.xml`, manifest);
    }
    return manifest;
  }

  get name(): string {
    return "Wakanim";
  }
  get version(): string {
    return "0.0.1";
  }

  get ready(): boolean {
    return this._initialized;
  }
}

function _isWakanimDrmMetadata(object: unknown): object is WakanimDrmMetadata {
  return (
    typeof object === "object" &&
    (<object>object).hasOwnProperty("file") &&
    typeof (<{ file: unknown }>object).file === "string" &&
    (<object>object).hasOwnProperty("drm") &&
    typeof (<{ drm: unknown }>object).drm === "object" &&
    (<{ drm: object }>object).drm.hasOwnProperty("widevine") &&
    typeof (<{ drm: { widevine: unknown } }>object).drm.widevine === "object" &&
    (<{ drm: { widevine: object } }>object).drm.widevine.hasOwnProperty("url") &&
    typeof (<{ drm: { widevine: { url: unknown } } }>object).drm.widevine.url === "string" &&
    typeof (<{ drm: { widevine: { headers: unknown } } }>object).drm.widevine.headers === "object" &&
    !!Object.keys((<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers).find(
      (key) =>
        typeof (<Record<string, unknown>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key] === "object" &&
        (<Record<string, object>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].hasOwnProperty("name") &&
        typeof (<Record<string, { name: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].name ===
          "string" &&
        (<Record<string, { name: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].name ===
          "Authorization" &&
        (<Record<string, object>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].hasOwnProperty("value") &&
        typeof (<Record<string, { value: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].value === "string"
    ) &&
    !!Object.keys((<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers).find(
      (key) =>
        typeof (<Record<string, unknown>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key] === "object" &&
        (<Record<string, object>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].hasOwnProperty("name") &&
        typeof (<Record<string, { name: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].name ===
          "string" &&
        (<Record<string, { name: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].name === "UserId" &&
        (<Record<string, object>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].hasOwnProperty("value") &&
        typeof (<Record<string, { value: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].value === "string"
    ) &&
    !!Object.keys((<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers).find(
      (key) =>
        typeof (<Record<string, unknown>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key] === "object" &&
        (<Record<string, object>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].hasOwnProperty("name") &&
        typeof (<Record<string, { name: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].name ===
          "string" &&
        (<Record<string, { name: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].name === "D1" &&
        (<Record<string, object>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].hasOwnProperty("value") &&
        typeof (<Record<string, { value: unknown }>>(<{ drm: { widevine: { headers: object } } }>object).drm.widevine.headers)[key].value === "string"
    )
  );
}

type WakanimDrmMetadata = {
  file: string;
  drm: {
    widevine: {
      url: string;
      headers: WakanimDrmMetadataHeaders;
    };
  };
};

type WakanimDrmMetadataHeaders = [
  {
    name: "Authorization";
    value: string;
  },
  {
    name: "UserId";
    value: string;
  },
  {
    name: "D1";
    value: string;
  }
];

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
