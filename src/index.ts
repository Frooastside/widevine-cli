import { Holz } from "holz-provider";
import readline from "node:readline/promises";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { CaptchaInfo } from "puppeteer-extra-plugin-recaptcha/dist/types";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import Downloader from "./downloader.js";

const input = readline.createInterface(process.stdin, process.stdout);

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

const downloader = new Downloader();
downloader.launch();

let textInput: string;

while ((textInput = await input.question("Download URL: ")) && textInput !== "q" && textInput !== "exit") {
  console.log(await downloader.download(textInput));
}

release();

async function requestSolver(cid: string, captcha: CaptchaInfo) {
  input.write(
    `A Captcha has to be solved. Please use the Holz-Dekstop application to solve the solve the Captcha with the Id '${cid}'. ${captcha.url}`
  );
}

function release() {
  input.close();
}

export {};
