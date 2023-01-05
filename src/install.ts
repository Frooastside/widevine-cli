import { randomUUID } from "crypto";
import unzip from "extract-zip";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { chmod, mkdir, mkdtemp, rename } from "fs/promises";
import http from "http";
import https, { RequestOptions } from "https";
import lzma from "lzma-native";
import os from "os";
import path from "path";
import ProgressBar from "progress";
import tar from "tar-stream";
import { URL } from "url";

export type Platform = "linux" | "linux_arm" | "mac" | "mac_arm" | "windows" | "windows_arm";
type Product = "ffmpeg" | "ffmpeg-latest" | "ffprobe-generic" | "yt-dlp" | "shaka-packager" | "crunchy-cli";

const FFMPEG_WINDOWS_BASE_PATH = "https://github.com/GyanD/codexffmpeg/releases/download";
const FFMPEG_WINDOWS_RELEASE = "2023-01-01-git-62da0b4a74";
const FFMPEG_LINUX_BASE_PATH = "https://johnvansickle.com/ffmpeg/builds";
const FFMPEG_LINUX_RELEASE = "20220910";

const FFMPEG_GENERIC_BASE_PATH = "https://github.com/shaka-project/static-ffmpeg-binaries/releases/download/n4.4-2";

const YTDLP_BASE_PATH = "https://github.com/yt-dlp/yt-dlp/releases/download/2023.01.02";

const SHAKA_PACKAGER_BASE_PATH = "https://github.com/shaka-project/shaka-packager/releases/download/v2.6.1";

const CRUNCHY_BASE_PATH = "https://github.com/crunchy-labs/crunchy-cli/releases/download/v3.0.0-dev.6";

const downloadURLs: Record<Product, Partial<Record<Platform, string>>> = {
  "ffmpeg-latest": {
    linux: `${FFMPEG_LINUX_BASE_PATH}/ffmpeg-git-amd64-static.tar.xz`,
    linux_arm: `${FFMPEG_LINUX_BASE_PATH}/ffmpeg-git-arm64-static.tar.xz`,
    mac: "https://evermeet.cx/ffmpeg/ffmpeg-109469-g62da0b4a74.zip",
    mac_arm: "https://www.osxexperts.net/FFmpeg511ARM.zip",
    windows: `${FFMPEG_WINDOWS_BASE_PATH}/${FFMPEG_WINDOWS_RELEASE}/ffmpeg-${FFMPEG_WINDOWS_RELEASE}-full_build.zip`,
    windows_arm: `${FFMPEG_WINDOWS_BASE_PATH}/${FFMPEG_WINDOWS_RELEASE}/ffmpeg-${FFMPEG_WINDOWS_RELEASE}-full_build.zip`
  },
  ffmpeg: {
    linux: `${FFMPEG_GENERIC_BASE_PATH}/ffmpeg-linux-x64`,
    linux_arm: `${FFMPEG_GENERIC_BASE_PATH}/ffmpeg-linux-arm64`,
    mac: `${FFMPEG_GENERIC_BASE_PATH}/ffmpeg-osx-x64`,
    windows: `${FFMPEG_GENERIC_BASE_PATH}/ffmpeg-win-x64.exe`
  },
  "ffprobe-generic": {
    linux: `${FFMPEG_GENERIC_BASE_PATH}/ffprobe-linux-x64`,
    linux_arm: `${FFMPEG_GENERIC_BASE_PATH}/ffprobe-linux-arm64`,
    mac: `${FFMPEG_GENERIC_BASE_PATH}/ffprobe-osx-x64`,
    windows: `${FFMPEG_GENERIC_BASE_PATH}/ffprobe-win-x64.exe`
  },
  "yt-dlp": {
    linux: `${YTDLP_BASE_PATH}/yt-dlp_linux`,
    linux_arm: `${YTDLP_BASE_PATH}/yt-dlp_linux_aarch64`,
    mac: `${YTDLP_BASE_PATH}/yt-dlp_macos`,
    windows: `${YTDLP_BASE_PATH}/yt-dlp.exe`
  },
  "shaka-packager": {
    linux: `${SHAKA_PACKAGER_BASE_PATH}/packager-linux-x64`,
    linux_arm: `${SHAKA_PACKAGER_BASE_PATH}/packager-linux-arm64`,
    mac: `${SHAKA_PACKAGER_BASE_PATH}/packager-osx-x64`,
    windows: `${SHAKA_PACKAGER_BASE_PATH}/packager-win-x64.exe`
  },
  "crunchy-cli": {
    linux: `${CRUNCHY_BASE_PATH}/crunchy-v3.0.0-dev.6_linux`,
    mac: `${CRUNCHY_BASE_PATH}/crunchy-v3.0.0-dev.6_darwin`,
    windows: `${CRUNCHY_BASE_PATH}/crunchy-v3.0.0-dev.6_windows.exe`
  }
};

