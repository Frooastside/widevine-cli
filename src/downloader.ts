import enquirer from "enquirer";
import filenamify from "filenamify";
import { existsSync, rm as rawRm } from "fs";
import { copyFile, mkdir } from "fs/promises";
import { Holz } from "holz-provider";
import { KeyContainer } from "node-widevine";
import { basename, dirname, extname } from "path";
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
import AniwatchService from "./extractors/aniwatch.js";
import GenericExtractor from "./extractors/generic.js";
import WakanimService from "./extractors/wakanim.js";
import FFMPEG from "./ffmpeg.js";
import { DownloadConfig, globalConfig } from "./index.js";
import { Input, Logger } from "./io.js";
import {
  ContainerDownload,
  Download,
  DownloadedMediaFile,
  Downloader,
  EpisodeDownload,
  EpisodeMetadata,
  Extractor,
  Metadata,
  Output,
  isContainerDownload,
  isContainerMetadata,
  isManifest,
  isMediaDownload
} from "./service.js";

const rm = promisify(rawRm);

export default class App {
  private _config: DownloadConfig;
  private _logger: Logger;
  private _io: Input;
  private _drm: DrmSolver;

  private _extractors: Extractor[];
  private _genericExtractor: Extractor;

  private _downloaders: Downloader[];
  private _genericDownloader: Downloader;

  private _cache: Record<string, KeyContainer[]> = {};

