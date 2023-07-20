import { load } from "cheerio";
import CryptoJS from "crypto-js";
import { Deobfuscator } from "deobfuscator";
import * as meriyah from "meriyah";
import {
  isArrowFunctionExpression,
  isBlockStatement,
  isCallExpression,
  isIdentifier,
  isLiteral,
  isMemberExpression,
  isReturnStatement,
  isTryStatement,
  isVariableDeclaration,
  walkTree
} from "../extractor.js";
import { DownloadConfig } from "../index.js";
import { ContainerMetadata, EpisodeMetadata, Extractor, Metadata } from "../service.js";

export interface ContainerData {
  page: string;
  name: string;
  anime_id: string;
  mal_id: string;
  anilist_id: string;
  series_url: string;
}

export interface SourceInformation {
  sources: Source[] | string;
  sourcesBackup: Source[] | string;
  tracks: Track[];
  encrypted: boolean;
  intro: TimedEvent;
  outro: TimedEvent;
  server: number;
}

export interface Source {
  file: string;
  type: string;
}

export interface Track {
  file: string;
  kind: string;
  label?: string;
  default?: boolean;
}

export interface TimedEvent {
  start: number;
  end: number;
}

export default class AniwatchService extends Extractor {
  private _config: DownloadConfig;
  private _initialized = false;

