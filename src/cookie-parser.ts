import { readFileSync } from "fs";

const file = readFileSync("./security/cookies.txt", "utf8");

type Cookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  secure: boolean;
};

export const cookies: Cookie[] = file
  .split("\n")
  .map((line) => parseCookie("" + line))
  .filter((cookie): cookie is Cookie => cookie !== null && cookie !== undefined);

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
