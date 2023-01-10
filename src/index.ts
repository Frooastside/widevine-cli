import { Command, Option } from "@commander-js/extra-typings";
import chalk from "chalk";
import { release, start } from "./app.js";

const program = new Command()
  .configureOutput({
    writeErr: (string) => process.stderr.write(string),
    writeOut: (string) => process.stderr.write(string),
    outputError: (str, write) => write(chalk.redBright(str))
  })
  .version("-0.2.1", "-V --version")
  .addOption(new Option("-i --input <urls...>", "urls to parse and download").conflicts("interactive"))
  .addOption(new Option("-I --interactive", "enable interactive mode").conflicts("input"))
  .addOption(new Option("-v --verbose"))
  .addOption(new Option("-s --silent"))
  .addOption(new Option("-S --simulate", "dont actually download anything but fetch metadata and test if a download would be possible"))
  .addOption(new Option("   --visual"))
  .addOption(new Option("   --ignore-errors"))
  .addOption(new Option("   --skip-questions"))
  .addOption(new Option("-D --only-drm"))
  .addOption(new Option("   --force-local-drm").conflicts("forceRemoteDrm"))
  .addOption(new Option("   --force-remote-drm").conflicts("forceLocalDrm"));

program.parse(process.argv);

const options = program.opts();

if (!options.interactive && !options.input) {
  program.error("you have to either specify one or multiple inputs with [-i | --input] or  use the interactive mode with [-I --interactive].");
}

export type Config = typeof options;
export const config = () => options;

try {
  await start();
} catch (error) {
  program.error((<Error>error).message);
} finally {
  release();
}
