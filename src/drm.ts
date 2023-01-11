import cookie from "cookie";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Session } from "node-widevine";
import { CDM, Key } from "node-widevine/dist/license";
import { Cookie } from "./cookie-parser";
import { Config } from "./index.js";
import { Logger } from "./io";

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
  private _config: Config;
  private _logger: Logger;
  private _useLocal: boolean;
  private _local?: CDM;

  constructor(config: Config, logger: Logger) {
    this._config = config;
    this._logger = logger;

    this._useLocal =
      ((existsSync("security/device_private_key") && existsSync("security/device_client_id_blob")) || !!config.forceLocalDrm) &&
      !config.forceRemoteDrm;

    if (this._useLocal) {
      try {
        this._local = {
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
    }
  }

  async solveDrm(licenseInformation: LicenseRequest): Promise<Key[]> {
    if (this._local === undefined) {
      throw new Error("DRM is not initialized");
    }
    const cookieHeader = licenseInformation.cookies
      ? licenseInformation.cookies.map((cookieObject) => cookie.serialize(cookieObject.name, cookieObject.value)).join("; ")
      : undefined;
    const headers: HeadersInit | undefined = cookieHeader
      ? {
          ...licenseInformation.headers,
          cookie: cookieHeader
        }
      : licenseInformation.headers;

    if (licenseInformation.pssh === undefined) {
      throw new Error("PSSH is missing!");
    }

    if (this._local) {
      try {
        return await this._solveLocalDrm(licenseInformation.url, licenseInformation.pssh, headers);
      } catch (error) {
        return await this._solveRemoteDRM(licenseInformation.url, licenseInformation.pssh, headers);
      }
    } else {
      return await this._solveRemoteDRM(licenseInformation.url, licenseInformation.pssh, headers);
    }
  }

  private async _solveLocalDrm(url: string, pssh: Buffer, headers?: HeadersInit): Promise<Key[]> {
    if (!this._local) {
      throw new Error("local cdm was disabled but you want to use it anyway");
    }
    const session = new Session(this._local, pssh);
    const licenseRequest = session.createLicenseRequest();
    const response = await fetch(url, {
      method: "POST",
      body: licenseRequest,
      headers: headers
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return session.parseLicense(Buffer.from(await response.arrayBuffer()));
  }

  private async _solveRemoteDRM(url: string, pssh: Buffer, headers?: HeadersInit): Promise<Key[]> {
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
    const responseText = await response.json();
    return responseText.keys
      .map((keyContainer: { key: string }) => keyContainer.key.split(":"))
      .map((keyContainer: [string, string]) => ({ kid: keyContainer[0], key: keyContainer[1] }));
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
  writeFileSync("security/manifest.json", JSON.stringify(manifest, null, 2));
  let psshs: Record<string, Buffer> = {};
  try {
    psshs = _extractPsshDictionaryDefaultMPD(<DefaultManifestFile>manifest) ?? psshs;
  } catch (error) {
    logger.debug("DRM Solver", "default pssh extractor failed", error);
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
