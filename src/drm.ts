import cookie from "cookie";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { existsSync, readFileSync, rm as rawRm } from "fs";
import fetch from "node-fetch";
import { ContentDecryptionModule, KeyContainer, Session } from "node-widevine";
import { promisify } from "util";
import BinaryExecutor, { ExecutionArguments } from "./binaryExecutor.js";
import { Cookie } from "./cookie-parser";
import { Config } from "./index.js";
import { Logger } from "./io.js";
import { DownloadedFile } from "./service.js";

const rm = promisify(rawRm);

const binaryExecutor = new BinaryExecutor("shaka-packager");

export type LicenseInformation = {
  url: string;
  cookies?: Cookie[];
  headers?: HeadersInit;
  psshData?: Record<string, Buffer>;
};

export type LicenseRequest = {
  url: string;
  cookies?: Cookie[];
  headers?: HeadersInit;
  pssh?: Buffer;
};

export type DefaultManifestFile = {
  xml?: {
    "@version": string;
    "@encoding": string;
  } & Record<string, string | object>;
  MPD: DefaultManifest;
};

export type DefaultManifest = {
  Period: Period | Period[];
} & Record<string, string | object>;

export type Period = {
  AdaptationSet: AdaptationSet | AdaptationSet[];
} & Record<string, string | object>;

export type AdaptationSet = {
  "@id"?: string;
  "@contentType"?: string;
  "@mimeType"?: string;
  "@codecs"?: string;
  "@maxWidth"?: string;
  "@maxHeight"?: string;
  ContentProtection?: ContentProtection | ContentProtection[];
  Representation: Representation;
} & Record<string, string | object>;

export type ContentProtection = Record<string, string | object>;

export type Representation = {
  "@id": string;
  "@width"?: string;
  "@height"?: string;
  "@bandwidth"?: string;
} & Record<string, string | object>;

export default class DrmSolver {
  private _useLocal: boolean;
  private _localContentDecryptionModule: ContentDecryptionModule | null;

  constructor(config: Config) {
    this._useLocal =
      ((existsSync("security/device_private_key") && existsSync("security/device_client_id_blob")) || !!config.forceLocalDrm) &&
      !config.forceRemoteDrm;

    if (this._useLocal) {
      try {
        this._localContentDecryptionModule = {
          privateKey: readFileSync("security/device_private_key"),
          identifierBlob: readFileSync("security/device_client_id_blob")
        };
      } catch (error) {
        throw new Error(
          config.forceLocalDrm
            ? "Local DRM was forced but the files couldn't be read."
            : "The necessary files exist but there was a problem reading it."
        );
      }
    } else {
      this._localContentDecryptionModule = null;
    }
  }

  async solveDrm(licenseRequestInformation: LicenseRequest, logger: Logger): Promise<KeyContainer[]> {
    const cookieHeader = licenseRequestInformation.cookies
      ? licenseRequestInformation.cookies.map((cookieObject) => cookie.serialize(cookieObject.name, cookieObject.value)).join("; ")
      : undefined;
    const headers: HeadersInit | undefined = cookieHeader
      ? {
          ...licenseRequestInformation.headers,
          cookie: cookieHeader
        }
      : licenseRequestInformation.headers;

    if (licenseRequestInformation.pssh === undefined) {
      throw new Error("PSSH is missing!");
    }

    if (this._localContentDecryptionModule) {
      logger.debug("DRM Solver", "trying local cdm first");
      try {
        return await this._solveLocalDrm(licenseRequestInformation.url, licenseRequestInformation.pssh, logger, headers);
      } catch (error) {
        logger.debug("DRM Solver", "local cdm failed, try remote", error);
        return await this._solveRemoteDrm(licenseRequestInformation.url, licenseRequestInformation.pssh, logger, headers);
      }
    } else {
      logger.debug("DRM Solver", "skipping local cdm");
      return await this._solveRemoteDrm(licenseRequestInformation.url, licenseRequestInformation.pssh, logger, headers);
    }
  }

  private async _solveLocalDrm(url: string, pssh: Buffer, logger: Logger, headers?: HeadersInit): Promise<KeyContainer[]> {
    if (!this._localContentDecryptionModule) {
      throw new Error("local cdm was disabled but you want to use it anyway");
    }
    const session = new Session(this._localContentDecryptionModule, pssh);
    const licenseRequest = session.createLicenseRequest();
    const response = await fetch(url, {
      method: "POST",
      body: licenseRequest,
      headers: headers
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return session.parseLicense(Buffer.from(await response.arrayBuffer())).filter((key) => key.kid !== "1");
  }

  private async _solveRemoteDrm(url: string, pssh: Buffer, logger: Logger, headers?: HeadersInit): Promise<KeyContainer[]> {
    const response = await fetch("https://cdrm-project.com/api", {
      method: "POST",
      body: JSON.stringify({
        license: url,
        pssh: pssh.toString("base64"),
        cache: true
      }),
      headers: headers
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseText = (await response.json()) as any;
    logger.jsonDump("DEBUG", "DRM Solver", responseText);
    return responseText.keys
      .map((keyContainer: { key: string }) => keyContainer.key.split(":"))
      .map((keyContainer: [string, string]) => ({ kid: keyContainer[0], key: keyContainer[1] }));
  }

  async decrpytFile(file: DownloadedFile, keys: KeyContainer[]) {
    const args: ExecutionArguments = [
      "--enable_raw_key_decryption",
      ["--keys", keys.map((key, index) => `label=key_${index}:key_id=${key.kid}:key=${key.key}`).join(",")],
      `in=${file.path},out=_${file.path},stream=${0}`
    ];
    await binaryExecutor.execute(args);
    await rm(file.path);
    file.encrypted = false;
    file.path = `_${file.path}`;
  }
}

export async function extractPsshData(logger: Logger, rawManifest: string): Promise<Record<string, Buffer>> {
  const validation = XMLValidator.validate(rawManifest);
  if (validation !== true) {
    throw new Error(validation.err.msg);
  }
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@",
    allowBooleanAttributes: true
  });
  const manifest = parser.parse(rawManifest, {});
  let psshs: Record<string, Buffer> = {};
  try {
    psshs = _extractPsshDictionaryDefaultMPD(<DefaultManifestFile>manifest) ?? psshs;
  } catch (error) {
    logger.debug("DRM Solver", "default pssh extractor failed", error, (<Error>error)?.stack);
  }
  return psshs;
}

function _extractPsshDictionaryDefaultMPD(manifest: DefaultManifestFile): Record<string, Buffer> | undefined {
  const psshs: Record<string, Buffer> = {};
  if (!manifest || !manifest.MPD || !manifest.MPD.Period) {
    return;
  }
  for (const period of _handleObject(manifest.MPD.Period)) {
    for (const adaptionSet of _handleObject(period.AdaptationSet)) {
      if (!adaptionSet.ContentProtection) {
        continue;
      }
      const contentProtection = _handleObject(adaptionSet.ContentProtection).find((contentProtection) => !!contentProtection["cenc:pssh"]);
      if (!contentProtection) {
        continue;
      }
      const pssh = contentProtection["cenc:pssh"];
      if (!pssh || typeof pssh !== "string") {
        continue;
      }
      for (const representation of _handleObject(adaptionSet.Representation)) {
        psshs[representation["@id"]] = Buffer.from(pssh, "base64");
      }
    }
  }
  return psshs;
}

function _handleObject<T>(objectContainer: T | T[]): T[] {
  if (Array.isArray(objectContainer)) {
    return objectContainer;
  } else {
    return [objectContainer];
  }
}
