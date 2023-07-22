import { load } from "cheerio";
import CryptoJS from "crypto-js";
import { Deobfuscator } from "deobfuscator";
import { BlockStatement } from "deobfuscator/dist/util/types.js";
import * as meriyah from "meriyah";
import {
  isArrowFunctionExpression,
  isBlockStatement,
  isCallExpression,
  isExpressionStatement,
  isForStatement,
  isIdentifier,
  isLiteral,
  isMemberExpression,
  isReturnStatement,
  isSwitchStatement,
  isTryStatement,
  isVariableDeclaration,
  walkTree
} from "../extractor.js";
import { DownloadConfig } from "../index.js";
import { findLanguageByName, iso_639_1, iso_639_3 } from "../iso.js";
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

export type Pieces = Piece[];

export interface Piece {
  offset: number;
  length: number;
}

export default class AniwatchService extends Extractor {
  private _config: DownloadConfig;
  private _initialized = false;

  private _substringKey?: string;
  private _switchPieces?: Pieces;

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

      if (sourceInformationJson.encrypted && typeof sourceInformationJson.sources === "string") {
        sourceInformationJson.sources = await this._switchDecrypt(sourceInformationJson.sources);
        if (sourceInformationJson.sourcesBackup && typeof sourceInformationJson.sourcesBackup === "string") {
          sourceInformationJson.sources = await this._switchDecrypt(sourceInformationJson.sources);
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
        language: server.dub ? iso_639_1["en"] : iso_639_1["ja"],
        subtitles: sourceInformationJson.tracks
          .filter((track) => track.kind === "captions")
          .map((track) => {
            const regex = /([a-z]{3})-\d\.vtt$/gi.exec(track.file);
            const language = (regex ? iso_639_3[regex[1]] : undefined) || findLanguageByName(track.label || "").language;
            return { source: { url: track.file }, language: language };
          })
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

  private async _switchDecrypt(sources: string): Promise<string> {
    //TODO CHECK THIS ERROR SOURCE
    if (this._switchPieces) {
      try {
        this.logger.debug("switch pieces", this._switchPieces);
        return this._switchDecryptPieces(sources, this._switchPieces);
      } catch (error) {
        this._switchPieces = await this._switchExtractPieces();
        this.logger.debug("switch pieces", this._switchPieces);
        return this._switchDecryptPieces(sources, this._switchPieces);
      }
    } else {
      this._switchPieces = await this._switchExtractPieces();
      this.logger.debug("switch pieces", this._switchPieces);
      return this._switchDecryptPieces(sources, this._switchPieces);
    }
  }

  private _switchDecryptPieces(sources: string, pieces: Pieces): string {
    let key = "";
    let patchedSources = sources;
    let globalOffset = 0;
    for (let i = 0; i < pieces.length; i++) {
      const { offset, length } = pieces[i];
      const start = offset + globalOffset;
      const end = start + length;
      const piece = sources.slice(start, end);
      key += piece;
      patchedSources = patchedSources.replace(piece, "");
      globalOffset += length;
    }
    return this._decrypt(patchedSources, key);
  }

  private async _switchExtractPieces(): Promise<Pieces> {
    const script = await this._fetchDeobfuscatedScript();
    const ast = meriyah.parseScript(script, {
      webcompat: true,
      loc: true
    });
    this.logger.debugFileDump("megacloud-ast", "json", JSON.stringify(ast, null, 2));
    const decryptFunctionName = this._exctractDecryptFunctionName(ast);
    if (!decryptFunctionName) {
      throw new Error("failed to extract the name of the decryption function");
    }
    let decryptionFunction: meriyah.ESTree.ArrowFunctionExpression | null = null;
    walkTree(ast, (node) => {
      if (!decryptionFunction && isVariableDeclaration(node)) {
        const declarator = node.declarations.find(
          (declarator) =>
            declarator &&
            declarator.init &&
            isArrowFunctionExpression(declarator.init) &&
            isBlockStatement(declarator.init.body) &&
            !!declarator.init.body.body.find(
              (statement) =>
                isReturnStatement(statement) &&
                statement.argument &&
                isCallExpression(statement.argument) &&
                isIdentifier(statement.argument.callee) &&
                statement.argument.callee.name == decryptFunctionName
            )
        );
        if (!!declarator && declarator.init && isArrowFunctionExpression(declarator.init)) {
          decryptionFunction = declarator.init;
        }
      }
    });
    if (!decryptionFunction) {
      throw new Error("an error occurred while extracting the pieces of the encryption key, no switch decryption function");
    }
    const blockStatement = (decryptionFunction as meriyah.ESTree.ArrowFunctionExpression).body as meriyah.ESTree.BlockStatement;
    const loop: meriyah.ESTree.ForStatement | undefined = blockStatement.body.find((statement) => isForStatement(statement)) as
      | meriyah.ESTree.ForStatement
      | undefined;
    if (!loop) {
      throw new Error("an error occurred while extracting the pieces of the encryption key, no loop");
    }
    const lengthName = ((loop.test as meriyah.ESTree.BinaryExpression).right as meriyah.ESTree.Identifier).name;
    const length = this._extractConstAssignment(ast, lengthName);
    const loopBody: meriyah.ESTree.BlockStatement = loop.body as BlockStatement;
    const switchStatement: meriyah.ESTree.SwitchStatement | undefined = loopBody.body.find((statement) => isSwitchStatement(statement)) as
      | meriyah.ESTree.SwitchStatement
      | undefined;
    if (!switchStatement) {
      throw new Error("an error occurred while extracting the pieces of the encryption key, no switch statement");
    }
    const pieces: Pieces = [];
    for (let i = 0; i < length; i++) {
      const switchCase = switchStatement.cases.find(
        (switchCase) => isLiteral(switchCase.test as meriyah.ESTree.Literal) && (switchCase.test as meriyah.ESTree.Literal).value === i
      );
      if (!switchCase) {
        throw new Error("an error occurred while extracting the pieces of the encryption key, no case");
      }
      const expressionStatement: meriyah.ESTree.ExpressionStatement | undefined = switchCase.consequent.find((statement) =>
        isExpressionStatement(statement)
      ) as meriyah.ESTree.ExpressionStatement | undefined;
      if (!expressionStatement) {
        throw new Error("an error occurred while extracting a piece of the encryption key, no case body");
      }
      const sequenceExpression: meriyah.ESTree.SequenceExpression = expressionStatement.expression as meriyah.ESTree.SequenceExpression;
      if (sequenceExpression.expressions.length !== 2) {
        throw new Error("an error occurred while extracting a piece of the encryption key, too many assignments");
      }
      const offsetName = this._extractRightAssignment(sequenceExpression.expressions[0]);

      const lengthName = this._extractRightAssignment(sequenceExpression.expressions[1]);
      if (!offsetName || !lengthName) {
        throw new Error("an error occurred while extracting a piece of the encryption key, assignments without values");
      }
      const offset = this._extractConstAssignment(ast, offsetName);
      const length = this._extractConstAssignment(ast, lengthName);
      pieces.push({ offset: offset, length: length });
    }
    return pieces;
  }

  private _extractConstAssignment(ast: meriyah.ESTree.Program, name: string): number {
    let value: number | null = null;
    walkTree(ast, (node) => {
      if (!value && isVariableDeclaration(node) && node.kind === "const") {
        const declarator = node.declarations.find(
          (declarator) => declarator && declarator.init && isIdentifier(declarator.id) && declarator.id.name === name
        );
        if (!!declarator && declarator.init && isLiteral(declarator.init)) {
          value = Number(declarator.init.value);
        }
      }
    });
    if (!value) {
      throw new Error(`could not find constant ${name} in ast`);
    }
    return value;
  }

  private _extractRightAssignment(expression: meriyah.ESTree.Expression): string | null {
    return ((expression as meriyah.ESTree.AssignmentExpression).right as meriyah.ESTree.Identifier).name;
  }

  private async _substringDecrypt(sources: string): Promise<string> {
    //TODO CHECK THIS ERROR SOURCE
    if (this._substringKey) {
      try {
        this.logger.debug("encryption key", this._substringKey);
        return this._decrypt(sources, this._substringKey);
      } catch (error) {
        this._substringKey = await this._fetchSubstringEncryptionKey();
        this.logger.debug("encryption key", this._substringKey);
        return this._decrypt(sources, this._substringKey);
      }
    } else {
      this._substringKey = await this._fetchSubstringEncryptionKey();
      this.logger.debug("encryption key", this._substringKey);
      return this._decrypt(sources, this._substringKey);
    }
  }

  private async _fetchSubstringEncryptionKey(): Promise<string> {
    const script = await this._fetchDeobfuscatedScript();
    const ast = meriyah.parseScript(script, {
      webcompat: true,
      loc: true
    });
    const decryptFunctionName = this._exctractDecryptFunctionName(ast);
    if (!decryptFunctionName) {
      throw new Error("failed to extract the name of the decryption function");
    }
    const encryptionKey = this._extractSubstringEncryptionKey(ast, decryptFunctionName);
    if (!encryptionKey) {
      throw new Error("failed to extract the value of the encryption key");
    }
    return encryptionKey;
  }

  private _extractSubstringEncryptionKey(ast: meriyah.ESTree.Program, decryptFunctionName: string): string | null {
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
                statement.argument.callee.name == decryptFunctionName
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

  private _exctractDecryptFunctionName(ast: meriyah.ESTree.Program) {
    let decryptFunctionName: null | string = null;
    walkTree(ast, (node) => {
      if (!decryptFunctionName && isVariableDeclaration(node)) {
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
          decryptFunctionName = variableDeclarator.id.name;
        }
      }
    });
    return decryptFunctionName;
  }

  private async _fetchDeobfuscatedScript(): Promise<string> {
    const scriptUrl = "https://megacloud.tv/js/player/a/prod/e1-player.min.js";
    const obfuscatedScript = await fetch(scriptUrl).then((response) => response.text());
    this.logger.debugFileDump("megacloud-obfuscated-script", "js", obfuscatedScript);
    const script = await this._deobfuscate(obfuscatedScript);
    this.logger.debugFileDump("megacloud-script", "js", script);
    return script;
  }

  private _decrypt(encryptedValue: string, key: string): string {
    const valueBuffer = CryptoJS.AES.decrypt(encryptedValue, key);
    return JSON.parse(valueBuffer.toString(CryptoJS.enc.Utf8));
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
