import { Command, Option } from "@commander-js/extra-typings";
import chalk from "chalk";
import dotenv from "dotenv";
import App from "./downloader.js";
import { installDependencies } from "./install.js";

dotenv.config();

console.log = () => {};
console.error = () => {};
console.warn = () => {};

export type GlobalConfig = ReturnType<typeof program.opts>;
export type DownloadConfig = ReturnType<typeof downloadCommand.opts>;

export let globalConfig: GlobalConfig = {};

const installCommand = new Command("install").action(install);
const downloadCommand = new Command("download")
  .action(download)
  .addOption(new Option("-i --input <urls...>", "urls to parse and download").conflicts("interactive"))
  .addOption(new Option("-S --simulate", "dont actually download anything but fetch metadata and test if a download would be possible"))
  .addOption(new Option("-I --interactive", "enable interactive mode").conflicts(["input", "skipQuestions"]))
  .addOption(new Option("   --skip-questions").conflicts("interactive"))
  .addOption(new Option("   --visual"))
  .addOption(new Option("   --title <title>"))
  .addOption(new Option("   --container <container>"))
  .addOption(new Option("   --episode <episode>"))
  .addOption(new Option("   --season <season>"))
  .addOption(new Option("   --credentials <email:password>").conflicts(["anonymous", "refresh-token"]))
  .addOption(new Option("   --refresh-token <refresh-token>").conflicts(["credentials", "anonymous"]))
  .addOption(new Option("   --anonymous").conflicts(["credentials", "refresh-token"]))
  .addOption(new Option("-D --only-drm").conflicts("skip-drm"))
  .addOption(new Option("   --skip-drm").conflicts("only-drm"))
  .addOption(new Option("   --force-local-drm").conflicts("forceRemoteDrm"))
  .addOption(new Option("   --force-remote-drm").conflicts("forceLocalDrm"))
  .addOption(new Option("-o --output <path>", "Output path. Specify a directory or use the {ext} template option.").default("./{title}.{ext}"))
  .addOption(new Option("   --chrome-channel <channel>").choices(["chrome", "chrome-beta", "chrome-dev", "chrome-canary"]).default("chrome"))
  .addOption(new Option("   --chrome-unsecure"))
  .addOption(new Option("   --chrome-load-cookies"))
  .addOption(new Option("-N --concurrent-fragments <threads>").default(1).argParser((string) => Number(string ?? "1")))
  .addOption(new Option("   --keep-temporary-files"));

const program = new Command()
  .configureOutput({
    writeErr: (string) => process.stderr.write(string),
    writeOut: (string) => process.stderr.write(string),
    outputError: (str, write) => write(chalk.redBright(str))
  })
  .version("0.1.0", "-V --version")
  .addOption(new Option("-d --debug").implies({ verbose: true }))
  .addOption(new Option("-v --verbose").conflicts("silent"))
  .addOption(new Option("-s --silent").conflicts("verbose"))
  .addOption(new Option("   --ignore-errors"))
  .addCommand(installCommand)
  .addCommand(downloadCommand);

program.parse(process.argv);

function initializeGlobalConfig() {
  globalConfig = program.opts() as GlobalConfig;
}

function install() {
  initializeGlobalConfig();
  void installDependencies();
}

function download(_args: unknown, command: Command) {
  initializeGlobalConfig();
  const downloadConfig: DownloadConfig = command.opts() as DownloadConfig;

  downloadConfig.credentials = downloadConfig.credentials || process.env.WVCLI_CREDENTIALS;
  downloadConfig.refreshToken = downloadConfig.refreshToken || process.env.WVCLI_REFRESH_TOKEN;

  if (!downloadConfig.interactive && !downloadConfig.input) {
    program.error("you have to either specify one or multiple inputs with [-i | --input] or use the interactive mode with [-I --interactive].");
  }

  const app = new App(downloadConfig);

  try {
    void app.start().then(() => app.release());
  } catch (error) {
    program.error((error as Error)?.message);
    app.release();
  }
}
