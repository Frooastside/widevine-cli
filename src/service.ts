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
  abstract download(url: string): Promise<Download | null>;
  abstract get name(): string;
  abstract get version(): string;
  get ready(): boolean {
    return true;
  }
}

function isContainerDownload(download: Download): download is ContainerDownload {
  return download.type === "container";
}

function isContainerMetadata(metadata: Metadata): metadata is ContainerMetadata {
  return metadata.type === "container";
}

export interface Download {
  type: DataType;
  title?: string;
}

export interface ContainerDownload extends Download {
  type: "container";
  contents?: EpisodeDownload[];
}

export interface EpisodeDownload extends Download {
  type: "episode";
  season?: number | null;
  files: DownloadedFile[];
}

export interface DownloadedFile {
  path: string;
  encrypted: boolean;
  format: Format;
}

export interface Format {
  id: string;
  type: FormatType;
  bitrate?: number;
}

export interface VideoFormat extends Format {
  type: "video";
  width?: number;
  height?: number;
}

export interface AudioFormat extends Format {
  type: "audio";
  sampleRate: number;
}

export interface SubtitleFormat extends Format {
  type: "subtitle";
}

export type FormatType = "video" | "audio" | "subtitle";

export interface Metadata {
  type: DataType;
  title?: string;
  source: Source;
}

export interface ContainerMetadata extends Metadata {
  type: "container";
  contents?: EpisodeMetadata[];
}

export interface EpisodeMetadata extends Metadata {
  type: "episode";
  season?: number | null;
}

export type DataType = "container" | "episode";

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
