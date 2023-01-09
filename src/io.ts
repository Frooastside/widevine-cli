import chalk from "chalk";
import readline from "node:readline/promises";
import { configuration } from "./index.js";

import { format } from "util";

const input = readline.createInterface(process.stdin, process.stdout);

async function question(text: string): Promise<string> {
  return await input.question(text);
}

function information(component: string, ...objects: unknown[]) {
  if (configuration.silent) {
    return;
  }
  process.stderr.write(_format(component, false, objects.join(", ")));
}

function warn(component?: string, ...objects: unknown[]) {
  process.stderr.write(_format(component, false, `${chalk.yellow("WARNING")}, ${objects.join(", ")}`));
}

function error(component?: string, ...objects: unknown[]) {
  process.stderr.write(_format(component, false, chalk.redBright(objects.join(", "))));
}

function debug(component: string, ...objects: unknown[]) {
  if (!configuration.verbose) {
    return;
  }
  process.stderr.write(_format(component, false, objects.join(", ")));
}

function jsonDump(level: "debug" | "output", component: string | undefined, object: unknown) {
  if (!configuration.verbose) {
    return;
  }
  (level === "output" ? process.stdout : process.stderr).write(_format(component, false, JSON.stringify(object, null, 2)));
}

function _format(component: string | undefined, input: boolean, text: string): string {
  const date = new Date();
  const dateString = chalk.greenBright(`${date.toLocaleTimeString()},${date.getMilliseconds()}`);
  const componentString = chalk.blue(!!component ? component : "wvcli");
  return input ? format("[%s] %s: ", componentString, text) : format("[%s] %s: %s", dateString, componentString, text);
}

function release() {
  input.close();
}

export { release, question };
export const logger = { information, warn, error, debug, jsonDump };
