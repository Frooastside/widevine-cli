import chalk from "chalk";
import readline, { Interface } from "readline/promises";
import { format } from "util";
import { config } from "./index.js";

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
  private _silent: boolean;
  private _verbose: boolean;

  constructor(baseComponent: string, silent: boolean, verbose: boolean) {
    this._baseComponent = baseComponent;
    this._silent = silent;
    this._verbose = verbose;
  }

  information(component?: string, ...objects: unknown[]) {
    if (config().silent) {
      return;
    }
    process.stderr.write(this._format(component, false, objects.join(", ")));
  }

  warn(component?: string, ...objects: unknown[]) {
    process.stderr.write(this._format(component, false, `${chalk.yellow("WARNING")}, ${objects.join(", ")}`));
  }

  error(component?: string, ...objects: unknown[]) {
    process.stderr.write(this._format(component, false, chalk.redBright(objects.join(", "))));
  }

  debug(component: string, ...objects: unknown[]) {
    if (!config().verbose) {
      return;
    }
    process.stderr.write(this._format(component, false, objects.join(", ")));
  }

  jsonDump(level: "debug" | "output", component: string | undefined, object: unknown) {
    if (!config().verbose) {
      return;
    }
    (level === "output" ? process.stdout : process.stderr).write(this._format(component, false, JSON.stringify(object, null, 2)));
  }

  private _format(component: string | undefined, input: boolean, text: string): string {
    const date = new Date();
    const dateString = chalk.greenBright(`${date.toLocaleTimeString()},${date.getMilliseconds()}`);
    const componentString = chalk.blue(!!component ? component : this._baseComponent);
    return input ? format("[%s] %s: ", componentString, text) : format("[%s] %s: %s", dateString, componentString, text);
  }
}