  constructor(config: DownloadConfig) {
    this._config = config;
    this._logger = new Logger("wvcli", globalConfig);
    this._io = new Input();
    this._drm = new DrmSolver(config);

    puppeteer.use(StealthPlugin());
    puppeteer.use(AdblockerPlugin());
    puppeteer.use(
      RecaptchaPlugin({
        provider: new Holz((cid: string, captcha: CaptchaInfo) => {
          this._logger.warn(
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

    this._extractors = [new WakanimService(config), new AniwatchService(config)];
    this._genericExtractor = new GenericExtractor();
    this._downloaders = [];
    this._genericDownloader = new YT_DLP_Downloader(this._config);
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
          this._logger.debug(error, (<Error>error)?.stack);
          this._handleError(error);
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
      )
        .filter((file) => isMediaDownload(file))
        .filter((file) => (file as DownloadedMediaFile).encrypted).length;
      if (drmFound) {
        this._logger.extraInformation("DRM protected content was downloaded and has to be decrypted");
      }
      if (drmFound && !this._config.skipDrm) {
        if (!(await this._decryptFiles(download, this._cache))) {
          return;
        }
      }
      const output = await this._handleMissingInformation(download);
      this._logger.debugJsonDump(output);
      await this._handleOutputs(output);
      try {
        if (!this._config.keepTemporaryFiles) {
          await this._removeTemporaryFiles(download);
        }
      } catch (error) {
        this._logger.warn("an error occurred while deleting temporary files");
      }
    } else {
      await this._collectDecryptionKeys(metadata, this._cache);
      for (const format of Object.keys(this._cache)) {
        const psshData = this._cache[format];
        this._logger.information(`Format "${format}":`);
        for (const keyContainer of psshData) {
          this._logger.information(`kid:key ${keyContainer.kid}:${keyContainer.key}`);
        }
      }
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
        await this._handleOutput(singleOutput);
      }
    } else {
      await this._handleOutput(output);
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
      .replaceAll("{season_number}", `${seasonNumber.toString().padStart(2, "0")}`)
      .replaceAll("{episode_number}", `${episodeNumber.toString().padStart(2, "0")}`);
    const directoryPath = dirname(outputPath);

    if (useDirectoryAsOutput) {
      await mkdir(directoryPath, { recursive: true });
      if (combineFiles) {
        await ffmpeg.combineDownloadedFiles(output.files, `${directoryPath}/${title}.mkv`);
      } else {
        for (const file of output.files) {
          let filePath = `${directoryPath}/${title}.${extname(file.path)}`;
          if (existsSync(filePath)) {
            filePath = `${directoryPath}/${title}-${uuidv4()}.${extname(file.path)}`;
          }
          await copyFile(file.path, filePath);
        }
      }
    } else {
      const filePath = basename(outputPath);
      await mkdir(directoryPath, { recursive: true });
      if (combineFiles || !filePath.includes("{ext}")) {
        await ffmpeg.combineDownloadedFiles(
          output.files,
          `${directoryPath}/${filePath.includes("{ext}") ? filePath.replaceAll("{ext}", "mkv") : filePath}`
        );
      } else {
        for (const file of output.files) {
          await copyFile(file.path, `${directoryPath}/${filePath.replaceAll("{ext}", extname(file.path))}`);
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
            `you specified to skip questions but no title was found, using "${title}" for now`,
            isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
          );
        }
        const index = await this._index(episode, input);
        const season = await this._season(episode, input);
        const episodeOutput: Output = {
          files: episode.files.filter((file) => {
            if (isMediaDownload(file) && (file as DownloadedMediaFile).encrypted) {
              this._logger.warn(`Had to skip ${file.path} because it remains encrpyted.`);
              return false;
            } else {
              return true;
            }
          }),
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
          `you specified to skip questions but no title was found, using "${title}" for now`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      }
      const index = await this._index(input);
      const season = await this._season(input);
      const output: Output = {
        files: input.files.filter((file) => {
          if (isMediaDownload(file) && (file as DownloadedMediaFile).encrypted) {
            this._logger.warn(`Had to skip ${file.path} because it remains encrpyted.`);
            return false;
          } else {
            return true;
          }
        }),
        title: title,
        index: index,
        season: season,
        container: container
      };
      return output;
    }
  }

  private async _title(initial: string | undefined, container: boolean): Promise<string | null> {
    const containerRequired = this._config.output.includes("{series_name}");
    const titleRequired = this._config.output.includes("{title}");
    let title: string | undefined = (container ? this._config.container : this._config.title) || initial;
    if (!title) {
      if (this._config.skipQuestions || !(container ? containerRequired : titleRequired)) {
        return null;
      } else {
        const response = await enquirer.prompt<{ title: string }>({
          type: "input",
          message: this._logger.format("INFO", true, container ? "Container Title" : "Episode Title"),
          name: "title",
          validate: (value) => !!value
        });
        title = response.title;
      }
    }
    return title;
  }

  private async _index(input: EpisodeDownload, container?: ContainerDownload): Promise<number | null> {
    const episodeNumberRequired = this._config.output.includes("{episode_number}");
    let index: number | undefined | null = container ? Number(this._config.episode) || input.metadata.index : input.metadata.index;
    if (container && this._config.episode) {
      this._logger.warn("skipped --episode because we are dealing with multiple episodes and would overwrite them");
    }
    if (index === undefined) {
      if (this._config.skipQuestions || !episodeNumberRequired) {
        index = !!container ? 0 : null;
        this._logger.warn(
          `you specified to skip questions or don't use the value in the output template, and no episode index was found, using "${index}" as default`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      } else {
        const response = await enquirer.prompt<{ index: string }>({
          type: "input",
          message: this._logger.format("INFO", true, "Episode Index (empty if there's only 1)"),
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
    const seasonNumberRequired = this._config.output.includes("{season_number}");
    let season: number | undefined | null = Number(this._config.season) || input.metadata.season;
    if (season === undefined) {
      if (this._config.skipQuestions || !seasonNumberRequired) {
        season = !!container ? 1 : null;
        this._logger.warn(
          `you specified to skip questions or don't use the value in the output template, we don't know the season this episode is in, using "${season}" as default`,
          isManifest(input.metadata.source) ? input.metadata.source.url : input.metadata.source
        );
      } else {
        const response = await enquirer.prompt<{ season: string }>({
          type: "input",
          message: this._logger.format("INFO", true, "Season (empty if not in a container)"),
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
      this._logger.extraInformation("there was no matching provider, using the generic one.");
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
        this._handleError("an error occurred while fetching the metadata");
        return;
      }
      this._logger.information("sucessfully extracted metadata");
      this._logger.debugJsonDump(metadata);
      return metadata;
    } catch (error) {
      this._logger.debug(error, (<Error>error)?.stack);
      this._handleError(error);
      return;
    }
  }

  private async _download(metadata: Metadata): Promise<Download | undefined> {
    let responsibleDownloader = this._downloaders.find((extractor) =>
      extractor.checkResponsibility(isManifest(metadata.source) ? metadata.source.url : metadata.source)
    );
    if (!responsibleDownloader) {
      this._logger.extraInformation("there was no matching download provider, using the generic one.");
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
        this._handleError("an error occurred while downloading");
        return;
      }
      this._logger.information("downloads finished");
      this._logger.debugJsonDump(download);
      return download;
    } catch (error) {
      this._logger.debug(error, (<Error>error)?.stack);
      this._handleError(error);
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
        (await this._drm.solveDrm({
          url: licenseInformation.url,
          cookies: licenseInformation.cookies,
          headers: licenseInformation.headers,
          pssh
        }));
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
      this._handleError("DRM protected content was downloaded but there is no license information");
      return false;
    }
    const psshData = licenseInformation.psshData;
    if (!psshData) {
      this._handleError("DRM protected content was downloaded but no key identifiers were found");
      return false;
    }
    for (const file of episode.files
      .filter((file) => isMediaDownload(file))
      .map((file) => file as DownloadedMediaFile)
      .filter((file) => file.encrypted)) {
      const pssh = psshData[file.format.id];
      if (!pssh) {
        this._handleError(
          `the file ${file.path} is drm protected but the key identifier was not found, [${[
            ...new Set(Object.keys(psshData).flatMap((formatId) => psshData[formatId].toString("base64")))
          ].join(", ")}]`
        );
        return false;
      }
      if (!!cache[pssh.toString("base64")]) {
        this._logger.extraInformation(`key for pssh "${pssh.toString("base64")}" is cached and will be used`);
      } else {
        this._logger.extraInformation(`key for pssh "${pssh.toString("base64")}" is not cached and will be fetched`);
      }
      const keyContainers: KeyContainer[] =
        cache[pssh.toString("base64")] ||
        (await this._drm.solveDrm({
          url: licenseInformation.url,
          cookies: licenseInformation.cookies,
          headers: licenseInformation.headers,
          pssh
        }));
      if (!cache[pssh.toString("base64")]) {
        cache[pssh.toString("base64")] = keyContainers;
      }
      this._logger.extraInformation(`trying to decrypt "${file.path}"`);
      await this._drm.decrpytFile(file, keyContainers);
      this._logger.information(`decrypted "${file.path}"`);
    }
    return true;
  }

  release() {
    this._extractors?.forEach((extractor) => extractor.release && extractor.release());
    this._downloaders?.forEach((downloader) => downloader.release && downloader.release());
    this._io.release();
  }

  private _handleError(error: unknown): never | void {
    if (!globalConfig.ignoreErrors) {
      this._logger.error(error);
      exit(1);
    } else {
      this._logger.warn("Ignoring error because of --ignore-errors", error);
      return;
    }
  }
}
