import { writeFileSync } from "fs";
import { Server } from "http";
import Koa from "koa";
import { exit } from "process";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { v4 as uuidv4, validate } from "uuid";
import { addCookies, cookieJar, writeCookieJar } from "../cookie-parser.js";
import { extractPsshData } from "../drm.js";
import { Config } from "../index.js";
import { Logger } from "../io.js";
import { ContainerMetadata, EpisodeMetadata, Extractor, Metadata } from "../service.js";
import { URL } from "url";
import { createCipheriv } from "crypto";
import { format } from "util";

export default class WakanimService extends Extractor {
  private _config: Config;
  private _logger: Logger;
  private _initialized = false;
  private _browser?: Browser;
  private _koa: Koa;
  private _koaServer: Server;
  private _koaAddress: string;
  private _manifests: Record<string, string> = {};
  private _deviceUserAgent = "Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_x86_64 Build/SE1A.220826.006.A1)";
  private _playerUserAgent = "Wakanim/7.1.0 (Linux;Android 12) ExoPlayerLib/2.13.3";
  private _userId?: string;
  private _accessToken?: string;
  private _premiumAccess?: boolean;

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
    this._playerUserAgent = (await this._browser.userAgent()).replace("HeadlessChrome/", "Chrome/");
    if (this._playerUserAgent.includes("Linux") && !this._playerUserAgent.includes("Android")) {
      this._playerUserAgent = this._playerUserAgent.replace(/\(([^)]+)\)/, "(Windows NT 10.0; Win64; x64)");
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
    if (!this._accessToken) {
      if (!(await this._login())) {
        throw new Error("an error occurred while trying to log in to wakanim services");
      }
    }
    if (
      /^https?:\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/episode\/([0-9]+)\/[\-a-zA-Z0-9]+\/?/gi.test(
        url
      ) /* https://regex101.com/r/2T6ZsI/2 */
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

  private async _login(): Promise<boolean> {
    if (this._config.anonymous || (!this._config.credentials && !this._config.refreshToken)) {
      throw new Error("Wakanim requires credentials with --credentials or a refresh token with --refresh-token to log in");
    }
    if (this._config.refreshToken) {
      const body = `client_id=wakanim.android.test2&grant_type=refresh_token&refresh_token=${
        this._config.refreshToken
      }&response_type=code+id_token+token&client_secret=sypzbgkAPqTd9qrZ12oP&scope=email+openid+profile+offline_access+read&redirect_uri=wakanimandroidapp%3A%2F%2Fcallback&nonce=${uuidv4()}&state=${uuidv4()}`;
      const loginResponse = await fetch("https://account.wakanim.tv/core/connect/token", {
        method: "POST",
        headers: {
          "User-Agent": this._deviceUserAgent,
          "X-DeviceType": "Google",
          "X-SoftwareVersion": "12 S",
          "X-AppVersion": "7.1.0",
          "X-DeviceVersion": "sdk_gphone64_x86_64",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
      });
      if (!loginResponse.ok) {
        throw new Error("an error occurred while trying to log in", { cause: loginResponse.statusText });
      }
      const loginInformation = await loginResponse.json();
      this._accessToken = loginInformation.access_token;
      if (this._config.verbose) {
        this._logger.debug(this.name, "access token", this._accessToken);
      }
    } else if (this._config.credentials) {
      const tokens = this._config.credentials.split(":");
      if (tokens.length < 2) {
        throw new Error("please provide email and password in the format --credentials EMAIL:PASSWORD");
      }
      const email = tokens[0];
      const password = tokens[1];
      const body = `client_id=wakanim.android.test2&grant_type=password&response_type=code+id_token+token&client_secret=sypzbgkAPqTd9qrZ12oP&username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(
        password
      )}&scope=email+openid+profile+offline_access+read&redirect_uri=wakanimandroidapp%3A%2F%2Fcallback&nonce=${uuidv4()}&state=${uuidv4()}`;
      const loginResponse = await fetch("https://account.wakanim.tv/core/connect/token", {
        method: "POST",
        headers: {
          "User-Agent": this._deviceUserAgent,
          "X-DeviceType": "Google",
          "X-SoftwareVersion": "12 S",
          "X-AppVersion": "7.1.0",
          "X-DeviceVersion": "sdk_gphone64_x86_64",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
      });
      if (!loginResponse.ok) {
        throw new Error("an error occurred while trying to log in", { cause: loginResponse.statusText });
      }
      const loginInformation = await loginResponse.json();
      this._accessToken = loginInformation.access_token;
      if (this._config.verbose) {
        this._logger.debug(this.name, "access token", this._accessToken);
      }
    } else {
      throw new Error("this should have never had happen");
    }
    if (!this._accessToken) {
      return false;
    }
    const userInformationResponse = await fetch("https://account.wakanim.tv/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._accessToken}`
      }
    });
    if (!userInformationResponse.ok) {
      return false;
    }
    const userInformation = await userInformationResponse.json();
    this._premiumAccess = !!userInformation.accountType;
    this._userId = userInformation.public.userId;
    return true;
  }

  private async _fetchSeasonMetadata(url: string): Promise<ContainerMetadata | null> {
    if (!this._accessToken) {
      throw new Error("Wakanim requires to be logged in supply credentials with --credentials or use a refresh token with --refresh-token");
    }
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
    if (!this._accessToken || !this._userId) {
      throw new Error("Wakanim requires to be logged in supply credentials with --credentials or use a refresh token with --refresh-token");
    }
    try {
      const regexResult = /^https?:\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/episode\/([0-9]+)\/[\-a-zA-Z0-9]+\/?/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the season id");
      }
      const episodeId = regexResult[2];
      const streamInformation = await this._fetchStreamInformation(episodeId, this._accessToken);

      const manifestUrl = new URL(streamInformation.episodeFreeStreaming);
      const kid = manifestUrl.searchParams.get("kid");
      const token = manifestUrl.searchParams.get("token");
      const forge = manifestUrl.searchParams.get("forge");
      if (!kid || !token || !forge) {
        throw new Error("an error occurred while extracting token for the license request");
      }

      this._logger.debug(this.name, "manifest url", streamInformation.episodeFreeStreaming);
      const manifestResponse = await fetch(streamInformation.episodeFreeStreaming, {
        headers: {
          "User-Agent": this._playerUserAgent,
          "X-DeviceType": "Google",
          "X-Player": "2",
          "X-SoftwareVersion": "12 S",
          "X-AppVersion": "7.1.0",
          "X-DeviceVersion": "sdk_gphone64_x86_64"
        }
      });
      if (!manifestResponse.ok) {
        throw new Error("an error occurred while fetching the stream information");
      }
      const manifest = await manifestResponse.text();

      let psshData: Record<string, Buffer>;
      if (!manifest || !(psshData = await extractPsshData(this._logger, manifest))) {
        throw new Error("an error occurred while parsing the manifest");
      }
      const episodeIndex = streamInformation.numero;
      const seasonIndex = Number(streamInformation.season.shortName.substring(1));
      const container = streamInformation.show.name;
      const title = streamInformation.title;

      const manifestId = uuidv4();
      if (!this._config.simulate && !this._config.onlyDrm) {
        this._makeManifestAvailable(manifestId, manifest);
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
            url: `${this._koaAddress}/${manifestId}`,
            cleanup: () => this._removeManifest(manifestId)
          },
          licenseInformation: {
            url: `https://app-api.wakanim.tv/api/key/widevineapp?kid=${kid}`,
            headers: {
              "User-Agent": this._playerUserAgent,
              Authorization: token,
              "X-DeviceType": "Google",
              "X-Player": "2",
              "X-SoftwareVersion": "12 S",
              "X-AppVersion": "7.1.0",
              "X-DeviceVersion": "sdk_gphone64_x86_64",
              "X-HToken-Forge": forge,
              "X-HToken": calculateHToken(this._userId, forge, kid, "wakanim.android.test2"),
              "Content-Type": "application/octet-stream"
            },
            psshData: psshData
          }
        }
      };
      return metadata;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
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

