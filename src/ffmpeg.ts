import BinaryExecutor, { ExecutionArguments } from "./binaryExecutor.js";
import { Logger } from "./io.js";
import { DownloadedFile, DownloadedMediaFile, isMediaDownload } from "./service.js";

const binaryExecutor = new BinaryExecutor("ffmpeg");

export default class FFMPEG {
  private _logger: Logger;

  constructor(logger: Logger) {
    this._logger = logger;
  }

  async combineDownloadedFiles(files: DownloadedFile[], output: string) {
    await this._combineFiles(
      files.filter((file) => !isMediaDownload(file) || !(file as DownloadedMediaFile).encrypted),
      output
    );
  }

  private async _combineFiles(files: DownloadedFile[], output: string) {
    let stream: number = 0;
    const args: ExecutionArguments = [
      "-y",
      files.map((file) => ["-i", `"${file.path}"`]).flat(),
      files
        .map((file, index) => {
          const streams = file.streams;
          const output: string[] = [];
          for (let i = 0; i < streams; i++) {
            output.push(`-map ${index}:${i}`);
          }
          if (file.language) {
            for (let i = 0; i < streams; i++) {
              output.push(`-metadata:s:${stream + i}`, `language="${file.language.iso_639_3}"`);
            }
          }
          stream += streams;
          return output;
        })
        .flat(),
      ["-c:v", "copy"],
      ["-c:a", "copy"],
      ["-c:s", "copy"],
      `"${output}"`
    ];
    this._logger.debug(args.flat().join(" "));
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