let platform: Platform;

export async function installDependencies() {
  detectPlatform();
  checkBin();
  console.log(`Downloading dependencies for Platform "${platform}"`);
  try {
    await installFFMPEG();
  } catch (error) {
    await installGeneric("ffmpeg", true);
  }
  await installGeneric("ffprobe-generic", false);
  await installGeneric("yt-dlp", true);
  await installGeneric("shaka-packager", false);
  await installGeneric("crunchy-cli", false);
}

function detectPlatform() {
  switch (os.platform()) {
    case "darwin":
      platform = os.arch() === "arm64" ? "mac_arm" : "mac";
      break;
    case "linux":
      platform = os.arch() === "arm64" ? "linux_arm" : "linux";
      break;
    case "win32":
      platform = os.arch() === "arm64" ? "windows_arm" : "windows";
      return;
    default:
      throw new Error(`Unsupported platform "${os.platform()}, ${os.arch()}"`);
  }
}

async function installFFMPEG() {
  const filePath = `./bin/ffmpeg${platform === "windows" || platform === "windows_arm" ? ".exe" : ""}`;
  if (existsSync(filePath)) {
    return console.log("skipping ffmpeg, already exists");
  }
  const url = downloadURLs["ffmpeg-latest"][platform];
  if (!url) {
    return console.warn("ffmpeg is not compatible with you platform or architecture, make sure you have it installed yourself then");
  }
  const downloadUrl = new URL(url);

  if (!canDownload(downloadUrl)) {
    return console.warn("ffmpeg is not compatible with you platform or architecture, make sure you have it installed yourself then");
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "ffmpeg-extracted"));

  await _downloadFile(downloadUrl, tempDir, createProgressBar("ffmpeg-latest"));

  if (!existsSync(tempDir)) {
    return console.warn("ffmpeg could not be downloaded, try again later");
  }

  switch (platform) {
    case "windows":
    case "windows_arm":
      await rename(`${tempDir}/ffmpeg-${FFMPEG_WINDOWS_RELEASE}-full_build/bin/ffmpeg.exe`, filePath);
      break;
    case "mac":
    case "mac_arm":
      await rename(`${tempDir}/ffmpeg`, "./bin/ffmpeg");
      break;
    case "linux":
    case "linux_arm":
      await rename(`${tempDir}/ffmpeg-git-${FFMPEG_LINUX_RELEASE}-${platform === "linux" ? "amd64" : "arm64"}-static/ffmpeg`, filePath);
      break;
    default:
      break;
  }

  await chmod(filePath, 0o755);
}

async function installGeneric(product: Product, required: boolean) {
  const filePath = `./bin/${product}${platform === "windows" || platform === "windows_arm" ? ".exe" : ""}`;

  if (existsSync(filePath)) {
    return console.log(`skipping ${product}, already exists`);
  }
  const url = downloadURLs[product][platform];
  if (!url) {
    if (required) {
      throw new Error(`${product} is required but not compatible with you platform or architecture`);
    } else {
      return console.warn(`${product} is not compatible with you platform or architecture, make sure you have it installed yourself then`);
    }
  }
  const downloadUrl = new URL(url);
  if (!canDownload(downloadUrl)) {
    if (required) {
      throw new Error(`${product} is required but not compatible with you platform or architecture`);
    } else {
      return console.warn(`${product} is not compatible with you platform or architecture, make sure you have it installed yourself then`);
    }
  }

  await _downloadFile(downloadUrl, filePath, createProgressBar(product));

  if (!existsSync(filePath)) {
    if (required) {
      throw new Error(`${product} is required but could not be downloaded, try again later`);
    } else {
      return console.warn(`${product} could not be downloaded. skipping it for now, try again later`);
    }
  }
  await chmod(filePath, 0o755);
}

