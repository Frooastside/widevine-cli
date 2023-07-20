import BinaryExecutor, { ExecutionArguments } from "./binaryExecutor.js";
import { Logger } from "./io.js";
import { DownloadedMediaFile } from "./service.js";

const binaryExecutor = new BinaryExecutor("ffmpeg");

export default class FFMPEG {
  private _logger: Logger;

  constructor(logger: Logger) {
    this._logger = logger;
  }

  async combineDownloadedFiles(files: DownloadedMediaFile[], output: string) {
    await this.combineFiles(
      files.filter((file) => !file.encrypted).map((file) => file.path),
      output
    );
  }

  async combineFiles(files: string[], output: string) {
    const args: ExecutionArguments = [
      files.map((path) => ["-i", `"${path}"`]).flat(),
      ["-c:v", "copy"],
      ["-c:a", "copy"],
      ["-c:s", "copy"],
      `"${output}"`
    ];
    this._logger.debug(args.join(" "));
    const child = await binaryExecutor.spawn(args);
    let errorOutput = "\n";
    child.stderr?.on("data", (data) => (errorOutput = errorOutput + data));
    await new Promise<void>((resolve, reject) => {
      child.on("exit", (exitCode) => {
        if (exitCode === 0) {
          resolve();
        } else {
          this._logger.error(this.name, errorOutput);
          reject();
        }
      });
    });
  }

  get name(): string {
    return "ffmpeg";
  }
}
