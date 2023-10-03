import { v4 as uuidv4 } from "uuid";
import { DownloadConfig, globalConfig } from "../index.js";
import { ContainerMetadata, EpisodeMetadata, Extractor, Metadata } from "../service.js";

import { load } from "cheerio";
import { writeFileSync } from "fs";
import { exit } from "process";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { cookieJar } from "../cookie-parser.js";

type Embed = {
  success: boolean;
  link: string;
  embed: "0" | "1";
};

export default class BurningSeriesService extends Extractor {
  private _config: DownloadConfig;
  private _initialized = false;
  private _browser?: Browser;

  constructor(config: DownloadConfig) {
    super();
    this._config = config;
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
  }

  async release() {
    this._initialized = false;
    await this._browser?.close();
  }

  checkResponsibility(url: string): boolean {
    return /^https?:\/\/(www\.)?bs\.to\/serie\/(([a-z0-9\-]+)\/?)(([0-9]+)\/?)?(([0-9]+)\-[a-z0-9\-]+\/?)?([a-z]+)?/gi.test(
      url
    ) /* https://regex101.com/r/zSAzDb/2 */;
  }

  async fetchMetadata(url: string): Promise<Metadata | null> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    if (
      /^https?:\/\/(www\.)?bs\.to\/serie\/(([a-z0-9\-]+)\/?)(([0-9]+)\/?)?(([0-9]+)\-[a-z0-9\-]+\/?)([a-z]+)?/gi.test(
        url
      ) /* https://regex101.com/r/TozeQp/2 */
    ) {
      return await this._fetchEpisodeMetadata(url);
    } else if (/^https?:\/\/(www\.)?bs\.to\/serie\/(([a-z0-9\-]+)\/?)(([0-9]+)\/?)?([a-z]+)?$/gi.test(url) /* https://regex101.com/r/QqEz0V/1 */) {
      return await this._fetchSeasonMetadata(url);
    } else {
      throw new Error("this should have never had happen");
    }
  }

  private async _fetchSeasonMetadata(url: string): Promise<ContainerMetadata | null> {
    try {
      const regexResult = /^https?:\/\/(www\.)?bs\.to\/serie\/(([a-z0-9\-]+)\/?)(([0-9]+)\/?)?([a-z]+)?$/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the season id");
      }
      const showId = regexResult[3];
      const seasonIndex: string | undefined = regexResult[5];
      const languageTag = regexResult[6];

      const $episodePage = await this._fetchHtmlContent(`https://bs.to/serie/${showId}/${seasonIndex ? `${seasonIndex}/` : ""}${languageTag || ""}`);
      const container = $episodePage(".serie #sp_left h2").text().replace($episodePage(".serie #sp_left h2 small").text(), "").trim();
      //[...document.querySelectorAll(".episodes tbody tr")].map(episode => [...[...episode.children][0].children][0]).map(a => ({title: a.title, url: a.href, index: a.innerText }))
      const episodes = $episodePage(".episodes tbody tr")
        .toArray()
        .map((tr) => $episodePage("a", tr).toArray()[0])
        .map((a) => ({ title: a.attribs["title"], url: `https://bs.to/${a.attribs["href"]}`, index: $episodePage(a).text().trim() }));

      const episodeMetadataList: EpisodeMetadata[] = [];
      for (const episode of episodes) {
        try {
          if (!episode) {
            continue;
          }
          const episodeMetadata = await this._fetchEpisodeMetadata(episode.url);
          if (!episodeMetadata) {
            throw new Error(`got empty episode metadata from "${url}"`);
          }
          episodeMetadataList.push(episodeMetadata);
        } catch (error) {
          this.logger.debug(error, (<Error>error)?.stack);
          this.logger.error(error);
          if (globalConfig.ignoreErrors) {
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
        title: container
      };
      return containerMetadata;
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    }
  }

  private async _fetchEpisodeMetadata(url: string): Promise<EpisodeMetadata | null> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const pages: Page[] = [];
    try {
      const regexResult = /^https?:\/\/(www\.)?bs\.to\/serie\/(([a-z0-9\-]+)\/?)(([0-9]+)\/?)?(([0-9]+)\-[a-z0-9\-]+)\/?([a-z]+)?/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the season id");
      }
      const showId = regexResult[3];
      const seasonIndex = regexResult[5] ? Number(regexResult[5]) : 1;
      const episodeId = regexResult[6];
      const episodeIndex = regexResult[7];
      const languageTag = regexResult[8];

      const $episodePage = await this._fetchHtmlContent(
        `https://bs.to/serie/${showId}/${seasonIndex ? `${seasonIndex}/` : ""}${episodeId}/${languageTag || ""}`
      );
      const title = $episodePage(".episode h2 span").text().trim();
      const container = $episodePage(".serie #sp_left h2").text().replace($episodePage(".serie #sp_left h2 small").text(), "").trim();
      const servers = $episodePage(".hoster-tabs li a")
        .toArray()
        .map((hoster) => ({ name: $episodePage(hoster).text().trim(), url: `https://bs.to/${hoster.attribs["href"]}` }));

      //[...document.querySelector(".hoster-tabs").children].map(hoster => hoster.children[0]).map(hoster => ({name: hoster.innerText,url: hoster.href}))

      this.logger.debug("episode", title, container);
      this.logger.debugJsonDump(servers);

      const serverSpecificUrl = servers.find((server) => server.name === "VOE")?.url ?? "";
      this.logger.debugJsonDump(serverSpecificUrl);

      const embed = await this.fetchEmbed(pages, serverSpecificUrl);
      this.logger.debugJsonDump(embed);

      const voeResult = /{\s+'hls':\s+'([^']+)',\s+'video_height':\s+([0-9]+).*\s+}/gim.exec(await (await fetch(embed.link)).text());
      if (!voeResult) {
        throw new Error("voe error");
      }
      const sourceUrl = voeResult[1];

      const metadata: Metadata = {
        type: "episode",
        title: title,
        container: container,
        season: seasonIndex,
        index: !!episodeIndex ? Number(episodeIndex) : undefined,
        source: {
          url: sourceUrl
        }
      };
      return metadata;
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    } finally {
      pages.forEach((page) => (!page.isClosed() ? page.close() : null));
    }
  }

  private async fetchEmbed(pages: Page[], url: string): Promise<Embed> {
    return new Promise(async (resolve, reject) => {
      if (!this._browser) {
        return reject(new Error("Not initialized!"));
      }
      const page = await this._browser.newPage();
      page.on("response", async (response) => {
        if (response.url().includes("/ajax/embed.php")) {
          const embed: Embed = await response.json();
          return resolve(embed);
        }
      });
      pages.push(page);
      page.on("popup", (page) => (page ? pages.push(page) : null));
      await page.setCookie(...cookieJar);

      this.logger.debug(`visiting "${url}"`);

      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 0
      });
      await page.waitForSelector("div.play");
      await page.click("div.play");

      await page.solveRecaptchas();
    });
  }

  private async _fetchHtmlContent(url: string) {
    const response = await fetch(url, {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error("an error occurred while fetching the episode list");
    }
    const jsonRepsonse = await response.text();
    const rawHtml = decodeURIComponent(jsonRepsonse);
    const $ = load(rawHtml);
    return $;
  }

  private async _setupPage(url: string, pages: Page[]): Promise<Page> {
    if (!this._browser) {
      throw new Error("Not initialized!");
    }
    const page = await this._browser.newPage();
    pages.push(page);
    page.on("popup", (page) => (page ? pages.push(page) : null));
    await page.setCookie(...cookieJar);
    this.logger.debugJsonDump(cookieJar);
    this.logger.debug(`visiting "${url}"`);

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    //await page.waitForSelector("#main-iframe, #breakpoints");
    await delay(1000);
    /*const mainIframe = await page.$("#main-iframe");
    if (mainIframe !== null) {
      this.logger.debug("seems like incapsula wants us to solve a captcha, be prepared.");
      for (const frame of page.mainFrame().childFrames()) {
        await frame.solveRecaptchas();
      }
      await delay(1000);
      await page.waitForSelector("#main-iframe, #breakpoints");
      await delay(2000);
    }*/
    this.logger.debug(`finished loading "${url}"`);
    if (globalConfig.debug) {
      //TODO
      writeFileSync(`bs-page-${uuidv4()}.html`, await page.content());
    }

    return page;
  }

  get name(): string {
    return "Burning Series";
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
