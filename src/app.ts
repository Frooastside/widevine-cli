import { Holz } from "holz-provider";
import { exit } from "process";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import extractors, { generic } from "./extractors/index.js";
import { config } from "./index.js";
import { Input, Logger } from "./io.js";

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: new Holz((cid: string, captcha: CaptchaInfo) => {
      logger.warn(
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

export const logger = new Logger("wvcli", !!config().silent, !!config().verbose);
export const io = new Input();

export async function start() {
  if (config().interactive) {
    console.log("Hallo");
  } else {
    const inputs = config().input;
    if (!inputs?.length) {
      throw new Error("you have to either specify one or multiple inputs with [-i | --input] or  use the interactive mode with [-I --interactive].");
    }
    for (const input of inputs) {
      try {
        const url = new URL(input);
        if (!url.origin) {
          throw new Error("The provided url is not valid!");
        }
        let responsibleExtractors = extractors.find((extractor) => extractor.checkResponsibility(url.href));
        if (!responsibleExtractors) {
          logger.information(undefined, "there was no matching provider, using the generic one.");
          responsibleExtractors = generic;
        }
        if (!responsibleExtractors.ready) {
          await responsibleExtractors.initialize();
        }
        try {
          if (!responsibleExtractors.ready) {
            throw new Error("still not ready after initialization");
          }
        } catch (error) {
          handleError(responsibleExtractors.name, error);
        }
      } catch (error) {
        handleError(undefined, error);
      }
    }
  }
}

export function release() {
  extractors.forEach((extractor) => extractor.release());
  io.release();
}

function handleError(component: string | undefined, error: unknown): void {
  if (!config().ignoreErrors) {
    logger.error(component, error);
    exit(1);
  } else {
    logger.warn(component, "Ignoring error because of --ignore-errors", error);
    return;
  }
}
