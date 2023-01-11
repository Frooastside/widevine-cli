import { existsSync, readdirSync, readFileSync } from "fs";

export type Cookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  secure: boolean;
};

export const cookieJar: Cookie[] = [];

export function initializeCookieStore() {
  if (!existsSync("./cookies/")) {
    return;
  }
  const cookieFiles = readdirSync("./cookies/");
  if (!cookieFiles || cookieFiles.length < 1) {
    return;
  }
  cookieJar.push(
    ...cookieFiles
      .map((fileName) => readFileSync(`./cookies/${fileName}`, "utf8"))
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
