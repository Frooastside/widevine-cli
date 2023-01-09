import { Command, Option } from "@commander-js/extra-typings";
import chalk from "chalk";
import { Holz } from "holz-provider";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { logger } from "./io.js";

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: new Holz(requestSolver),
    visualFeedback: true,
    throwOnError: false,
    solveInViewportOnly: false,
    solveScoreBased: true,
    solveInactiveChallenges: true
  })
);

function requestSolver(cid: string, captcha: CaptchaInfo) {
  logger.warn(
    `A Captcha has to be solved. Please use the Holz-Dekstop application to solve the solve the Captcha with the Id '${cid}'. ${captcha.url}`
  );
}

const program = new Command()
  .configureOutput({
    writeErr: (string) => process.stderr.write(string),
    writeOut: (string) => process.stderr.write(string),
    outputError: (str, write) => write(chalk.redBright(str))
  })
  .version("-0.2.1", "-V --version")
  .addOption(new Option("-i --input <urls...>", "urls to parse and download").conflicts("interactive"))
  .addOption(new Option("-I --interactive", "enable interactive mode").conflicts("input"))
  .addOption(new Option("-v --verbose"))
  .addOption(new Option("-s --silent"))
  .addOption(new Option("-S --simulate", "dont actually download anything but fetch metadata and test if a download would be possible"))
  .addOption(new Option("   --visual"))
  .addOption(new Option("   --ignore-errors"))
  .addOption(new Option("   --skip-questions"))
  .addOption(new Option("-D --only-drm"))
  .addOption(new Option("-D --only-drm"))
  .addOption(new Option("   --force-local-drm").conflicts("forceRemoteDrm"))
  .addOption(new Option("   --force-remote-drm").conflicts("forceLocalDrm"));

program.parse(process.argv);

export const configuration = program.opts();

console.log(configuration);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*export const configuration = {
  verbose: false,
  skipQuestions: false,
  interactive: false,
  simulate: false,
  visual: false,
  forceLocalDRM: false,
  forceRemoteDRM: false,
  onlyDRM: false,
  silent: 0,
  input: [] as string[]
};*/

/*if (configuration.interactive) {
  while ((textInput = ) && textInput !== "q" && textInput !== "exit") {
    console.log(await downloader.download(textInput));
  }
}*/

export {};
