import { Cookie } from "./cookie-parser";
import { LicenseInformation } from "./drm";

export abstract class Extractor {
  abstract initialize?(): Promise<void> | void;
  abstract release?(): Promise<void> | void;
  abstract checkResponsibility(url: string): boolean;
  abstract fetchMetadata(url: string): Promise<Metadata | null>;
  abstract get name(): string;
  abstract get version(): string;
  get ready(): boolean {
    return true;
  }
}

export abstract class Downloader {
  abstract initialize?(): Promise<void> | void;
  abstract release?(): Promise<void> | void;
  abstract checkResponsibility(url: string): boolean;
  abstract download(metadata: Metadata): Promise<Download | null>;
  abstract get name(): string;
  abstract get version(): string;
  get ready(): boolean {
    return true;
  }
}

export abstract class PostProcessor {
  abstract process(download: Output | Output[]): Promise<void>;
  abstract get name(): string;
  abstract get version(): string;
}

export function isContainerDownload(download: Download): download is ContainerDownload {
  return download.type === "container";
}

export function isContainerMetadata(metadata: Metadata): metadata is ContainerMetadata {
  return metadata.type === "container";
}

export interface Output {
  title: string;
  container: string | null;
  season: number | null;
  index: number | null;
  files: string[];
}

export type Download = ContainerDownload | EpisodeDownload;

interface DownloadBase {
  type: DataType;
  metadata: Metadata;
}

export interface ContainerDownload extends DownloadBase {
  type: "container";
  contents?: EpisodeDownload[];
  metadata: ContainerMetadata;
}

export interface EpisodeDownload extends DownloadBase {
  type: "episode";
  files: DownloadedFile[];
  metadata: EpisodeMetadata;
}

export interface DownloadedFile {
  path: string;
  encrypted: boolean;
  format: Format;
}

export interface Format {
  id: string;
  bitrate?: number;
  width?: number;
  height?: number;
  sampleRate?: number;
}

export type Metadata = ContainerMetadata | EpisodeMetadata;

interface MetadataBase {
  type: DataType;
  title?: string;
  source: Source;
}

export interface ContainerMetadata extends MetadataBase {
  type: "container";
  contents?: EpisodeMetadata[];
}

export interface EpisodeMetadata extends MetadataBase {
  type: "episode";
  container?: string | null;
  season?: number | null;
  index?: number | null;
}

export type DataType = "container" | "episode";

export type Source = {
  url: string;
  manifest?: Manifest;
  licenseInformation?: LicenseInformation;
};

export type Manifest = {
  url: string;
  cookies?: Cookie[];
  headers?: HeadersInit;
  cleanup?: () => void;
};
