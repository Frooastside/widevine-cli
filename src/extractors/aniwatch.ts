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
import cheerio, { load } from "cheerio";
import CryptoJS from "crypto-js";

export default class AniwatchService extends Extractor {
  private _config: Config;
  private _logger: Logger;
  private _initialized = false;

  constructor(config: Config, logger: Logger) {
    super();
    this._config = config;
    this._logger = logger;
  }

  async initialize() {
    this._initialized = true;
  }

  async release() {
    this._initialized = false;
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
    try {
      const regexResult = /^(https?:)\/\/(www\.)?aniwatch\.to\/(watch\/)?([a-z0-9]+\-)+([0-9]+)$/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the season id");
      }
      const seasonId = regexResult[5];
      const episodeList = await this._fetchEpisodeList(seasonId);
      this._logger.jsonDump("DEBUG", this.name, episodeList);
      const episodeMetadataList = await Promise.all(
        episodeList.map(async (episode) => {
          const episodeMetadata = await this._fetchEpisodeMetadata(episode.episodeId);
          if (!episodeMetadata) {
            return null;
          }
          episodeMetadata.index = episode.index;
          episodeMetadata.title = episode.title;
          return episodeMetadata;
        })
      );
      this._logger.jsonDump("DEBUG", this.name, episodeMetadataList);
      return null;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    }
  }

  private async _fetchEpisodeList(seasonId: string) {
    const $ = await this._fetchHtmlContent(`https://aniwatch.to/ajax/v2/episode/list/${seasonId}`);
    const episodes = $("a.ssl-item.ep-item")
      .toArray()
      .map((episodeElement) => ({
        title: episodeElement.attribs["title"],
        index: parseInt(episodeElement.attribs["data-number"]),
        episodeId: episodeElement.attribs["data-id"],
        url: episodeElement.attribs["href"]
      }));
    return episodes;
  }

  private async _fetchEpisodeMetadataFromUrl(url: string): Promise<EpisodeMetadata | null> {
    try {
      const regexResult = /^(https?:)\/\/(www\.)?aniwatch\.to\/(watch\/)?([a-z0-9]+\-)+([0-9]+)$/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the episode id");
      }
      const episodeId = regexResult[6];
      return await this._fetchEpisodeMetadata(episodeId);
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    }
  }

  private async _fetchEpisodeMetadata(episodeId: string): Promise<EpisodeMetadata | null> {
    try {
      const servers = await this._fetchServers(episodeId);
      this._logger.jsonDump("DEBUG", this.name, servers);
      const server = servers.find((server) => server.provider === "MegaCloud" && !server.dub);
      if (!server) {
        throw new Error("an error occurred, the selected episode is not available on the supported file hosters");
      }
      this._logger.jsonDump("DEBUG", this.name, server);
      const sourceProviderResponse = await fetch(`https://aniwatch.to/ajax/v2/episode/sources?id=${server.serverItemId}`);
      if (!sourceProviderResponse.ok) {
        throw new Error("an error occurred while fetching the source provider");
      }
      const sourceProviderJson = await sourceProviderResponse.json();
      this._logger.jsonDump("DEBUG", this.name, sourceProviderJson);
      const sourceRegexResult = /^(https?:)\/\/(www\.)?megacloud\.tv\/embed-2\/e-1\/([a-zA-Z0-9]+)/gi.exec(sourceProviderJson.link);
      if (!sourceRegexResult) {
        throw new Error("an error occurred while extracting the source id");
      }
      const sourceProviderId = sourceRegexResult[3];
      this._logger.debug(this.name, "source provider id", sourceProviderId);
      const sourceInformationResponse = await fetch(`https://megacloud.tv/embed-2/ajax/e-1/getSources?id=${sourceProviderId}`, {
        method: "GET"
      });
      if (!sourceInformationResponse.ok) {
        throw new Error("an error occurred while fetching the source information");
      }
      const sourceInformationJson = await sourceInformationResponse.json();
      this._logger.jsonDump("DEBUG", this.name, sourceInformationJson);

      return null;
    } catch (error) {
      this._logger.debug(this.name, error, (<Error>error)?.stack);
      this._logger.error(this.name, error);
      return null;
    }
  }

  private async _fetchServers(episodeId: string) {
    const $ = await this._fetchHtmlContent(`https://aniwatch.to/ajax/v2/episode/servers?episodeId=${episodeId}`);
    const servers = $("div.item.server-item")
      .toArray()
      .map((serverElement) => ({
        dub: serverElement.attribs["data-type"] === "dub",
        index: parseInt(serverElement.attribs["data-server-id"]),
        serverItemId: serverElement.attribs["data-id"],
        provider: $(serverElement).find(".btn").text()
      }));
    return servers;
  }

  private async _fetchHtmlContent(url: string) {
    const episodeListResponse = await fetch(url, {
      method: "GET"
    });
    if (!episodeListResponse.ok) {
      throw new Error("an error occurred while fetching the episode list");
    }
    const jsonRepsonse = await episodeListResponse.json();
    if (!jsonRepsonse.status) {
      throw new Error("an error occurred while fetching the episode list, server status is bad");
    }
    const rawHtml = decodeURIComponent(jsonRepsonse.html);
    const $ = load(rawHtml);
    return $;
  }

  private _decrypt(encryptedValue: string, key: string) {
    const valueBuffer = CryptoJS.AES.decrypt(encryptedValue, key);
    return JSON.parse(valueBuffer.toString(CryptoJS.enc.Utf8));
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
