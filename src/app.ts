import enquirer from "enquirer";
import { existsSync, rm as rawRm } from "fs";
import { Holz } from "holz-provider";
import { KeyContainer } from "node-widevine";
import { exit } from "process";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { URL } from "url";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { initializeCookieStore as initializeCookieJar } from "./cookie-parser.js";
import YT_DLP_Downloader from "./downloaders/yt-dlp.js";
import DrmSolver from "./drm.js";
import GenericExtractor from "./extractors/generic.js";
import WakanimService from "./extractors/wakanim.js";
import { Config } from "./index.js";
import { Input, Logger } from "./io.js";
import {
  ContainerDownload,
  Download,
  Downloader,
  EpisodeDownload,
  EpisodeMetadata,
  Extractor,
  isContainerDownload,
  isContainerMetadata,
  isManifest,
  Metadata,
  Output
} from "./service.js";
import AniwatchService from "./extractors/aniwatch.js";
import FFMPEG from "./ffmpeg.js";
import filenamify from "filenamify";
import { basename, dirname, extname } from "path";
import { copyFile, mkdir } from "fs/promises";

const rm = promisify(rawRm);

export default class App {
  private _config: Config;
  private _logger: Logger;
  private _io: Input;
  private _drm: DrmSolver;

  private _extractors: Extractor[];
  private _genericExtractor: Extractor;

  private _downloaders: Downloader[];
  private _genericDownloader: Downloader;

  private _cache: Record<string, KeyContainer[]> = {};

  constructor(config: Config) {
    this._config = config;
    this._logger = new Logger(config, "wvcli");
    this._io = new Input();
    this._drm = new DrmSolver(config);

    puppeteer.use(StealthPlugin());
    puppeteer.use(AdblockerPlugin());
    puppeteer.use(
      RecaptchaPlugin({
        provider: new Holz((cid: string, captcha: CaptchaInfo) => {
          this._logger.warn(
            undefined,
            `A Captcha has to be solved. Please use the Holz-Dekstop application to solve the solve the Captcha with the Id '${cid}'. ${captcha.url}`
          );
        }),
        visualFeedback: true,
        throwOnError: false,
        solveInViewportOnly: false,
        solveScoreBased: true,
        solveInactiveChallenges: true
      })
    );

    initializeCookieJar(config);

    this._extractors = [new WakanimService(config, this._logger), new AniwatchService(config, this._logger)];
    this._genericExtractor = new GenericExtractor();
    this._downloaders = [];
    this._genericDownloader = new YT_DLP_Downloader(this._config, this._logger);
  }

  async start() {
    if (this._config.interactive) {
      throw new Error("not yet implemented");
    } else {
      const inputs = this._config.input;
      if (!inputs?.length) {
        throw new Error("you have to either specify one or multiple inputs with [-i | --input] or use the interactive mode with [-I --interactive].");
      }
      for (const input of inputs) {
        try {
          await this._handleInput(input);
        } catch (error) {
          this._logger.debug(undefined, error, (<Error>error)?.stack);
          this._handleError(undefined, error);
        }
      }
    }
  }

  private async _handleInput(input: string) {
    const url = new URL(input);
    const metadata: Metadata | undefined = await this._extract(url.href);
    if (!metadata) {
      return;
    }
    if (!this._config.onlyDrm) {
      const download: Download | undefined = await this._download(metadata);
      if (!download) {
        return;
      }
      const drmFound = !!(
        isContainerDownload(download) ? (download.contents ?? <EpisodeDownload[]>[]).flatMap((episode) => episode.files) : download.files
      ).filter((file) => file.encrypted).length;
      if (drmFound) {
        this._logger.debug(undefined, "DRM protected content was downloaded and has to be decrypted");
      }
      if (drmFound && !this._config.skipDrm) {
        if (!(await this._decryptFiles(download, this._cache))) {
          return;
        }
      }
      const output = await this._handleMissingInformation(download);
      await this._handleOutputs(output);
      try {
        if (!this._config.verbose) {
          await this._removeTemporaryFiles(download);
        }
      } catch (error) {
        this._logger.warn(undefined, "an error occurred while deleting temporary files");
      }
    } else {
      await this._collectDecryptionKeys(metadata, this._cache);
      this._logger.jsonDump("INFO", undefined, this._cache);
    }
  }
  private async _removeTemporaryFiles(download: Download) {
    if (isContainerDownload(download)) {
      for (const episode of download.contents ?? <EpisodeDownload[]>[]) {
        for (const file of episode.files) {
          await rm(file.path);
        }
      }
    } else {
      for (const file of download.files) {
        await rm(file.path);
      }
    }
  }

