import { Protocol } from "puppeteer";

export type Manifest = {
  url: string;
  cookies?: Protocol.Network.CookieParam;
  headers?: HeadersInit;
};

export type LicenseInformation = {
  url: string;
  cookies?: Protocol.Network.CookieParam;
  headers?: HeadersInit;
  pssh?: Buffer;
};

export abstract class ManifestService {
  private _manifest: Manifest;

  constructor(manifest: Manifest) {
    this._manifest = manifest;
  }
}

export abstract class ManifestDRMService extends ManifestService {
  private _licenseInformation: LicenseInformation;

  constructor(manifest: Manifest, licenseInformation: LicenseInformation) {
    super(manifest);
    this._licenseInformation = licenseInformation;
  }
}
