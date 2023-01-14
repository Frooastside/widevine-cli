import enquirer from "enquirer";
import { Holz } from "holz-provider";
import { KeyContainer } from "node-widevine";
import { exit } from "process";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { URL } from "url";
import { initializeCookieStore as initializeCookieJar } from "./cookie-parser.js";
import YT_DLP_Downloader from "./downloaders/yt-dlp.js";
import DrmSolver, { LicenseInformation } from "./drm.js";
import GenericExtractor from "./extractors/generic.js";
import WakanimService from "./extractors/wakanim.js";
import { Config } from "./index.js";
import { Input, Logger } from "./io.js";
import { Download, Downloader, EpisodeDownload, Extractor, isContainerDownload } from "./service.js";

export default class App {
  private _config: Config;
  private _logger: Logger;
  private _io: Input;
  private _drm: DrmSolver;

  private _extractors: Extractor[];
  private _genericExtractor: Extractor;

  private _downloaders: Downloader[];
  private _genericDownloader: Downloader;

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

    initializeCookieJar();

    this._extractors = [new WakanimService(config, this._logger)];
    this._genericExtractor = new GenericExtractor();
    this._downloaders = [];
    this._genericDownloader = new YT_DLP_Downloader(this._config, this._logger);
  }

  async start() {
    if (this._config.interactive) {
      const response = await enquirer.prompt({
        type: "input",
        message: "Download URL: ",
        name: "Download",

        validate: (value) => this._validateUrl(value)
      });
      console.log(response);
    } else {
      const inputs = this._config.input;
      if (!inputs?.length) {
        throw new Error(
          "you have to either specify one or multiple inputs with [-i | --input] or  use the interactive mode with [-I --interactive]."
        );
      }
      for (const input of inputs) {
        try {
          const url = new URL(input);
          let responsibleExtractor = this._extractors.find((extractor) => extractor.checkResponsibility(url.href));
          if (!responsibleExtractor) {
            this._logger.information(undefined, "there was no matching provider, using the generic one.");
            responsibleExtractor = this._genericExtractor;
          }
          if (!responsibleExtractor.ready) {
            if (!responsibleExtractor.initialize) {
              throw new Error("has to be ready if there is not initializer");
            }
            await responsibleExtractor.initialize();
          }
          try {
            if (!responsibleExtractor.ready) {
              throw new Error("still not ready after initialization");
            }
            const metadata = await responsibleExtractor.fetchMetadata(url.href);
            if (!metadata) {
              this._handleError(undefined, "an error occurred while fetching the metadata");
              continue;
            }
            this._logger.information(responsibleExtractor.name, "extracted metadata");
            this._logger.jsonDump("INFO", responsibleExtractor.name, metadata);
            let responsibleDownloader = this._downloaders.find((extractor) => extractor.checkResponsibility(url.href));
            if (!responsibleDownloader) {
              this._logger.information(undefined, "there was no matching provider, using the generic one.");
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
                continue;
              }
              this._logger.information(responsibleDownloader.name, "downloaded file(s)");
              this._logger.jsonDump("INFO", responsibleDownloader.name, download);
              const drmFound = !!(
                isContainerDownload(download) ? (download.contents ?? <EpisodeDownload[]>[]).flatMap((episode) => episode.files) : download.files
              ).filter((file) => file.encrypted).length;
              console.debug(undefined, "DRM protected content was downloaded and has to be decrypted");
              if (drmFound && !this._config.skipDrm) {
                /*const keys = [...new Set(Object.keys(psshData).flatMap((formatId) => psshData[formatId].toString("base64")))].map((pssh) =>
                  Buffer.from(pssh, "base64")
                );*/
                if (!this._decryptFiles(download)) {
                  continue;
                }
              }
            } catch (error) {
              this._logger.debug(responsibleDownloader.name, error, (<Error>error)?.stack);
              this._handleError(responsibleDownloader.name, error);
            }
          } catch (error) {
            this._logger.debug(responsibleExtractor.name, error, (<Error>error)?.stack);
            this._handleError(responsibleExtractor.name, error);
          }
        } catch (error) {
          this._logger.debug(undefined, error, (<Error>error)?.stack);
          this._handleError(undefined, error);
        }
      }
    }
  }

  private async _decryptFiles(download: Download): Promise<boolean> {
    const licenseInformation = download.metadata.source.licenseInformation;
    const psshData = licenseInformation.psshData;
    if (!psshData) {
      this._handleError(undefined, "DRM protected content was downloaded but no key identifiers were found");
      return false;
    }
    const cache: Record<string, KeyContainer[]> = {};
    if (isContainerDownload(download)) {
      for (const episode of download.contents ?? <EpisodeDownload[]>[]) {
        if (!(await this._decryptEpisode(episode, licenseInformation, psshData, cache))) {
          return false;
        }
      }
    } else {
      if (!(await this._decryptEpisode(download, licenseInformation, psshData, cache))) {
        return false;
      }
    }
    return true;
  }

  private async _decryptEpisode(
    episode: EpisodeDownload,
    licenseInformation: LicenseInformation,
    psshData: Record<string, Buffer>,
    cache: Record<string, KeyContainer[]>
  ): Promise<boolean> {
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
        this._logger.debug(undefined, `pssh "${pssh.toString("base64")}" is cached and will be used`);
      } else {
        this._logger.debug(undefined, `pssh "${pssh.toString("base64")}" is not cached and will be fetched`);
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
      this._drm.decrpytFile(file, keyContainers);
      this._logger.debug(undefined, `try to decrypt "${file.path}"`);
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
