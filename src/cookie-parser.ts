import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { Config } from "./index.js";

export type Cookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  secure: boolean;
};

export const cookieJar: Cookie[] = [];

export function initializeCookieStore(config: Config) {
  if (config.chromeLoadCookies) {
    readCookieJar();
    readExternalCookies();
  } else {
    readExternalCookies();
    readCookieJar();
  }
}

export function readCookieJar() {
  if (existsSync("security/cookies.json")) {
    console.log("cookie json file exists");
    addCookies(JSON.parse(readFileSync("security/cookies.json", "utf8")));
  }
}

export function writeCookieJar() {
  if (!existsSync("security/")) {
    mkdirSync("security/");
  }
  writeFileSync("security/cookies.json", JSON.stringify(cookieJar), "utf8");
}

export function addCookies(cookies: Cookie[]) {
  const newCookieJar = cookieJar.filter(
    (cookie) =>
      !cookies.find(
        (supliedCookie) =>
          cookie.domain === supliedCookie.domain &&
          cookie.name === supliedCookie.name &&
          cookie.path === supliedCookie.path &&
          cookie.secure === supliedCookie.secure
      )
  );
  newCookieJar.push(...cookies);
  cookieJar.splice(0);
  cookieJar.push(...newCookieJar);
}

function readExternalCookies() {
  if (!existsSync("cookies/")) {
    return;
  }
  const cookieFiles = readdirSync("cookies/");
  if (!cookieFiles || cookieFiles.length < 1) {
    return;
  }
  addCookies(
    cookieFiles
      .map((fileName) => readFileSync(`cookies/${fileName}`, "utf8"))
      .map((fileContent) =>
        fileContent
          .split("\n")
          .map((line) => parseCookie("" + line))
          .filter((cookie): cookie is Cookie => cookie !== null && cookie !== undefined && !!cookie.name && !!cookie.value)
      )
      .flat()
  );
}

function parseCookie(line: string): Cookie | null {
  const matches = line.match(/^([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)$/);
  if (!matches) return null;

  const [, domain, , path, secure, expires, name, value] = Array.from(matches);

  return {
    name,
    value,
    domain,
    path,
    expires: Number(expires),
    secure: secure === "TRUE"
  };
}
