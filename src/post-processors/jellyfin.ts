import { existsSync, mkdir as rawMkdir, rename as rawRename, rm as rawRm, statSync } from "fs";
import { promisify } from "util";
import FFMPEG from "../ffmpeg.js";
import { Config } from "../index.js";
import { Logger } from "../io.js";
import { Output, PostProcessor } from "../service.js";

const mkdir = promisify(rawMkdir);
const rename = promisify(rawRename);
const rm = promisify(rawRm);

export default class Jellyfin extends PostProcessor {
  private _config: Config;
  private _logger: Logger;
  private _ffmpeg: FFMPEG;

  constructor(config: Config, logger: Logger) {
    super();
    this._config = config;
    this._logger = logger;
    this._ffmpeg = new FFMPEG(logger);
  }

  async process(download: Output | Output[]): Promise<void> {
    if (Array.isArray(download)) {
      for (const output of download) {
        try {
          this._logger.jsonDump("DEBUG", undefined, output);
          await this._processOutput(output);
        } catch (error) {
          this._logger.debug(this.name, error, (<Error>error)?.stack);
          this._logger.error(this.name, `post processing of "${output.title}" failed, please manually try to fix it`, error);
        }
      }
    } else {
      const output = download;
      try {
        this._logger.jsonDump("DEBUG", undefined, output);
        await this._processOutput(output);
      } catch (error) {
        this._logger.debug(this.name, error, (<Error>error)?.stack);
        this._logger.error(this.name, `post processing of "${output.title}" failed, please manually try to fix it`, error);
      }
    }
  }

  private async _processOutput(output: Output) {
    if (this._config.jellyfinRoot === true) {
      throw new Error("Internal Error.");
    }
    const jellyfinRoot =
      this._config.jellyfinRoot.endsWith("/") || this._config.jellyfinRoot.endsWith("\\")
        ? this._config.jellyfinRoot
        : `${this._config.jellyfinRoot}/`;
    if (!output.files.length) {
      this._logger.warn(this.name, `${output.title} has no downloaded files, skipping`);
      return;
    }
    const containerPath = `${jellyfinRoot}${output.container !== null ? `${output.container}/` : ""}`;
    if (!existsSync(containerPath)) {
      this._logger.debug(this.name, `${containerPath} does not exist, creating...`);
      await mkdir(containerPath);
    } else {
      if (!statSync(containerPath).isDirectory()) {
        throw new Error(`${containerPath} already exists but is no a directory`);
      }
    }
    const seasonPath = `${containerPath}${
      output.season !== null && output.season !== -1 ? (output.season > 0 ? `Season ${output.season}/` : "Specials/") : ""
    }`;
    if (!existsSync(seasonPath)) {
      this._logger.debug(this.name, `${seasonPath} does not exist, creating...`);
      await mkdir(seasonPath);
    } else {
      if (!statSync(seasonPath).isDirectory()) {
        throw new Error(`${seasonPath} already exists but is no a directory`);
      }
    }
    const path = `${seasonPath}${output.title} ${output.season ? (`${output.season}`.length < 10 ? `S0${output.season}` : `S${output.season}`) : ""}${
      output.index ? (`${output.index}`.length < 10 ? `E0${output.index}` : `E${output.index}`) : ""
    }.mkv`;
    this._logger.debug(this.name, `merging all provided formats into ${path}`);
    if (existsSync(path)) {
      this._logger.debug(this.name, `${path} already exist, trying to merge with old file`);
      const oldFile = `_${path}`;
      await rename(path, oldFile);
      await this._ffmpeg.combineFiles(output.files.concat(oldFile), path);
      this._logger.debug(this.name, "merged all formats, removing old file");
      await rm(oldFile);
    } else {
      await this._ffmpeg.combineFiles(output.files, path);
      this._logger.debug(this.name, `merged files into ${path}`);
    }
  }

  get name(): string {
    return "Jellyfin";
  }

  get version(): string {
    return "0.0.1";
  }
}
