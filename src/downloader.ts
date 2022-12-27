import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { cookies } from "./cookie-parser.js";
import { extractObject } from "./extractor.js";

/*declare module "puppeteer" {
  interface Page extends RecaptchaPluginPageAdditions {
    __eslinterror: never;
  }
  interface Frame extends RecaptchaPluginPageAdditions {
    __eslinterror: never;
  }
}*/

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

export default class Downloader {
  private _browser?: Browser;

  async launch() {
    this._browser = await puppeteer.launch({
      headless: false,
      channel: "chrome",
      args: [`--window-size=${840},${560}`]
    });
  }

  async download(uri: string): Promise<string> {
    const url: URL = new URL(uri);
    return await this._parseWakanim(url);
    /*switch (true) {
      case /voe\.sx|voeunblock[0-9]*\.com/.test(url.hostname):
        return this._fetchSourceVoe(url.href);
      case /vupload\.net/.test(url.hostname):
        return this._fetchSourceVupload(url.href);
      case /streamtape\.com/.test(url.hostname):
        return this._fetchSourceStreamtape(url.href);
      case /bs\.to|burningseries\.co|burningseries\.sx|burningseries\.ac|burningseries\.vc|burningseries\.cx|burningseries\.nz|burningseries\.se/.test(
        url.hostname
      ):
        if (
          /(https:\/\/(bs\.to|burningseries\.co|burningseries\.sx|burningseries\.ac|burningseries\.vc|burningseries\.cx|burningseries\.nz|burningseries\.se)\/serie\/[a-zA-Z0-9\-]*\/[0-9]*\/[0-9]*[a-zA-Z0-9\-]*\/?[a-z]*)/g.test(
            url.href
          )
        ) {
          return await this._fetchBSEpisode(url.href);
        } else {
          throw new Error("found bs but unknown method");
        }
      default:
        throw new Error("Not supported.");
    }*/
  }

  private async _parseWakanim(url: URL): Promise<string> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const pages: Page[] = [];
    try {
      const mainPage = await this._browser.newPage();
      pages.push(mainPage);
      mainPage.on("popup", (page) => (page ? pages.push(page) : null));
      await mainPage.setCookie(...cookies);
      await mainPage.goto(url.href, {
        waitUntil: "networkidle0",
        timeout: 20000
      });

      await mainPage.waitForSelector("#main-iframe, #breakpoints");
      const result = await mainPage.solveRecaptchas();
      if (result.captchas.length > 0) {
        await mainPage.waitForSelector("#main-iframe, #breakpoints");
      }

      const metadata = await this._analyzeScripts(mainPage);

      if (metadata) {
        return JSON.stringify(metadata);
      }
    } catch (error) {
      console.error(error);
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
    return "0";
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
      //const index = scripts.findIndex((compare) => compare === script);
      /*const path = await script.handle.evaluate((element) => {
        let path = `[${element.tagName}:${element.id}:${element.className}]`;
        let parent: HTMLElement | null;
        let current: HTMLElement = element;
        while ((parent = current.parentElement) !== null) {
          path = `[${parent.tagName}:${parent.id}:${parent.className}]/${path}`;
          current = parent;
        }
        return path;
      });*/

      const foundMetadata = extractObject<WakanimDRMMetadata>(unparsed, this._isWakanimDRMMetadata);

      if (foundMetadata) {
        return foundMetadata;
      }
    }