  private async _handleOutputs(output: Output | Output[]) {
    if (Array.isArray(output)) {
      for (const singleOutput of output) {
        this._handleOutput(singleOutput);
      }
    } else {
      this._handleOutput(output);
    }
  }

  private async _handleOutput(output: Output) {
    const useDirectoryAsOutput = !extname(this._config.output);
    const combineFiles = true;

    const title = filenamify(output.title);
    const container = filenamify(output.container || "null");
    const seasonNumber = output.season || 0;
    const episodeNumber = output.index || 0;

    const ffmpeg = new FFMPEG(this._logger);
    const outputPath = this._config.output
      .replaceAll("{title}", `${title}`)
      .replaceAll("{series_name}", `${container}`)
      .replaceAll("{season_number}", `${seasonNumber}`)
      .replaceAll("{episode_number}", `${episodeNumber}`);
    const directoryPath = dirname(outputPath);

    if (useDirectoryAsOutput) {
      await mkdir(directoryPath, { recursive: true });
      if (combineFiles) {
        ffmpeg.combineFiles(output.files, `${directoryPath}/${title}.mkv`);
      } else {
        for (const file of output.files) {
          let filePath = `${directoryPath}/${title}.${extname(file)}`;
          if (existsSync(filePath)) {
            filePath = `${directoryPath}/${title}-${uuidv4()}.${extname(file)}`;
          }
          await copyFile(file, filePath);
        }
      }
    } else {
      const filePath = basename(outputPath);
      await mkdir(directoryPath, { recursive: true });
      if (combineFiles || !filePath.includes("{ext}")) {
        ffmpeg.combineFiles(output.files, `${directoryPath}/${filePath.includes("{ext}") ? filePath.replaceAll("{ext}", "mkv") : filePath}`);
      } else {
        for (const file of output.files) {
          await copyFile(file, `${directoryPath}/${filePath.replaceAll("{ext}", extname(file))}`);
        }
      }
    }
  }

