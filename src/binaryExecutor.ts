import { ChildProcess, exec as execProcess, spawn } from "child_process";
import os from "os";
import path from "path";
import { promisify } from "util";

const exec = promisify(execProcess);

export type Platform = "linux" | "linux_arm" | "mac" | "mac_arm" | "windows" | "windows_arm";
export type Product = "ffmpeg" | "ffmpeg-latest" | "ffprobe-generic" | "yt-dlp" | "shaka-packager" | "crunchy-cli";

const platform = detectPlatform();

export type ExecutionArguments = (string | string[])[];

export default class BinaryExecutor {
  private _product: Product;
  private _executionPath: string;

  constructor(product: Product) {
    this._product = product;
    this._executionPath = `bin${path.sep}${this._product}${platform === "windows" || platform === "windows_arm" ? ".exe" : ""}`;
  }

  async execute(args: ExecutionArguments): Promise<string> {
    console.log(`"${this._executionPath}"`, args.flat());
    const { stdout } = await exec(`${this._executionPath} ${args.map((arg) => (typeof arg === "string" ? arg : arg.join(" "))).join(" ")}`, {
      maxBuffer: 1024 * 1024 * 10
    });
    return stdout;
  }

  async spawn(args: ExecutionArguments): Promise<ChildProcess> {
    console.log(`"${this._executionPath}"`, args.flat());
    return spawn(`"${this._executionPath}"`, args.flat(), { shell: true });
  }
}

export function detectPlatform(): Platform {
  switch (os.platform()) {
    case "darwin":
      return os.arch() === "arm64" ? "mac_arm" : "mac";
    case "linux":
      return os.arch() === "arm64" ? "linux_arm" : "linux";
    case "win32":
      return os.arch() === "arm64" ? "windows_arm" : "windows";
    default:
      throw new Error(`Unsupported platform "${os.platform()}, ${os.arch()}"`);
  }
}
