import { Command, Option } from "@commander-js/extra-typings";
import chalk from "chalk";
import dotenv from "dotenv";
import { statSync } from "fs";
import App from "./app.js";

dotenv.config();

export type Config = typeof config;

const program = new Command()
  .configureOutput({
    writeErr: (string) => process.stderr.write(string),
    writeOut: (string) => process.stderr.write(string),
    outputError: (str, write) => write(chalk.redBright(str))
  })
  .version("-0.2.1", "-V --version")
  .addOption(new Option("-i --input <urls...>", "urls to parse and download").conflicts("interactive"))
  .addOption(new Option("-I --interactive", "enable interactive mode").conflicts(["input", "skipQuestions"]))
  .addOption(new Option("-v --verbose").conflicts("silent"))
  .addOption(new Option("-s --silent").conflicts("verbose"))
  .addOption(new Option("-S --simulate", "dont actually download anything but fetch metadata and test if a download would be possible"))
  .addOption(new Option("   --visual"))
  .addOption(new Option("   --ignore-errors"))
  .addOption(new Option("   --skip-questions").conflicts("interactive"))
  .addOption(new Option("-D --only-drm"))
  .addOption(new Option("   --skip-drm"))
  .addOption(new Option("   --force-local-drm").conflicts("forceRemoteDrm"))
  .addOption(new Option("   --force-remote-drm").conflicts("forceLocalDrm"))
  .addOption(new Option("-p --post-processor [post-processors...]"))
  .addOption(new Option("   --jellyfin-root [path]").default("."))
  .addOption(new Option("-N --concurrent-fragments [threads]").default(1).argParser((string) => Number(string ?? "1")));

program.parse(process.argv);

const config = program.opts();

if (!config.interactive && !config.input) {
  program.error("you have to either specify one or multiple inputs with [-i | --input] or  use the interactive mode with [-I --interactive].");
}

if (config.jellyfinRoot === true) {
  program.error("you have to provide a path after [--jellyfin-root]");
} else if (!statSync(config.jellyfinRoot).isDirectory()) {
  program.error("you have to provide a directory [--jellyfin-root]");
}

const app = new App(config);

try {
  await app.start();
} catch (error) {
  program.error((<Error>error)?.message);
} finally {
  app.release();
}
