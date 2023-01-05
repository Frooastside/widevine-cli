import BinaryExecutor, { ExecutionArguments } from "./binaryExecutor.js";

const binaryExecutor = new BinaryExecutor("yt-dlp");

export interface DownloadMetadata {
  id: string;
  title: string;
  timestamp: number;
  formats: Format[];
  subtitles: unknown;
  webpage_url: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  extractor: string;
  extractor_key: string;
  playlist: any;
  playlist_index: any;
  display_id: string;
  fulltitle: string;
  upload_date: string;
  requested_subtitles: any;
  _has_drm: boolean;
  requested_downloads: RequestedDownload[];
  requested_formats: RequestedFormat2[];
  format: string;
  format_id: string;
  ext: string;
  protocol: string;
  language: any;
  format_note: string;
  filesize_approx: any;
  tbr: number;
  width: number;
  height: number;
  resolution: string;
  fps: any;
  dynamic_range: string;
  vcodec: string;
  vbr: number;
  stretched_ratio: any;
  aspect_ratio: number;
  acodec: string;
  abr: number;
  asr: number;
  audio_channels: any;
  epoch: number;
  _type: string;
  _version: Version;
}

export interface Format {
  format_id: string;
  manifest_url: string;
  ext: string;
  width?: number;
  height?: number;
  tbr: number;
  asr?: number;
  fps: any;
  language: any;
  format_note: string;
  filesize: any;
  container: string;
  vcodec: string;
  acodec: string;
  dynamic_range?: string;
  has_drm: boolean;
  url: string;
  fragment_base_url: string;
  fragments: Fragment[];
  protocol: string;
  manifest_stream_number: number;
  audio_ext: string;
  video_ext: string;
  abr?: number;
  format: string;
  resolution: string;
  aspect_ratio?: number;
  http_headers: HttpHeaders;
  vbr?: number;
}

export interface Fragment {
  url: string;
  duration?: number;
}

export interface HttpHeaders {
  "User-Agent": string;
  Accept: string;
  "Accept-Language": string;
  "Sec-Fetch-Mode": string;
  Cookie: string;
}

export interface RequestedDownload {
  requested_formats: RequestedFormat[];
  format: string;
  format_id: string;
  ext: string;
  protocol: string;
  format_note: string;
  tbr: number;
  width: number;
  height: number;
  resolution: string;
  dynamic_range: string;
  vcodec: string;
  vbr: number;
  aspect_ratio: number;
  acodec: string;
  abr: number;
  asr: number;
  epoch: number;
  _filename: string;
  __write_download_archive: boolean;
}

export interface RequestedFormat {
  format_id: string;
  manifest_url: string;
  ext: string;
  width?: number;
  height?: number;
  tbr: number;
  asr?: number;
  fps: any;
  language: any;
  format_note: string;
  filesize: any;
  container: string;
  vcodec: string;
  acodec: string;
  dynamic_range?: string;
  has_drm: boolean;
  url: string;
  fragment_base_url: string;
  fragments: Fragment[];
  protocol: string;
  manifest_stream_number: number;
  video_ext: string;
  audio_ext: string;
  vbr?: number;
  format: string;
  resolution: string;
  aspect_ratio?: number;
  http_headers: HttpHeaders;
  abr?: number;
}

export interface RequestedFormat2 {
  format_id: string;
  manifest_url: string;
  ext: string;
  width?: number;
  height?: number;
  tbr: number;
  asr?: number;
  fps: any;
  language: any;
  format_note: string;
  filesize: any;
  container: string;
  vcodec: string;
  acodec: string;
  dynamic_range?: string;
  has_drm: boolean;
  url: string;
  fragment_base_url: string;
  fragments: Fragment[];
  protocol: string;
  manifest_stream_number: number;
  video_ext: string;
  audio_ext: string;
  vbr?: number;
  format: string;
  resolution: string;
  aspect_ratio?: number;
  http_headers: HttpHeaders;
  abr?: number;
}

export interface Version {
  version: string;
  current_git_head: any;
  release_git_head: string;
  repository: string;
}

export async function fetchMetadata(url: string): Promise<DownloadMetadata> {
  const args: ExecutionArguments = ["-J", "--allow-unplayable-formats", url];
  const stdout = await binaryExecutor.execute(args);
  return JSON.parse(stdout);
}
