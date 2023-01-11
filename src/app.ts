import { Holz } from "holz-provider";
import { exit } from "process";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import DrmSolver from "./drm.js";
import GenericExtractor from "./extractors/generic.js";
import WakanimService from "./extractors/wakanim.js";
import { Config } from "./index.js";
import { Input, Logger } from "./io.js";
import { Extractor } from "./service.js";

export default class App {
  private _config: Config;
  private _logger: Logger;
  private _io: Input;
  private _drm: DrmSolver;

  private _extractors: Extractor[];
  private _genericExtractor: Extractor;

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

    this._extractors = [new WakanimService(config, this._logger)];
    this._genericExtractor = new GenericExtractor();
  }

  async start() {
    if (this._config.interactive) {
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
          if (!url.origin) {
            throw new Error("The provided url is not valid!");
          }
          let responsibleExtractors = this._extractors.find((extractor) => extractor.checkResponsibility(url.href));
          if (!responsibleExtractors) {
            this._logger.information(undefined, "there was no matching provider, using the generic one.");
            responsibleExtractors = this._genericExtractor;
          }
          if (!responsibleExtractors.ready) {
            await responsibleExtractors.initialize();
          }
          try {
            if (!responsibleExtractors.ready) {
              throw new Error("still not ready after initialization");
            }
          } catch (error) {
            this._handleError(responsibleExtractors.name, error);
          }
        } catch (error) {
          this._handleError(undefined, error);
        }
      }
    }
  }

  release() {
    this._extractors.forEach((extractor) => extractor.release());
    this._io.release();
  }

  private _handleError(component: string | undefined, error: unknown): void {
    if (!this._config.ignoreErrors) {
      this._logger.error(component, error);
      exit(1);
    } else {
      this._logger.warn(component, "Ignoring error because of --ignore-errors", error);
      return;
    }
  }
}
