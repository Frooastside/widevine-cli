import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import readline, { Interface } from "node:readline/promises";
import { format } from "util";
import { v4 as uuidv4 } from "uuid";

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

export type LoggerConfig = { silent?: boolean; verbose?: boolean; debug?: boolean };

export class Logger {
  private _baseComponent: string;
  private _silent?: boolean;
  private _verbose?: boolean;
  private _debug?: boolean;

  constructor(baseComponent: string, config?: LoggerConfig) {
    this._baseComponent = baseComponent;
    this._silent = !!config?.silent;
    this._verbose = !!config?.verbose;
    this._debug = !!config?.debug;
  }

  information(...objects: unknown[]) {
    if (this._silent) {
      return;
    }
    process.stderr.write(this.format("INFO", false, objects.join(", ")).concat("\n"));
  }

  extraInformation(...objects: unknown[]) {
    if (!this._verbose && !this._debug) {
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
    if (!this._debug) {
      return;
    }
    process.stderr.write(this.format("DEBUG", false, objects.join(", ")).concat("\n"));
  }

  debugJsonDump(object: unknown) {
    if (!this._debug) {
      return;
    }
    process.stderr.write(this.format("DEBUG", false, JSON.stringify(object)).concat("\n"));
  }

  debugFileDump(filename: string, extension: string, fileContents: string | NodeJS.ArrayBufferView) {
    if (!this._debug) {
      return;
    }
    if (!existsSync("security/")) {
      mkdirSync("security/");
    }
    writeFileSync(`security/${filename}-${uuidv4()}.${extension}`, fileContents);
  }

  format(level: "DEBUG" | "INFO" | "WARNING" | "ERROR", input: boolean, text: string): string {
    const date = new Date();
    const dateString = chalk.greenBright(`${date.toLocaleTimeString()},${date.getMilliseconds().toString().padStart(3, "0")}`);
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
