import enquirer from "enquirer";
import { Holz } from "holz-provider";
import { exit } from "process";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { URL } from "url";
import { initializeCookieStore as initializeCookieJar } from "./cookie-parser.js";
import YT_DLP_Downloader from "./downloaders/yt-dlp.js";
import DrmSolver from "./drm.js";
import GenericExtractor from "./extractors/generic.js";
import WakanimService from "./extractors/wakanim.js";
import { Config } from "./index.js";
import { Input, Logger } from "./io.js";
import { Downloader, Extractor } from "./service.js";

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
    this._genericDownloader = new YT_DLP_Downloader();
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
          let responsibleExtractors = this._extractors.find((extractor) => extractor.checkResponsibility(url.href));
          if (!responsibleExtractors) {
            this._logger.information(undefined, "there was no matching provider, using the generic one.");
            responsibleExtractors = this._genericExtractor;
          }
          if (!responsibleExtractors.ready) {
            if (!responsibleExtractors.initialize) {
              throw new Error("has to be ready if there is not initializer");
            }
            await responsibleExtractors.initialize();
          }
          try {
            if (!responsibleExtractors.ready) {
              throw new Error("still not ready after initialization");
            }
            const metadata = await responsibleExtractors.fetchMetadata(url.href);
            if (!metadata) {
              this._handleError(undefined, "an error occurred while fetching the metadata");
              continue;
            }
            this._logger.information(responsibleExtractors.name, "extracted metadata");
            this._logger.jsonDump("INFO", responsibleExtractors.name, metadata);
          } catch (error) {
            this._logger.debug(responsibleExtractors.name, error, (<Error>error).stack);
            this._handleError(responsibleExtractors.name, error);
          }
        } catch (error) {
          this._logger.debug(undefined, error, (<Error>error).stack);
          this._handleError(undefined, error);
        }
      }
    }
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
      this._logger.debug(undefined, error, (<Error>error).stack);
      return false;
    }
  }
}