  constructor(config: DownloadConfig) {
    super();
    this._config = config;
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
    if (/^(https?:)\/\/(www\.)?aniwatch\.to\/watch\/([a-z0-9]+\-)+([0-9]+)(\?ep=([0-9]+))/gi.test(url) /* https://regex101.com/r/ChlN5x/4 */) {
      return await this._fetchEpisodeMetadataFromUrl(url);
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
      const containerData = await this._fetchContainerData(url);
      const episodeMetadataList: EpisodeMetadata[] = [];
      for (const episode of episodeList) {
        const episodeMetadata = await this._fetchEpisodeMetadata(seasonId, episode.episodeId, containerData.name);
        if (!episodeMetadata) {
          return null;
        }
        episodeMetadata.title = episode.title;
        episodeMetadataList.push(episodeMetadata);
      }
      const metadata: ContainerMetadata = {
        type: "container",
        contents: episodeMetadataList,
        source: {
          url: url
        }
      };
      return metadata;
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
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
      const regexResult = /^(https?:)\/\/(www\.)?aniwatch\.to\/watch\/([a-z0-9]+\-)+([0-9]+)(\?ep=([0-9]+))/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the episode id");
      }
      const seasonId = regexResult[4];
      const episodeId = regexResult[6];
      return await this._fetchEpisodeMetadata(seasonId, episodeId);
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    }
  }

  private async _fetchEpisodeMetadata(seasonId: string, episodeId: string, container?: string): Promise<EpisodeMetadata | null> {
    try {
      const servers = await this._fetchServers(episodeId);
      const server = servers.find((server) => server.provider === "MegaCloud" && !server.dub);
      if (!server) {
        throw new Error("an error occurred, the selected episode is not available on the supported file hosters");
      }
      const sourceProviderResponse = await fetch(`https://aniwatch.to/ajax/v2/episode/sources?id=${server.serverItemId}`);
      if (!sourceProviderResponse.ok) {
        throw new Error("an error occurred while fetching the source provider");
      }
      const sourceProviderJson = await sourceProviderResponse.json();
      const sourceRegexResult = /^(https?:)\/\/(www\.)?megacloud\.tv\/embed-2\/e-1\/([a-zA-Z0-9]+)/gi.exec(sourceProviderJson.link);
      if (!sourceRegexResult) {
        throw new Error("an error occurred while extracting the source id");
      }
      const sourceProviderId = sourceRegexResult[3];
      const sourceInformationResponse = await fetch(`https://megacloud.tv/embed-2/ajax/e-1/getSources?id=${sourceProviderId}`, {
        method: "GET"
      });
      if (!sourceInformationResponse.ok) {
        throw new Error("an error occurred while fetching the source information");
      }
      const sourceInformationJson: SourceInformation = await sourceInformationResponse.json();

      if (sourceInformationJson.encrypted) {
        if (typeof sourceInformationJson.sources === "string") {
          const encryptionKey = await this._fetchEncryptionKey();
          this.logger.debug("encryption key", encryptionKey);
          sourceInformationJson.sources = this._decrypt(sourceInformationJson.sources, encryptionKey);
          if (!!sourceInformationJson.sourcesBackup && typeof sourceInformationJson.sourcesBackup === "string") {
            sourceInformationJson.sourcesBackup = this._decrypt(sourceInformationJson.sourcesBackup, encryptionKey);
          }
        }
      }

      if (typeof sourceInformationJson.sources === "string") {
        throw new Error("sources are still encrypted and can't be downloaded");
      }

      this.logger.debugJsonDump(sourceInformationJson);

      let episodeTitle: string | undefined;
      let episodeIndex: number | undefined | null;
      try {
        const episodeList = await this._fetchEpisodeList(seasonId);
        for (const episode of episodeList) {
          if (episode.episodeId === episodeId) {
            episodeTitle = episode.title;
            episodeIndex = episode.index;
            break;
          }
        }
        episodeIndex = episodeIndex ?? null;
      } catch (error) {
        this.logger.debug(error, (<Error>error)?.stack);
        this.logger.error(error);
      }

      if (!container) {
        try {
          const containerData = await this._fetchContainerData(`https://aniwatch.to/watch/jujutsu-kaisen-2nd-season-${seasonId}?ep=${episodeId}`);
          container = containerData.name;
        } catch (error) {
          this.logger.debug(error, (<Error>error)?.stack);
          this.logger.error(error);
        }
      }

      const metadata: EpisodeMetadata = {
        type: "episode",
        title: episodeTitle,
        index: episodeIndex,
        container: container,
        source: {
          url: sourceInformationJson.sources[0].file
        },
        subtitles: sourceInformationJson.tracks.filter((track) => track.kind === "captions").map((track) => ({ url: track.file }))
      };

      return metadata;
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    }
  }

  private async _fetchContainerData(url: string) {
    const episodeListResponse = await fetch(url, {
      method: "GET"
    });
    if (!episodeListResponse.ok) {
      throw new Error("an error occurred while fetching the episode list");
    }
    const responseText = await episodeListResponse.text();
    const $ = load(responseText);
    const containerData: ContainerData = JSON.parse($("script#syncData").text());
    return containerData;
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

  private async _fetchEncryptionKey() {
    const scriptUrl = "https://megacloud.tv/js/player/a/prod/e1-player.min.js";
    const obfuscatedScript = await fetch(scriptUrl).then((response) => response.text());
    this.logger.debugFileDump("megacloud-obfuscated-script", "js", obfuscatedScript);
    const script = await this._deobfuscate(obfuscatedScript);
    this.logger.debugFileDump("megacloud-script", "js", script);
    const ast = meriyah.parseScript(script, {
      webcompat: true,
      loc: true
    });
    const encryptFunctionName = this._exctractEncryptFunctionName(ast);
    if (!encryptFunctionName) {
      throw new Error("failed to extract the name of the encryption function");
    }
    const encryptionKey = this._extractEncryptionKey(ast, encryptFunctionName);
    if (!encryptionKey) {
      throw new Error("failed to extract the value of the encryption key");
    }
    return encryptionKey;
  }

  private _extractEncryptionKey(ast: meriyah.ESTree.Program, encryptFunctionName: string) {
    let encryptionKey: string | null = null;
    walkTree(ast, (node) => {
      if (!encryptionKey && isVariableDeclaration(node)) {
        const functionDeclarator = node.declarations.find((functionDeclarator) => {
          if (functionDeclarator.init && isArrowFunctionExpression(functionDeclarator.init) && isBlockStatement(functionDeclarator.init.body)) {
            const encryptionKeyBlock = functionDeclarator.init.body;
            const decryptedValueReturnStatement = encryptionKeyBlock.body.find(
              (statement) =>
                isReturnStatement(statement) &&
                statement.argument &&
                isCallExpression(statement.argument) &&
                isIdentifier(statement.argument.callee) &&
                statement.argument.callee.name == encryptFunctionName
            );
            return decryptedValueReturnStatement;
          }
          return false;
        });
        if (
          functionDeclarator &&
          functionDeclarator.init &&
          isArrowFunctionExpression(functionDeclarator.init) &&
          isBlockStatement(functionDeclarator.init.body)
        ) {
          const encryptionKeyBlock = functionDeclarator.init.body;
          const variableDeclaration = encryptionKeyBlock.body.find((statement) => {
            if (isVariableDeclaration(statement)) {
              const variableDeclarator = statement.declarations.find(
                (declarator) =>
                  declarator.init &&
                  isCallExpression(declarator.init) &&
                  isMemberExpression(declarator.init.callee) &&
                  isLiteral(declarator.init.callee.object) &&
                  isIdentifier(declarator.init.callee.property) &&
                  declarator.init.callee.property.name === "replace" &&
                  declarator.init.arguments.length === 2 &&
                  isLiteral(declarator.init.arguments[0]) &&
                  isLiteral(declarator.init.arguments[1])
              );
              if (variableDeclarator) {
                return true;
              }
            }
            return false;
          });
          if (variableDeclaration && isVariableDeclaration(variableDeclaration)) {
            const variableDeclarator = variableDeclaration.declarations.find(
              (declarator) =>
                declarator.init &&
                isCallExpression(declarator.init) &&
                isMemberExpression(declarator.init.callee) &&
                isLiteral(declarator.init.callee.object) &&
                isIdentifier(declarator.init.callee.property) &&
                declarator.init.callee.property.name === "replace" &&
                declarator.init.arguments.length === 2 &&
                isLiteral(declarator.init.arguments[0]) &&
                isLiteral(declarator.init.arguments[1])
            );
            if (
              variableDeclarator &&
              variableDeclarator.init &&
              isCallExpression(variableDeclarator.init) &&
              isMemberExpression(variableDeclarator.init.callee) &&
              isLiteral(variableDeclarator.init.callee.object) &&
              typeof variableDeclarator.init.callee.object.value === "string" &&
              isIdentifier(variableDeclarator.init.callee.property) &&
              variableDeclarator.init.callee.property.name === "replace" &&
              variableDeclarator.init.arguments.length === 2 &&
              isLiteral(variableDeclarator.init.arguments[0]) &&
              isLiteral(variableDeclarator.init.arguments[1]) &&
              typeof variableDeclarator.init.arguments[0].value === "string" &&
              typeof variableDeclarator.init.arguments[1].value === "string"
            ) {
              encryptionKey = variableDeclarator.init.callee.object.value.replace(
                variableDeclarator.init.arguments[0].value,
                variableDeclarator.init.arguments[1].value
              );
            }
          }
        }
      }
    });
    return encryptionKey;
  }

  private _exctractEncryptFunctionName(ast: meriyah.ESTree.Program) {
    let encryptFunctionName: null | string = null;
    walkTree(ast, (node) => {
      if (!encryptFunctionName && isVariableDeclaration(node)) {
        const variableDeclarator = node.declarations.find((declarator) => {
          if (declarator && isIdentifier(declarator.id) && declarator.init) {
            if (isArrowFunctionExpression(declarator.init)) {
              if (isBlockStatement(declarator.init.body)) {
                const tryStatement = declarator.init.body.body.find((statement) => isTryStatement(statement));
                if (tryStatement && isTryStatement(tryStatement) && isBlockStatement(tryStatement.block)) {
                  const decryptBufferDeclaration = tryStatement.block.body.find((node) => {
                    if (isVariableDeclaration(node)) {
                      const decryptBufferDeclarator = node.declarations.find(
                        (declarator) =>
                          declarator.init &&
                          isCallExpression(declarator.init) &&
                          isMemberExpression(declarator.init.callee) &&
                          isIdentifier(declarator.init.callee.property) &&
                          declarator.init.callee.property.name === "decrypt" &&
                          isMemberExpression(declarator.init.callee.object) &&
                          isIdentifier(declarator.init.callee.object.property) &&
                          declarator.init.callee.object.property.name === "AES" &&
                          isIdentifier(declarator.init.callee.object.object) &&
                          declarator.init.callee.object.object.name === "CryptoJS"
                      );
                      if (decryptBufferDeclarator) {
                        return true;
                      }
                    }
                    return false;
                  });
                  if (decryptBufferDeclaration) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        });
        if (variableDeclarator && isIdentifier(variableDeclarator.id)) {
          encryptFunctionName = variableDeclarator.id.name;
        }
      }
    });
    return encryptFunctionName;
  }

  private async _deobfuscate(obfuscatedScript: string) {
    const deobfuscator = new Deobfuscator();
    let script = await deobfuscator.deobfuscateSource(obfuscatedScript);
    script = script.replaceAll(" 0 += ", " 0 + ");
    script = script.replaceAll(" 0 = ", " 0 + ");
    script = script.replaceAll("(0 += ", "(0 + ");
    script = script.replaceAll("(0 = ", "(0 + ");
    return script;
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
