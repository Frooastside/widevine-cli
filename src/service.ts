import { Cookie } from "./cookie-parser.js";
import { LicenseInformation } from "./drm.js";
import { globalConfig } from "./index.js";
import { Logger } from "./io.js";
import { Language } from "./iso.js";

export abstract class Extractor {
  private _logger?: Logger;
  abstract initialize?(): Promise<void> | void;
  abstract release?(): Promise<void> | void;
  abstract checkResponsibility(url: string): boolean;
  abstract fetchMetadata(url: string): Promise<Metadata | null>;
  abstract get name(): string;
  abstract get version(): string;
  get logger(): Logger {
    if (!this._logger) {
      this._logger = new Logger(this.name, globalConfig);
    }
    return this._logger;
  }
  get ready(): boolean {
    return true;
  }
}

export abstract class Downloader {
  private _logger?: Logger;
  abstract initialize?(): Promise<void> | void;
  abstract release?(): Promise<void> | void;
  abstract checkResponsibility(url: string): boolean;
  abstract download(metadata: Metadata): Promise<Download | null>;
  abstract get name(): string;
  abstract get version(): string;
  get logger(): Logger {
    if (!this._logger) {
      this._logger = new Logger(this.name, globalConfig);
    }
    return this._logger;
  }
  get ready(): boolean {
    return true;
  }
}

export type DataType = "container" | "episode";
export type FileType = "media" | "subtitle";

export function isContainerDownload(download: Download): download is ContainerDownload {
  return download.type === "container";
}

export function isContainerMetadata(metadata: Metadata): metadata is ContainerMetadata {
  return metadata.type === "container";
}

export function isMediaDownload(downloadedFile: DownloadedFile): downloadedFile is DownloadedFile {
  return downloadedFile.type === "media";
}

export function isManifest(source: string | Source): source is Source {
  return typeof source === "object" && typeof source.url === "string";
}

export interface Format {
  id: string;
  bitrate?: number;
  width?: number;
  height?: number;
  sampleRate?: number;
}

export type Source = {
  url: string;
  cookies?: Cookie[];
  headers?: HeadersInit;
  cleanup?: () => void;
};

export type Metadata = ContainerMetadata | EpisodeMetadata;

interface MetadataBase {
  type: DataType;
  title?: string;
  source: string | Source;
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
  licenseInformation?: LicenseInformation;
  language?: Language;
  subtitles?: SubtitleMetadata[];
}

export type SubtitleMetadata = {
  source: Source;
  language?: Language;
};

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
  metadata: EpisodeMetadata;
  files: DownloadedFile[];
}

export type DownloadedFile = DownloadedMediaFile | DownloadedSubtitleFile;

interface DownloadedFileBase {
  type: FileType;
  path: string;
  streams: number;
  language?: Language;
}

export interface DownloadedMediaFile extends DownloadedFileBase {
  type: "media";
  encrypted: boolean;
  format: Format;
}

export interface DownloadedSubtitleFile extends DownloadedFileBase {
  type: "subtitle";
}

export interface Output {
  title: string;
  container: string | null;
  season: number | null;
  index: number | null;
  files: DownloadedFile[];
}