    return null;
  }

  private _isWakanimDRMMetadata(object: unknown): object is WakanimDRMMetadata {
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
          ((object as { drm: { widevine: { headers: object } } }).drm.widevine.headers as { [key: string]: { name: string } })[key].name ===
            "UserId" &&
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

  /*private async _fetchBSEpisode(url: string): Promise<string> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const pages: Page[] = [];
    try {
      const bsPage = await this._browser.newPage();
      pages.push(bsPage);
      bsPage.on("popup", (page) => (page ? pages.push(page) : null));

      await bsPage.goto(url, {
        waitUntil: "networkidle0",
        timeout: 20000
      });

      await this._triggerAds(bsPage);

      await bsPage.waitForSelector(".hoster-tabs.top");
      const hosters: {
        [key: string]: string;
      } = await bsPage.evaluate(() => {
        const hosters: {
          [key: string]: string;
        } = {};
        Array.from(document.querySelector(".hoster-tabs.top")?.querySelectorAll("li") ?? [])
          .map((hoster) => hoster.querySelector("a"))
          .forEach((element) => {
            if (element !== null) {
              hosters[element.innerText.trim()] = element.href;
            }
          });
        return hosters;
      });

      let hoster: string | undefined;
      if ((hoster = Object.keys(hosters).find((hoster) => hoster == "Streamtape" || hoster === "VOE" || hoster == "VUPLOAD"))) {
      } else {
        throw new Error("Unsupported hoster");
      }

      await bsPage.goto(hosters[hoster], {
        waitUntil: "networkidle0",
        timeout: 0
      });

      await this._triggerAds(bsPage);

      await bsPage.waitForSelector('*[class="play"]');
      await bsPage.click('*[class="play"]');

      const captchaTimeout = setTimeout(async () => {
        const solutions: SolveRecaptchasResult = await bsPage.solveRecaptchas();

        if (solutions.error) {
          throw new Error(solutions.error);
        }
      }, 5000);

      let handler: (event: Page) => void;
      if (["VOE", "VUPLOAD"].includes(hoster)) {
        return await new Promise<string>(async (resolve, reject) => {
          const timeout = setTimeout(() => {
            reject("Captcha timeout.");
          }, 180000);
          handler = (page) => {
            const url = page.url();
            if (url.match(/(https:\/\/(voe\.sx|voeunblock[0-9]*\.com|voe\.sx\/e|voeunblock[0-9]*\.com\/e)\/[a-zA-Z0-9]*)/g)) {
              clearTimeout(captchaTimeout);
              this._fetchSourceVoe(url)
                .then((source) => {
                  clearTimeout(timeout);
                  resolve(source);
                })
                .catch(() => reject());
            } else if (url.match(/(https:\/\/(vupload\.com|vupload\.com\/e)\/[a-zA-Z0-9]*)/g)) {
              clearTimeout(captchaTimeout);
              this._fetchSourceVupload(url)
                .then((source) => {
                  clearTimeout(timeout);
                  resolve(source);
                })
                .catch(() => reject());
            }
          };
          bsPage.on("popup", handler);
        });
      } else if (["Streamtape"].includes(hoster)) {
        return await new Promise<string>(async (resolve, reject) => {
          const timeout = setTimeout(() => {
            reject("Captcha timeout.");
          }, 180000);
          bsPage.waitForFrame(
            (frame) => {
              const url = frame.url();
              if (url.match(/(https:\/\/(streamtape\.com|streamtape\.com\/e)\/[a-zA-Z0-9]*)/g)) {
                clearTimeout(captchaTimeout);
                this._fetchSourceStreamtape(url)
                  .then((source) => {
                    clearTimeout(timeout);
                    resolve(source);
                  })
                  .catch(() => reject());
                return true;
              }
              return false;
            },
            { timeout: 0 }
          );
        });
      } else {
        throw new Error("Unsupported hoster");
      }
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async _fetchSourceVoe(url: string): Promise<string> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const page = await this._browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    try {
      const source = await page.evaluate(() =>
        /\"hls\": \"(https:\/\/delivery-node-[a-z]*\.voe-network\.net\/hls\/,[a-z0-9]*,\.urlset\/master\.m3u8)\"/g.exec(
          document.documentElement.innerHTML
        )
      );
      if (!source || source.length < 2) {
        throw new Error("Source fetch failed.");
      }
      return source[1];
    } finally {
      await page.close();
    }
  }

  private async _fetchSourceVupload(url: string): Promise<string> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const page = await this._browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    try {
      const source = await page.evaluate(() =>
        /src: \"(https:\/\/[a-z]*\.vupload\.net\/hls\/,[a-z0-9]*,\.urlset\/master\.m3u8)\"/g.exec(document.documentElement.innerHTML)
      );
      if (!source || source.length < 2) {
        throw new Error("Source fetch failed.");
      }
      return source[1];
    } finally {
      await page.close();
    }
  }

  private async _fetchSourceStreamtape(url: string): Promise<string> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const pages: Page[] = [];
    const page = await this._browser.newPage();
    pages.push(page);
    page.on("popup", (page) => (page ? pages.push(page) : null));
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    try {
      const source = await page.evaluate(
        () => `https://${(document.querySelector("div#robotlink") as HTMLDivElement)?.innerText.trim().substring(2)}`
      );
      if (!source) {
        throw new Error("Source fetch failed.");
      }
      return source;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async _triggerAds(page: Page) {
    await page.waitForSelector("#root");
    const url = page.url();
    await page.click("#root");
    await delay(500);
    await page.bringToFront();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
  }*/
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