async function checkBin() {
  if (!existsSync("bin")) {
    await mkdir("bin", { recursive: true });
  }

  if (!existsSync("bin")) {
    throw new Error("Error creating / finding bin folder");
  }
}

function createProgressBar(product: Product): ProgressBar {
  return new ProgressBar(`Downloading ${product} :elapseds [:bar] :percent :progress/:sizemb ETA: :etas`, {
    total: 0,
    width: 20,
    complete: "#",
    incomplete: " "
  });
}

function canDownload(url: URL): Promise<boolean> {
  return new Promise((resolve) => {
    const request = httpRequest(
      url,
      "HEAD",
      (response) => {
        resolve(response.statusCode === 200);
      },
      false
    );
    request.on("error", (error) => {
      console.error(error);
      resolve(false);
    });
  });
}

function _downloadFile(url: URL, destinationPath: string, progressBar?: ProgressBar): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let downloadedBytes = 0;
    let totalBytes = 0;
    let tempDir: string;

    httpRequest(url, "GET", (response) => {
      if (response.statusCode !== 200) {
        const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
        response.resume();
        reject(error);
        return;
      }
      const fileName = url.pathname.split("/").pop() ?? url.pathname;

      if (fileName.endsWith(".tar.xz")) {
        const lzmaStream = response.pipe(lzma.createDecompressor());
        const tarStream = tar.extract();
        tarStream.on("entry", (headers, stream, next) => {
          switch (headers.type) {
            case "file":
              const entryHandle = createWriteStream(`${destinationPath}/${headers.name}`);
              entryHandle.on("error", stream.destroy);
              stream.on("end", () => {
                entryHandle.end();
                return next();
              });
              stream.pipe(entryHandle);
              break;
            case "directory":
              mkdirSync(`${destinationPath}/${headers.name}`);
              return next();
              break;
            default:
              console.warn(`skipping entry "${headers.name}" with type "${headers.type}"`);
              stream.resume();
              return next();
          }
        });
        tarStream.on("finish", resolve);
        tarStream.on("error", reject);
        lzmaStream.pipe(tarStream);
      } else if (fileName.endsWith(".tar")) {
        response.pipe(tar.extract()).pipe(createWriteStream(destinationPath));
      } else {
        const fileStream = createWriteStream(fileName.endsWith(".zip") ? (tempDir = path.join(os.tmpdir(), randomUUID())) : destinationPath);
        fileStream.on("finish", async () => {
          if (fileName.endsWith(".zip")) {
            if (!existsSync(destinationPath)) {
              mkdirSync(destinationPath);
            }
            await unzip(tempDir, { dir: destinationPath });
          }
          return resolve();
        });
        fileStream.on("error", reject);
        response.pipe(fileStream);
      }

      totalBytes = parseInt(response.headers["content-length"] ?? "-1", 10);

      if (progressBar) {
        response.on("data", (chunk) => {
          downloadedBytes += chunk.length;
          if (progressBar.total !== totalBytes) {
            progressBar.total = totalBytes;
          }
          if (!progressBar.complete) {
            progressBar.tick(chunk.length, {
              progress: Number(downloadedBytes / 1000000).toFixed(2),
              size: Number(totalBytes / 1000000).toFixed(2)
            });
          }
        });
      }
    }).on("error", (error) => {
      throw new Error(error.stack);
    });
  });
}

function httpRequest(url: URL, method: string, response: (x: http.IncomingMessage) => void, keepAlive = true): http.ClientRequest {
  const options: RequestOptions = {
    method,
    headers: keepAlive ? { Connection: "keep-alive" } : undefined
  };

  const requestCallback = (res: http.IncomingMessage): void => {
    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      httpRequest(new URL(res.headers.location), method, response);
    } else {
      response(res);
    }
  };
  const request = url.protocol === "https:" ? https.request(url, options, requestCallback) : http.request(url, options, requestCallback);
  request.end();
  return request;
}