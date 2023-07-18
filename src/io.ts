import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import readline, { Interface } from "node:readline/promises";
import { format } from "util";
import { v4 as uuidv4 } from "uuid";
import { globalConfig } from "./index.js";

export class Input {
  private _input: Interface;

  constructor() {
    this._input = readline.createInterface(process.stdin, process.stdout);
  }

  async question(text: string): Promise<string> {
    return await this._input.question(text);
  }

  release() {
    this._input.close();
  }
}

export class Logger {
  private _baseComponent: string;

  constructor(baseComponent: string) {
    this._baseComponent = baseComponent;
  }

  information(...objects: unknown[]) {
    if (globalConfig.silent) {
      return;
    }
    process.stderr.write(this.format("INFO", false, objects.join(", ")).concat("\n"));
  }

  extraInformation(...objects: unknown[]) {
    if (!globalConfig.verbose && !globalConfig.debug) {
      return;
    }
    process.stderr.write(this.format("INFO", false, objects.join(", ")).concat("\n"));
  }

  warn(...objects: unknown[]) {
    process.stderr.write(this.format("WARNING", false, objects.join(", ")).concat("\n"));
  }

  error(...objects: unknown[]) {
    process.stderr.write(this.format("ERROR", false, chalk.redBright(objects.join(", "))).concat("\n"));
  }

  debug(...objects: unknown[]) {
    if (!globalConfig.debug) {
      return;
    }
    process.stderr.write(this.format("DEBUG", false, objects.join(", ")).concat("\n"));
  }

  debugJsonDump(object: unknown) {
    if (!globalConfig.debug) {
      return;
    }
    process.stderr.write(this.format("DEBUG", false, JSON.stringify(object)).concat("\n"));
  }

  debugFileDump(filename: string, extension: string, fileContents: string | NodeJS.ArrayBufferView) {
    if (!globalConfig.debug) {
      return;
    }
    if (!existsSync("security/")) {
      mkdirSync("security/");
    }
    writeFileSync(`security/${filename}-${uuidv4()}.${extension}`, fileContents);
  }

  format(level: "DEBUG" | "INFO" | "WARNING" | "ERROR", input: boolean, text: string): string {
    const date = new Date();
    const dateString = chalk.greenBright(`${date.toLocaleTimeString()},${date.getMilliseconds()}`);
    const componentString = chalk.blue(this._baseComponent);
    const color = this._color(level);
    return input
      ? format("[%s] %s (%s): ", componentString, color(level), text)
      : format("[%s] %s (%s): %s ", dateString, componentString, color(level), text);
  }

  private _color(level: "DEBUG" | "INFO" | "WARNING" | "ERROR"): typeof chalk.red {
    return level === "INFO" ? chalk.white : level === "ERROR" ? chalk.redBright : level === "WARNING" ? chalk.yellow : chalk.gray;
  }
}
