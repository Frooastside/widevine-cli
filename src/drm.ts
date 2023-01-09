import cookie from "cookie";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Session } from "node-widevine";
import { CDM, Key } from "node-widevine/dist/license";
import { exit } from "process";
import { Cookie } from "./cookie-parser";
import { configuration } from "./index.js";
import { logger } from "./io.js";

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

const useLocal =
  ((existsSync("security/device_private_key") && existsSync("security/device_client_id_blob")) || configuration.forceLocalDrm) &&
  !configuration.forceRemoteDrm;

let localCDM: CDM;

if (useLocal) {
  try {
    localCDM = {
      privateKey: readFileSync("security/device_private_key"),
      identifierBlob: readFileSync("security/device_client_id_blob")
    };
  } catch (error) {
    logger.error(
      "DRM Solver",
      configuration.forceLocalDrm
        ? "Local DRM was forced but the files couldn't be read."
        : "The necessary files exist but there was a problem reading it.",
      "security/device_private_key",
      "security/device_client_id_blob"
    );
    exit(1);
  }
}

export async function solveDRM(licenseInformation: LicenseRequest): Promise<Key[]> {
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

  if (localCDM) {
    try {
      return await _solveLocalDRM(licenseInformation.url, licenseInformation.pssh, headers);
    } catch (error) {
      return await _solveRemoteDRM(licenseInformation.url, licenseInformation.pssh, headers);
    }
  } else {
    return await _solveRemoteDRM(licenseInformation.url, licenseInformation.pssh, headers);
  }
}

async function _solveLocalDRM(url: string, pssh: Buffer, headers?: HeadersInit): Promise<Key[]> {
  const session = new Session(localCDM, pssh);
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

async function _solveRemoteDRM(url: string, pssh: Buffer, headers?: HeadersInit): Promise<Key[]> {
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

export async function extractPsshData(rawManifest: string): Promise<Record<string, Buffer>> {
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
    psshs = extractPsshDictionaryDefaultMPD(<DefaultManifestFile>manifest) ?? psshs;
  } catch (error) {
    logger.debug("DRM Solver", "default pssh extractor failed", error);
  }
  return psshs;
}

function extractPsshDictionaryDefaultMPD(manifest: DefaultManifestFile): Record<string, Buffer> | undefined {
  const psshs: Record<string, Buffer> = {};
  if (!manifest || !manifest.MPD || !manifest.MPD.Period) {
    return;
  }
  for (const period of handleObject(manifest.MPD.Period)) {
    for (const adaptionSet of handleObject(period.AdaptationSet)) {
      if (!adaptionSet.ContentProtection) {
        continue;
      }
      const contentProtection = handleObject(adaptionSet.ContentProtection).find((contentProtection) => !!contentProtection["cenc:pssh"]);
      if (!contentProtection) {
        continue;
      }
      const pssh = contentProtection["cenc:pssh"];
      if (!pssh || typeof pssh !== "string") {
        continue;
      }
      for (const representation of handleObject(adaptionSet.Representation)) {
        psshs[representation["@id"]] = Buffer.from(pssh, "base64");
      }
    }
  }
  return psshs;
}

function handleObject<T>(objectContainer: T | T[]): T[] {
  if (Array.isArray(objectContainer)) {
    return objectContainer;
  } else {
    return [objectContainer];
  }
}

`
{
  "?xml": "",
  "MPD": {
    "Period": {
      "AdaptationSet": [
        {
          "ContentProtection": [
            "",
            {
              "mspr:pro": "WAMAAAEAAQBOAzwAVwBSAE0ASABFAEEARABFAFIAIAB4AG0AbABuAHMAPQAiAGgAdAB0AHAAOgAvAC8AcwBjAGgAZQBtAGEAcwAuAG0AaQBjAHIAbwBzAG8AZgB0AC4AYwBvAG0ALwBEAFIATQAvADIAMAAwADcALwAwADMALwBQAGwAYQB5AFIAZQBhAGQAeQBIAGUAYQBkAGUAcgAiACAAdgBlAHIAcwBpAG8AbgA9ACIANAAuADAALgAwAC4AMAAiAD4APABEAEEAVABBAD4APABQAFIATwBUAEUAQwBUAEkATgBGAE8APgA8AEsARQBZAEwARQBOAD4AMQA2ADwALwBLAEUAWQBMAEUATgA+ADwAQQBMAEcASQBEAD4AQQBFAFMAQwBUAFIAPAAvAEEATABHAEkARAA+ADwALwBQAFIATwBUAEUAQwBUAEkATgBGAE8APgA8AEsASQBEAD4AdQBMADgAYgBNAEQASQBlAFYAMABLAFoASwBlAGwAYQB1ADAATABTAFkAUQA9AD0APAAvAEsASQBEAD4APABDAEgARQBDAEsAUwBVAE0APgBxAFoAZABQAGgAYgBiAFIAeABmADQAPQA8AC8AQwBIAEUAQwBLAFMAVQBNAD4APABMAEEAXwBVAFIATAA+AGgAdAB0AHAAcwA6AC8ALwB3AGEAawBhAHQAZQBzAHQALgBrAGUAeQBkAGUAbABpAHYAZQByAHkALgBuAG8AcgB0AGgAZQB1AHIAbwBwAGUALgBtAGUAZABpAGEALgBhAHoAdQByAGUALgBuAGUAdAAvAFAAbABhAHkAUgBlAGEAZAB5AC8APAAvAEwAQQBfAFUAUgBMAD4APABDAFUAUwBUAE8ATQBBAFQAVABSAEkAQgBVAFQARQBTAD4APABJAEkAUwBfAEQAUgBNAF8AVgBFAFIAUwBJAE8ATgA+ADgALgAxAC4AMgAyADEAMAAuADIAMgAwADIAPAAvAEkASQBTAF8ARABSAE0AXwBWAEUAUgBTAEkATwBOAD4APAAvAEMAVQBTAFQATwBNAEEAVABUAFIASQBCAFUAVABFAFMAPgA8AC8ARABBAFQAQQA+ADwALwBXAFIATQBIAEUAQQBEAEUAUgA+AA=="
            },
            {
              "cenc:pssh": "AAAAMnBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAABISEDAbv7geMkJXmSnpWrtC0mE=",
              "ms:laurl": ""
            }
          ],
`;

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