  private async _handleMissingInformation(input: Download): Promise<Output | Output[]> {
    if (isContainerDownload(input)) {
      let container = await this._title(input.metadata.title, true);
      if (!container) {
        container = uuidv4();
        this._logger.warn(
          undefined,
          `you specified to skip questions but no title was found, using "${container}" for now`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      }
      const outputs: Output[] = [];
      for (const episode of input.contents ?? <EpisodeDownload[]>[]) {
        let title = await this._title(episode.metadata.title, false);
        if (!title) {
          title = uuidv4();
          this._logger.warn(
            undefined,
            `you specified to skip questions but no title was found, using "${title}" for now`,
            isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
          );
        }
        const index = await this._index(episode, input);
        const season = await this._season(episode, input);
        const episodeOutput: Output = {
          files: episode.files
            .filter((file) => {
              if (file.encrypted) {
                this._logger.warn(undefined, `Had to skip ${file.path} because it remains encrpyted.`);
                return false;
              } else {
                return true;
              }
            })
            .map((file) => file.path),
          title: title,
          index: index,
          season: season,
          container: container
        };
        outputs.push(episodeOutput);
      }

      return outputs;
    } else {
      const container =
        input.metadata.container ??
        (input.metadata.season === null || input.metadata.index === null ? null : await this._title(input.metadata.container || undefined, true));
      let title = await this._title(input.metadata.title, false);
      if (!title) {
        title = uuidv4();
        this._logger.warn(
          undefined,
          `you specified to skip questions but no title was found, using "${title}" for now`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      }
      const index = await this._index(input);
      const season = await this._season(input);
      const output: Output = {
        files: input.files
          .filter((file) => {
            if (file.encrypted) {
              this._logger.warn(undefined, `Had to skip ${file.path} because it remains encrpyted.`);
              return false;
            } else {
              return true;
            }
          })
          .map((file) => file.path),
        title: title,
        index: index,
        season: season,
        container: container
      };
      return output;
    }
  }

  private async _title(initial: string | undefined, container: boolean): Promise<string | null> {
    let title: string | undefined = initial;
    if (!title) {
      if (this._config.skipQuestions) {
        return null;
      } else {
        const response = await enquirer.prompt<{ title: string }>({
          type: "input",
          message: this._logger.format(undefined, "INFO", true, container ? "Container Title" : "Episode Title"),
          name: "title",
          validate: (value) => !!value
        });
        title = response.title;
      }
    }
    return title;
  }

  private async _index(input: EpisodeDownload, container?: ContainerDownload): Promise<number | null> {
    let index: number | undefined | null = input.metadata.index;
    if (index === undefined) {
      if (this._config.skipQuestions) {
        index = !!container ? 0 : null;
        this._logger.warn(
          undefined,
          `you specified to skip questions but no episode index was found, using "${index}" for now`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      } else {
        const response = await enquirer.prompt<{ index: string }>({
          type: "input",
          message: this._logger.format(undefined, "INFO", true, "Episode Index (empty if there's only 1)"),
          name: "index",
          validate: (value: string) => !value || !isNaN(parseFloat(value))
        });
        index = !response.index ? null : Number(response.index);
        input.metadata.index = index;
      }
    }
    return index;
  }

  private async _season(input: EpisodeDownload, container?: ContainerDownload): Promise<number | null> {
    let season: number | undefined | null = input.metadata.season;
    if (season === undefined) {
      if (this._config.skipQuestions) {
        season = !!container ? 1 : null;
        this._logger.warn(
          undefined,
          `you specified to skip questions but we dont know in which season this episode is, using "${season}" for now`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      } else {
        const response = await enquirer.prompt<{ season: string }>({
          type: "input",
          message: this._logger.format(undefined, "INFO", true, "Season (empty if not in a container)"),
          name: "season",
          validate: (value: string) => !value || !isNaN(parseFloat(value))
        });
        season = !response.season ? null : Number(response.season);
        input.metadata.season = season;
      }
    }
    return season;
  }

  private async _extract(url: string): Promise<Metadata | undefined> {
    let responsibleExtractor = this._extractors.find((extractor) => extractor.checkResponsibility(url));
    if (!responsibleExtractor) {
      this._logger.debug(undefined, "there was no matching provider, using the generic one.");
      responsibleExtractor = this._genericExtractor;
    }
    if (!responsibleExtractor.ready) {
      if (!responsibleExtractor.initialize) {
        throw new Error("has to be ready if there is not initializer");
      }
      await responsibleExtractor.initialize();
    }
    let metadata: Metadata | null;
    try {
      if (!responsibleExtractor.ready) {
        throw new Error("still not ready after initialization");
      }
      metadata = await responsibleExtractor.fetchMetadata(url);
      if (!metadata) {
        this._handleError(undefined, "an error occurred while fetching the metadata");
        return;
      }
      this._logger.information(responsibleExtractor.name, "sucessfully extracted metadata");
      this._logger.jsonDump("DEBUG", responsibleExtractor.name, metadata);
      return metadata;
    } catch (error) {
      this._logger.debug(responsibleExtractor.name, error, (<Error>error)?.stack);
      this._handleError(responsibleExtractor.name, error);
      return;
    }
  }

  private async _download(metadata: Metadata): Promise<Download | undefined> {
    let responsibleDownloader = this._downloaders.find((extractor) =>
      extractor.checkResponsibility(isManifest(metadata.source) ? metadata.source.url : metadata.source)
    );
    if (!responsibleDownloader) {
      this._logger.debug(undefined, "there was no matching download provider, using the generic one.");
      responsibleDownloader = this._genericDownloader;
    }
    if (!responsibleDownloader.ready) {
      if (!responsibleDownloader.initialize) {
        throw new Error("has to be ready if there is not initializer");
      }
      await responsibleDownloader.initialize();
    }
    try {
      if (!responsibleDownloader.ready) {
        throw new Error("still not ready after initialization");
      }
      const download = await this._genericDownloader.download(metadata);
      if (!download) {
        this._handleError(undefined, "an error occurred while downloading");
        return;
      }
      this._logger.information(responsibleDownloader.name, "downloads finished");
      this._logger.jsonDump("DEBUG", responsibleDownloader.name, download);
      return download;
    } catch (error) {
      this._logger.debug(responsibleDownloader.name, error, (<Error>error)?.stack);
      this._handleError(responsibleDownloader.name, error);
      return;
    }
  }

  private async _collectDecryptionKeys(metadata: Metadata, cache: Record<string, KeyContainer[]>): Promise<void> {
    if (isContainerMetadata(metadata)) {
      for (const episode of metadata.contents ?? <EpisodeMetadata[]>[]) {
        await this._collectDecryptionKey(episode, cache);
      }
    } else {
      await this._collectDecryptionKey(metadata, cache);
    }
    return;
  }

  private async _collectDecryptionKey(metadata: EpisodeMetadata, cache: Record<string, KeyContainer[]>): Promise<void> {
    const licenseInformation = metadata.licenseInformation;
    if (!licenseInformation) {
      return;
    }
    const psshData = licenseInformation.psshData;
    if (!psshData) {
      return;
    }
    for (const format of Object.keys(psshData)) {
      const pssh = psshData[format];
      const keyContainers: KeyContainer[] =
        cache[pssh.toString("base64")] ||
        (await this._drm.solveDrm(
          {
            url: licenseInformation.url,
            cookies: licenseInformation.cookies,
            headers: licenseInformation.headers,
            pssh
          },
          this._logger
        ));
      if (!cache[pssh.toString("base64")]) {
        cache[pssh.toString("base64")] = keyContainers;
      }
    }
    return;
  }

  private async _decryptFiles(download: Download, cache: Record<string, KeyContainer[]>): Promise<boolean> {
    if (isContainerDownload(download)) {
      for (const episode of download.contents ?? <EpisodeDownload[]>[]) {
        if (!(await this._decryptEpisode(episode, cache))) {
          return false;
        }
      }
    } else {
      if (!(await this._decryptEpisode(download, cache))) {
        return false;
      }
    }
    return true;
  }

  private async _decryptEpisode(episode: EpisodeDownload, cache: Record<string, KeyContainer[]>): Promise<boolean> {
    const licenseInformation = episode.metadata.licenseInformation;
    if (!licenseInformation) {
      this._handleError(undefined, "DRM protected content was downloaded but there is no license information");
      return false;
    }
    const psshData = licenseInformation.psshData;
    if (!psshData) {
      this._handleError(undefined, "DRM protected content was downloaded but no key identifiers were found");
      return false;
    }
    for (const file of episode.files.filter((file) => file.encrypted)) {
      const pssh = psshData[file.format.id];
      if (!pssh) {
        this._handleError(
          undefined,
          `the file ${file.path} is drm protected but the key identifier was not found, [${[
            ...new Set(Object.keys(psshData).flatMap((formatId) => psshData[formatId].toString("base64")))
          ].join(", ")}]`
        );
        return false;
      }
      if (!!cache[pssh.toString("base64")]) {
        this._logger.debug(undefined, `key for pssh "${pssh.toString("base64")}" is cached and will be used`);
      } else {
        this._logger.debug(undefined, `key for pssh "${pssh.toString("base64")}" is not cached and will be fetched`);
      }
      const keyContainers: KeyContainer[] =
        cache[pssh.toString("base64")] ||
        (await this._drm.solveDrm(
          {
            url: licenseInformation.url,
            cookies: licenseInformation.cookies,
            headers: licenseInformation.headers,
            pssh
          },
          this._logger
        ));
      if (!cache[pssh.toString("base64")]) {
        cache[pssh.toString("base64")] = keyContainers;
      }
      this._logger.debug(undefined, `try to decrypt "${file.path}"`);
      await this._drm.decrpytFile(file, keyContainers);
      this._logger.information(undefined, `decrypted "${file.path}"`);
    }
    return true;
  }

  release() {
    this._extractors.forEach((extractor) => extractor.release && extractor.release());
    this._downloaders.forEach((downloader) => downloader.release && downloader.release());
    this._io.release();
  }

  private _handleError(component: string | undefined, error: unknown): never | void {
    if (!this._config.ignoreErrors) {
      this._logger.error(component, error);
      exit(1);
    } else {
      this._logger.warn(component, "Ignoring error because of --ignore-errors", error);
      return;
    }
  }

  private _validateUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch (error) {
      this._logger.debug(undefined, error, (<Error>error)?.stack);
      return false;
    }
  }
}
