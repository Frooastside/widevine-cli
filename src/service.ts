import { Protocol } from "puppeteer";
import { Cookie } from "./cookie-parser";
import { LicenseInformation } from "./drm";
import services from "./services";

export abstract class Service {
  abstract initialize(): Promise<void> | void;
  abstract free(): Promise<void> | void;
  abstract checkResponsibility(url: string): boolean;
  abstract fetchMetadata(url: string): Promise<Metadata | null>;
  abstract get name(): string;
  abstract get version(): string;
}

export class BackupMetadataProvider {}

export interface Metadata {
  type: MetadataType;
  source: Source;
  title?: string;
}

export interface ContainerMetadata extends Metadata {
  type: "container";
  contents?: EpisodeMetadata[];
}

export interface EpisodeMetadata extends Metadata {
  type: "episode";
  season?: number | null;
}

export type MetadataType = "container" | "episode";

export type Source = {
  url: string;
  manifest?: Manifest;
  licenseInformation: LicenseInformation;
};

export type Manifest = {
  url: string;
  cookies?: Cookie[];
  headers?: HeadersInit;
  cleanup?: () => void;
};