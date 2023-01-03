import { exec as callbackExec } from "child_process";
import { createWriteStream } from "fs";
import http from "http";
import https from "https";
import os from "os";
import URL from "url";
import { promisify } from "util";

const exec = promisify(callbackExec);

type Product = "crunchy";

export type Platform = "linux" | "mac" | "mac_arm" | "win32" | "win64";

const CRUNCHY_BASE_PATH = "https://github.com/crunchy-labs/crunchy-cli/releases/download/v3.0.0-dev.5";

const downloadURLs: Record<Product, Partial<Record<Platform, string>>> = {
  crunchy: {
    linux: "crunchy-v3.0.0-dev.5_linux",
    mac: "crunchy-v3.0.0-dev.5_darwin",
    win32: "crunchy-v3.0.0-dev.5_windows.exe",
    win64: "crunchy-v3.0.0-dev.5_windows.exe"
  }
};

let platform: Platform;

export async function installDependencies() {
  switch (os.platform()) {
    case "darwin":
      platform = os.arch() === "arm64" ? "mac_arm" : "mac";
      break;
    case "linux":
      platform = "linux";
      break;
    case "win32":
      platform = os.arch() === "x64" || os.arch() === "arm64" ? "win64" : "win32";
      return;
    default:
      throw new Error(`Unsupported platform "${os.platform()}, ${os.arch()}"`);
  }
  await installCrunchy();
}

async function installCrunchy() {
  console.log(`${os.platform()} ${os.arch()}`);
}

function canDownload(product: Product): Promise<boolean> {
  const url = downloadURLs[product][platform];
  return new Promise((resolve) => {
    if (!url) {
      return resolve(false);
    }
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

/*async function download(
  revision: string,
  progressCallback: (x: number, y: number) => void = (): void => {}
): Promise<BrowserFetcherRevisionInfo | undefined> {
  const url = downloadURL(this.#product, this.#platform, this.#downloadHost, revision);
  const fileName = url.split("/").pop();
  assert(fileName, `A malformed download URL was found: ${url}.`);
  const archivePath = path.join(this.#downloadPath, fileName);
  const outputPath = this.#getFolderPath(revision);
  if (existsSync(outputPath)) {
    return this.revisionInfo(revision);
  }
  if (!existsSync(this.#downloadPath)) {
    await mkdir(this.#downloadPath, { recursive: true });
  }

  try {
    await _downloadFile(url, archivePath, progressCallback);
  } finally {
    if (existsSync(archivePath)) {
      await unlink(archivePath);
    }
  }
  const revisionInfo = revisionInfo(revision);
  if (revisionInfo) {
    await chmod(revisionInfo.executablePath, 0o755);
  }
  return revisionInfo;
}*/

function _downloadFile(url: string, destinationPath: string, progressCallback?: (x: number, y: number) => void): Promise<void> {
  let fulfill: (value: void | PromiseLike<void>) => void;
  let reject: (err: Error) => void;
  const promise = new Promise<void>((x, y) => {
    fulfill = x;
    reject = y;
  });

  let downloadedBytes = 0;
  let totalBytes = 0;

  const request = httpRequest(url, "GET", (response) => {
    if (response.statusCode !== 200) {
      const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
      // consume response data to free up memory
      response.resume();
      reject(error);
      return;
    }
    const file = createWriteStream(destinationPath);
    file.on("finish", () => {
      return fulfill();
    });
    file.on("error", (error) => {
      return reject(error);
    });
    response.pipe(file);
    totalBytes = parseInt(response.headers["content-length"]!, 10);
    if (progressCallback) {
      response.on("data", onData);
    }
  });
  request.on("error", (error) => {
    return reject(error);
  });
  return promise;

  function onData(chunk: string): void {
    downloadedBytes += chunk.length;
    progressCallback!(downloadedBytes, totalBytes);
  }
}

function httpRequest(url: string, method: string, response: (x: http.IncomingMessage) => void, keepAlive = true): http.ClientRequest {
  const urlParsed = URL.parse(url);

  type Options = Partial<URL.UrlWithStringQuery> & {
    method?: string;
    rejectUnauthorized?: boolean;
    headers?: http.OutgoingHttpHeaders | undefined;
  };

  const options: Options = {
    ...urlParsed,
    method,
    headers: keepAlive ? { Connection: "keep-alive" } : undefined
  };

  const requestCallback = (res: http.IncomingMessage): void => {
    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      httpRequest(res.headers.location, method, response);
    } else {
      response(res);
    }
  };
  const request = options.protocol === "https:" ? https.request(options, requestCallback) : http.request(options, requestCallback);
  request.end();
  return request;
}
