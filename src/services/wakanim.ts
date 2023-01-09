import cookie from "cookie";
import { Server } from "http";
import Koa from "koa";
import fetch from "node-fetch";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { v4 as uuidv4, validate } from "uuid";
import { cookieJar } from "../cookie-parser.js";
import { extractPsshData, LicenseInformation } from "../drm.js";
import { extractObject } from "../extractor.js";
import { configuration } from "../index.js";
import { logger } from "../io.js";
import { Metadata, Service } from "../service.js";

export default class WakanimService extends Service {
  private _browser?: Browser;
  private _koa: Koa;
  private _koaServer: Server;
  private _koaAddress: string;
  private _manifests: Record<string, string> = {};

  constructor() {
    super();
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
    this._browser = await puppeteer.launch({
      headless: !configuration.visual,
      channel: "chrome",
      args: [`--window-size=${840},${560}`]
    });
  }

  async free() {
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
        throw new Error("Metdata is missing!");
      }

      const manifest = await this._fetchWakanimManifest(metadata.file);

      let psshData: Record<string, Buffer>;
      if (!manifest || !(psshData = await extractPsshData(manifest))) {
        throw new Error("an error occurred while parsing the manifest");
      }

      const rqId: string | undefined = await page.evaluate(() => (window as any).rqId);
      const rqIdS: string | undefined = await page.evaluate(() => (window as any).rqIdS);

      if (!rqId || !rqIdS) {
        throw new Error("Essential fields were missing!");
      }

      const licenseInformation: LicenseInformation = {
        url: metadata.drm.widevine.url,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
          authorization: metadata.drm.widevine.headers[0].value,
          userid: metadata.drm.widevine.headers[1].value,
          d1: metadata.drm.widevine.headers[2].value,
          rqid: rqId,
          rqids: rqIdS
        },
        psshData: psshData
      };
      const episodeId = uuidv4();
      if (!configuration.simulate && !configuration.onlyDrm) {
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
      logger.error(this.name, error);
      return null;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async _analyzeScripts(page: Page): Promise<WakanimDRMMetadata | null> {
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

      const foundMetadata = extractObject<WakanimDRMMetadata>(unparsed, _isWakanimDRMMetadata);

      if (foundMetadata) {
        return foundMetadata;
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
    const response = await fetch(url, {
      headers: {
        "user-agent": await this._browser.userAgent(),
        cookie: cookieHeader
      }
    });
    const manifest = await response.text();
    console.log(manifest);

    return manifest;
  }

  get name(): string {
    return "Wakanim";
  }
  get version(): string {
    return "0.0.1";
  }
}

function _isWakanimDRMMetadata(object: unknown): object is WakanimDRMMetadata {
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

type WakanimDRMMetadata = {
  file: string;
  drm: {
    widevine: {
      url: string;
      headers: WakanimDRMMetadataHeaders;
    };
  };
};

type WakanimDRMMetadataHeaders = [
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