import cookie from "cookie";
import { writeFileSync } from "fs";
import { Server } from "http";
import Koa from "koa";
import fetch from "node-fetch";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { v4 as uuidv4, validate } from "uuid";
import { cookieJar } from "../cookie-parser.js";
import { extractPsshData, LicenseInformation } from "../drm.js";
import { extractObject } from "../extractor.js";
import { Config } from "../index.js";
import { Logger } from "../io.js";
import { Extractor, Metadata } from "../service.js";

export default class WakanimService extends Extractor {
  private _config: Config;
  private _logger: Logger;
  private _initialized = false;
  private _browser?: Browser;
  private _koa: Koa;
  private _koaServer: Server;
  private _koaAddress: string;
  private _manifests: Record<string, string> = {};

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
    this._browser = await puppeteer.launch({
      headless: !this._config.visual,
      channel:
        typeof this._config.chromeChannel === "string"
          ? (this._config.chromeChannel as "chrome" | "chrome-beta" | "chrome-dev" | "chrome-canary")
          : "chrome",
      args: [`--window-size=${840},${560}`]
    });
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
    ); //https://regex101.com/r/y0G0tj/2
  }

  async fetchMetadata(url: string): Promise<Metadata | null> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const pages: Page[] = [];
    try {
      const page = await this._browser.newPage();
      pages.push(page);
      page.on("popup", (page) => (page ? pages.push(page) : null));
      await page.setCookie(...cookieJar);
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 20000
      });

      await page.waitForSelector("#main-iframe, #breakpoints");
      await delay(3000);
      const result = await page.findRecaptchas();
      if (result.captchas.length > 0) {
        await page.solveRecaptchas();
        await delay(2000);
        await page.waitForSelector("#main-iframe, #breakpoints");
      }

      const metadata = await this._analyzeScripts(page);

      if (metadata === null) {
        throw new Error("Metadata is missing! Make sure you're logged in");
      }

      const manifest = await this._fetchWakanimManifest(metadata.file);

      let psshData: Record<string, Buffer>;
      if (!manifest || !(psshData = await extractPsshData(this._logger, manifest))) {
        throw new Error("an error occurred while parsing the manifest");
      }

      const rqId: string | undefined = await page.evaluate(() => (window as { rqId?: string }).rqId);
      const rqIdS: string | undefined = await page.evaluate(() => (window as { rqIdS?: string }).rqIdS);

      if (!rqId || !rqIdS) {
        throw new Error("Essential fields were missing!");
      }

      const licenseInformation: LicenseInformation = {
        url: metadata.drm.widevine.url,
        headers: {
          "user-agent": (await this._browser.userAgent()).replaceAll("HeadlessChrome", "Chrome"),
          authorization: metadata.drm.widevine.headers[0].value,
          userid: metadata.drm.widevine.headers[1].value,
          d1: metadata.drm.widevine.headers[2].value,
          rqid: rqId,
          rqids: rqIdS
        },
        psshData: psshData
      };
      const episodeId = uuidv4();
      if (!this._config.simulate && !this._config.onlyDrm) {
        this._makeManifestAvailable(episodeId, manifest);
      }
      const downloadMetadata: Metadata = {
        type: "episode",
        source: {
          url: url,
          manifest: {
            url: `${this._koaAddress}/${episodeId}`,
            cleanup: () => this._removeManifest(episodeId)
          },
          licenseInformation: licenseInformation
        }
      };
      return downloadMetadata;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async _analyzeScripts(page: Page): Promise<WakanimDrmMetadata | null> {
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

  private async _fetchWakanimManifest(url: string): Promise<string | null> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const cookieHeader = cookieJar
      .filter(
        (cookie) =>
          cookie.domain.toLowerCase() === "wakanim.tv" ||
          cookie.domain.toLowerCase() === ".wakanim.tv" ||
          cookie.domain.toLowerCase() === "www.wakanim.tv" ||
          cookie.domain.toLowerCase() === ".www.wakanim.tv"
      )
      .map((cookieObject) => cookie.serialize(cookieObject.name, cookieObject.value))
      .join("; ");
    this._logger.debug(this.name, "fetching manifest");
    const response = await fetch(url, {
      headers: {
        "user-agent": (await this._browser.userAgent()).replaceAll("HeadlessChrome", "Chrome"),
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
    (object as object).hasOwnProperty("file") &&
    typeof (object as { file: unknown }).file === "string" &&
    (object as object).hasOwnProperty("drm") &&
    typeof (object as { drm: unknown }).drm === "object" &&
    (object as { drm: object }).drm.hasOwnProperty("widevine") &&
    typeof (object as { drm: { widevine: unknown } }).drm.widevine === "object" &&
    (object as { drm: { widevine: object } }).drm.widevine.hasOwnProperty("url") &&
    typeof (object as { drm: { widevine: { url: unknown } } }).drm.widevine.url === "string" &&
    typeof (object as { drm: { widevine: { headers: unknown } } }).drm.widevine.headers === "object" &&
    !!Object.keys((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers).find(
      (key) =>
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: unknown })[key] === "object" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: object })[key].hasOwnProperty("name") &&
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: unknown } })[key].name ===
          "string" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: string } })[key].name ===
          "Authorization" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: object })[key].hasOwnProperty("value") &&
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { value: unknown } })[key].value ===
          "string"
    ) &&
    !!Object.keys((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as object).find(
      (key) =>
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: unknown })[key] === "object" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: object })[key].hasOwnProperty("name") &&
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: unknown } })[key].name ===
          "string" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: string } })[key].name === "UserId" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: object })[key].hasOwnProperty("value") &&
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { value: unknown } })[key].value ===
          "string"
    ) &&
    !!Object.keys((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as object).find(
      (key) =>
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: unknown })[key] === "object" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: object })[key].hasOwnProperty("name") &&
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: unknown } })[key].name ===
          "string" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: string } })[key].name === "D1" &&
        ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: object })[key].hasOwnProperty("value") &&
        typeof ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { value: unknown } })[key].value ===
          "string"
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