  private async _fetchStreamInformation(episodeId: string, accessToken: string) {
    const streamInformationResponse = await fetch(`https://account.wakanim.tv/api/catalogue/episodestreamingfree?Id=${episodeId}`, {
      method: "GET",
      headers: {
        "User-Agent": this._playerUserAgent,
        Authorization: `Bearer ${accessToken}`,
        "X-DeviceType": "Google",
        "X-Player": "2",
        "X-SoftwareVersion": "12 S",
        "X-AppVersion": "7.1.0",
        "X-DeviceVersion": "sdk_gphone64_x86_64",
        "Content-Type": "application/octet-stream"
      }
    });
    if (!streamInformationResponse.ok) {
      throw new Error("an error occurred while fetching the stream information");
    }
    const streamInformation = await streamInformationResponse.json();
    if (this._config.verbose) {
      writeFileSync(`wakanim-stream-${uuidv4()}.json`, JSON.stringify(streamInformation, null, 2));
    }
    return streamInformation;
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

function calculateHToken(userId: string, iv: string, kid: string, client: string): string {
  const d0c_format = "@%s@Dew#@WAK@%s@N1M@%s";
  const d0c_output = format(d0c_format, client, kid, userId);
  const encryptionKey = Buffer.from("0484032047dd341820aa19621bdc3459", "hex");
  const cipher = createCipheriv("aes-128-cbc", encryptionKey, Buffer.from(iv, "ascii"));
  let encrypted = cipher.update(d0c_output, "ascii", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
