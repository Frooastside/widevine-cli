import chalk from "chalk";
import readline, { Interface } from "node:readline/promises";
import { format } from "util";
import { Config } from "./index.js";

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
  private _config: Config;
  private _baseComponent: string;

  constructor(config: Config, baseComponent: string) {
    this._config = config;
    this._baseComponent = baseComponent;
  }

  information(component?: string, ...objects: unknown[]) {
    if (this._config.silent) {
      return;
    }
    process.stderr.write(this.format(component, "INFO", false, objects.join(", ")));
  }

  warn(component?: string, ...objects: unknown[]) {
    process.stderr.write(this.format(component, "WARNING", false, `${chalk.yellow("WARNING")}, ${objects.join(", ")}`));
  }

  error(component?: string, ...objects: unknown[]) {
    process.stderr.write(this.format(component, "ERROR", false, chalk.redBright(objects.join(", "))));
  }

  debug(component?: string, ...objects: unknown[]) {
    if (!this._config.verbose) {
      return;
    }
    process.stderr.write(this.format(component, "DEBUG", false, objects.join(", ")));
  }

  jsonDump(level: "DEBUG" | "INFO", component: string | undefined, object: unknown) {
    if (!this._config.verbose) {
      return;
    }
    (level === "INFO" ? process.stdout : process.stderr).write(this.format(component, level, false, JSON.stringify(object)));
  }

  format(component: string | undefined, level: "DEBUG" | "INFO" | "WARNING" | "ERROR", input: boolean, text: string): string {
    const date = new Date();
    const dateString = chalk.greenBright(`${date.toLocaleTimeString()},${date.getMilliseconds()}`);
    const componentString = chalk.blue(!!component ? component : this._baseComponent);
    const color = this._color(level);
    return input
      ? format("[%s] %s (%s): \n", componentString, color(level), text)
      : format("[%s] %s (%s): %s \n", dateString, componentString, color(level), text);
  }

  private _color(level: "DEBUG" | "INFO" | "WARNING" | "ERROR"): typeof chalk.red {
    return level === "INFO" ? chalk.white : level === "ERROR" ? chalk.redBright : level === "WARNING" ? chalk.yellow : chalk.gray;
  }
}
