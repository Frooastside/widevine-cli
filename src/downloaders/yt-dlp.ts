import chalk from "chalk";
import ProgressBar from "progress";
import { v4 as uuidv4 } from "uuid";
import BinaryExecutor, { ExecutionArguments } from "../binaryExecutor.js";
import { Config } from "../index.js";
import { Logger } from "../io.js";
import {
  ContainerDownload,
  Download,
  DownloadedFile,
  Downloader,
  EpisodeDownload,
  EpisodeMetadata,
  isContainerMetadata,
  Metadata
} from "../service.js";

const binaryExecutor = new BinaryExecutor("yt-dlp");

export default class YT_DLP_Downloader extends Downloader {
  private _config: Config;
  private _logger: Logger;

  constructor(config: Config, logger: Logger) {
    super();
    this._config = config;
    this._logger = logger;
  }

  initialize = undefined;
  release = undefined;

  checkResponsibility(): boolean {
    return true;
  }

  async download(metadata: Metadata): Promise<Download> {
    const isContainer = isContainerMetadata(metadata);
    if (isContainer) {
      if (!metadata.contents) {
        throw new Error("No downloadable episodes found.");
      }
      const episodes: EpisodeDownload[] = [];
      for (const episodeMetadata of metadata.contents) {
        episodes.push(await this._downloadEpisode(episodeMetadata));
      }
      const containerDownload: ContainerDownload = {
        contents: episodes,
        type: "container",
        metadata: metadata
      };
      if (metadata.source.manifest?.cleanup) {
        metadata.source.manifest?.cleanup();
      }
      return containerDownload;
    } else {
      const episode = await this._downloadEpisode(metadata);
      if (metadata.source.manifest?.cleanup) {
        metadata.source.manifest?.cleanup();
      }
      return episode;
    }
  }

  private async _downloadEpisode(metadata: EpisodeMetadata): Promise<EpisodeDownload> {
    const fileId = uuidv4();
    const manifest = metadata.source.manifest;
    const fetchedDownloadMetadata = await fetchDownloadMetadata(!!manifest ? manifest.url : metadata.source.url, fileId);
    if (!fetchedDownloadMetadata) {
      throw new Error("an error occurred while fetching the metadata");
    }
    const isPlaylist = isPlaylistMetadata(fetchedDownloadMetadata);
    if (isPlaylist) {
      throw new Error("Episodes can't be playlists at the same time");
    }

    this._logger.information(this.name, `Start downloading "${metadata.title ? metadata.title : metadata.source.url}"`);

    const files: DownloadedFile[] = [];
    for (const format of fetchedDownloadMetadata.requested_formats) {
      files.push(await this._downloadFormat(format, fileId));
    }

    const download: EpisodeDownload = {
      files: files,
      type: "episode",
      metadata: metadata
    };
    return download;
  }

  private async _downloadFormat(format: Format, fileId: string): Promise<DownloadedFile> {
    const args: ExecutionArguments = [
      "--quiet",
      "--allow-unplayable-formats",
      "--newline",
      "--progress",
      ["--concurrent-fragments", `${typeof this._config.concurrentFragments === "boolean" ? 1 : this._config.concurrentFragments}`],
      ["--format", format.format_id],
      ["--output-na-placeholder", "0"],
      ["--progress-template", "\"download:[download_info];%(progress.downloaded_bytes)s;%(progress.total_bytes)s\""],
      ["--output", `"${fileId}.%(format_id)s.%(ext)s"`],
      `${format.manifest_url ?? format.url}`
    ];
    const progressBar: ProgressBar = this._createProgressBar(format);
    const child = await binaryExecutor.spawn(args);
    let errorOutput = "\n";
    child.stderr?.on("data", (data) => (errorOutput = errorOutput + data));
    child.stdout?.on("data", (data) => {
      let regex: RegExpExecArray | null;
      if (!!(regex = /\[download_info\]\;([\-0-9]*)\;([\-0-9]*)/gi.exec(data))) {
        //https://regex101.com/r/fnfL5y/2
        const downloadedBytes = Number(regex[1]);
        let totalBytes = Number(regex[2]);
        totalBytes = !!totalBytes ? totalBytes : downloadedBytes + 1;
        if (progressBar.total !== totalBytes) {
          progressBar.total = totalBytes;
        }
        if (!progressBar.complete) {
          progressBar.tick(downloadedBytes - progressBar.curr, {
            progress: Number(downloadedBytes / 1000000).toFixed(2),
            size: Number(totalBytes / 1000000).toFixed(2)
          });
        }
      }
    });
    await new Promise<void>((resolve, reject) => {
      child.on("exit", (exitCode) => {
        if (exitCode === 0) {
          resolve();
        } else {
          this._logger.error(this.name, errorOutput);
          reject();
        }
      });
    });
    const file: DownloadedFile = {
      encrypted: !!format.has_drm,
      format: {
        id: format.format_id,
        bitrate: format.tbr ?? format.vbr ?? format.abr,
        sampleRate: format.asr || undefined,
        width: format.width || undefined,
        height: format.height || undefined
      },
      path: `${fileId}.${format.format_id}.${format.ext}`
    };
    return file;
  }

  private _createProgressBar(format: Format) {
    return new ProgressBar(
      this._logger.format(
        this.name,
        "INFO",
        false,
        `Downloading "${format.format_id}.${format.ext}" :elapseds [:bar] ${chalk.blue(":percent")} :progress/:sizeMiB ETA: ${chalk.yellow(":etas")}`
      ),
      {
        total: 0,
        width: 30,
        complete: "#",
        incomplete: " "
      }
    );
  }

  get name(): string {
    return "yt-dlp";
  }

  get version(): string {
    return "0.0.1";
  }
}

export async function fetchDownloadMetadata(url: string, fileId: string): Promise<DownloadMetadata | null> {
  const args: ExecutionArguments = [
    "--quiet",
    "--allow-unplayable-formats",
    "--dump-single-json",
    ["--output", `"${fileId}.%(format_id)s.%(ext)s"`],
    `${url}`
  ];
  const stdout = await binaryExecutor.execute(args);
  return JSON.parse(stdout);
}

export function isPlaylistMetadata(metadata: DownloadMetadata): metadata is PlaylistMetadata {
  return (
    !!metadata &&
    (metadata._type === "playlist" ||
      (!!(metadata as PlaylistMetadata).entries && metadata._type !== "video" && metadata._type !== "audio" && metadata._type !== "text"))
  );
}

export type DownloadMetadata = PlaylistMetadata | SourceMetadata;

export interface MetadataBase {
  _version: Version;
  _type: StreamType;
  id: string;
  title: string;
  epoch: number;
  extractor: string;
  extractor_key: string;

  webpage_url: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  thumbnail?: string;
  thumbnails?: Thumbnail[];

  availability?: YoutubeAvailability;
  description?: string;
  tags?: string[];
  view_count?: number;
  playlist_count?: number;
  uploader?: string;
  uploader_id?: string;
  uploader_url?: string;
  channel?: string;
  channel_id?: string;
  channel_url?: string;
  channel_follower_count?: number | null;
}

export interface PlaylistMetadata extends MetadataBase {
  __files_to_move?: unknown | null;
  entries: (SourceMetadata | null)[];
  modified_date?: string | number | null;
}

export interface SourceMetadata extends MetadataBase {
  _format_sort_fields?: string[];
  _has_drm: boolean | null;
  __last_playlist_index?: number;
  timestamp: number | null;
  duration?: number;
  duration_string?: string;
  upload_date?: string;
  release_timestamp?: number | null;
  release_date?: string | null;
  release_year?: number | null;

  format: string;
  format_id: string;
  format_note: string | null;
  formats: Format[];
  subtitles: Record<LanguageCodes, Subtitle>;
  automatic_captions?: Record<LanguageCodes, Subtitle>;
  requested_downloads: RequestedDownload[];
  requested_formats: Format[];
  requested_subtitles: unknown | null;

  width: number;
  height: number;
  fps: number | null;
  dynamic_range: DynamicRange;
  resolution: string;
  stretched_ratio: unknown | null;
  aspect_ratio: number;
  vcodec: string | null;
  acodec: string | null;
  audio_channels: number | null;
  tbr: number;
  vbr: number;
  abr: number | null;
  asr: number | null;
  ext: FileEXT;
  protocol: string;

  playlist: string | null;
  playlist_index: number | null;
  playlist_id?: string;
  playlist_title?: string;
  playlist_uploader?: string;
  playlist_uploader_id?: string;
  playlist_autonumber?: number;

  series?: string;
  series_id?: string;
  season?: string;
  season_id?: string;
  season_number?: number;
  episode?: string;
  episode_number?: number;
  format_index?: null;
  url?: string;
  manifest_url?: string;

  display_id: string;
  fulltitle: string;
  language: LanguageCodes | LanguageNames | null;
  filesize_approx: number | null;
  http_headers?: HttpHeaders | null;

  is_live?: boolean;
  was_live?: boolean;
  live_status?: LiveStatus;

  album?: string;
  artist?: string;
  track?: string;
  creator?: string;
  alt_title?: string;
  location?: string;
  categories?: YoutubeCategory[];

  like_count?: number;
  average_rating?: number | null;
  age_limit?: number;
  comment_count?: number | null;
  chapters?: Chapter[] | number | null;
  n_entries?: number;
  playable_in_embed?: boolean;
}

export interface Version {
  version: string;
  current_git_head: string | null;
  release_git_head: string;
  repository: string;
}

export interface Thumbnail {
  url: string;
  preference?: number;
  id: string;
  height?: number;
  width?: number;
  resolution?: string;
}

export interface Chapter {
  start_time: number;
  title: string;
  end_time: number;
}

export interface Format {
  _download_params?: FormatDownloadParams;
  format_id: string;
  manifest_url?: string;
  ext: FileEXT;
  audio_ext: AudioEXT;
  video_ext: VideoEXT;
  width?: number | null;
  height?: number | null;
  tbr?: number;
  asr?: number | null;
  fps?: number | null;
  language?: LanguageCodes | LanguageNames | null;
  format_note?: string;
  filesize?: number | null;
  container?: string;
  vcodec?: string;
  acodec?: string;
  dynamic_range?: DynamicRange | null;
  has_drm?: boolean;
  url: string;
  fragment_base_url?: string;
  fragments?: Fragment[];
  protocol: string;
  manifest_stream_number?: number;
  abr?: number;
  format: string;
  resolution: string;
  aspect_ratio: number | null;
  http_headers: HttpHeaders;
  vbr?: number;
  format_index?: number | null;
  preference?: number | null;
  quality?: number | null;

  rows?: number;
  columns?: number;
  source_preference?: number;
  audio_channels?: number | null;
  language_preference?: number;
  downloader_options?: DownloaderOptions;
  filesize_approx?: number;
}

export interface FormatDownloadParams {
  stream_type: StreamType;
  duration: number;
  timescale: number;
  width: number;
  height: number;
  fourcc: string;
  language: LanguageCodes;
  codec_private_data: string;
  sampling_rate: number | null;
  channels: number;
  bits_per_sample: number;
  nal_unit_length_field: number;
}

export interface DownloaderOptions {
  http_chunk_size: number;
}

export interface Fragment {
  url?: string;
  duration?: number;
  path?: string;
}

export interface RequestedDownload {
  _filename: string;
  __write_download_archive: boolean;
  format: string;
  format_id: string;
  ext: FileEXT;
  protocol: string;
  format_note?: string;
  tbr: number;
  width: number;
  height: number;
  resolution: string;
  dynamic_range: DynamicRange;
  vcodec?: string;
  vbr: number;
  aspect_ratio: number;
  acodec?: string;
  abr?: number;
  asr?: number;
  epoch: number;
  requested_formats?: Format[];
  language?: string;
  fps?: number;
}

export interface Subtitle {
  ext: SubtitleEXT;
  manifest_url?: string;
  filesize?: number | null;
  url: string;
  fragment_base_url?: string;
  fragments?: SubtitleFragment[];
  protocol: string;
  name?: LanguageNames;
  _download_params?: SubtitleDownloadParameters;
}

export interface SubtitleDownloadParameters {
  stream_type: string;
  duration: number;
  timescale: number;
  fourcc: string;
  language: LanguageCodes | LanguageNames;
  codec_private_data: unknown | null;
}

export interface SubtitleFragment {
  url?: string;
  path?: string;
  duration?: number;
}

export type HttpHeaders = {
  "User-Agent": string;
  Accept: string;
  "Accept-Language": string;
  "Sec-Fetch-Mode": string;
  Cookie: string;
} & Record<string, string>;

export type StreamType = "playlist" | "audio" | "video" | "text" | string;
export type DynamicRange = "SDR" | "HDR" | string;

export type LiveStatus = "live" | "not_live" | string;
export type YoutubeAvailability = "public" | "needs_auth" | "unlisted" | "private" | string;
export type YoutubeCategory = "Music" | "People & Blogs" | "Entertainment" | "Gaming" | "Pets & Animals" | string;

export type FileEXT = VideoEXT | AudioEXT | SubtitleEXT | string;

export type VideoEXT =
  | "none"
  | "ismv"
  | "webm"
  | "mkv"
  | "flv"
  | "vob"
  | "ogv,"
  | "ogg"
  | "drc"
  | "gif"
  | "gifv"
  | "mng"
  | "avi"
  | "MTS,"
  | "M2TS,"
  | "TS"
  | "mov,"
  | "qt"
  | "wmv"
  | "yuv"
  | "rm"
  | "rmvb"
  | "viv"
  | "asf"
  | "amv"
  | "mp4,"
  | "m4p"
  | "m4v"
  | "mpg,"
  | "mp2,"
  | "mpeg,"
  | "mpe,"
  | "mpv"
  | "mpg,"
  | "mpeg,"
  | "m2v"
  | "m4v"
  | "svi"
  | "3gp"
  | "3g2"
  | "mxf"
  | "roq"
  | "nsv"
  | "flv"
  | "f4v"
  | "f4p"
  | "f4a"
  | "f4b"
  | string;

export type AudioEXT =
  | "none"
  | "weba"
  | "isma"
  | "mhtml"
  | "3gp"
  | "aa"
  | "aac"
  | "aax"
  | "act"
  | "aiff"
  | "alac"
  | "amr"
  | "ape"
  | "au"
  | "awb"
  | "dss"
  | "dvf"
  | "flac"
  | "gsm"
  | "iklax"
  | "ivs"
  | "m4a"
  | "m4b"
  | "m4p"
  | "mmf"
  | "mp3"
  | "mpc"
  | "msv"
  | "nmf"
  | "ogg,"
  | "oga,"
  | "mogg"
  | "opus"
  | "ra,"
  | "rm"
  | "raw"
  | "rf64"
  | "sln"
  | "tta"
  | "voc"
  | "vox"
  | "wav"
  | "wma"
  | "wv"
  | "webm"
  | "8svx"
  | "cda"
  | string;

export type SubtitleEXT =
  | "json"
  | "vtt"
  | "srt"
  | "ssa"
  | "ass"
  | "json3"
  | "sbv"
  | "txt"
  | "lrc"
  | "xml"
  | "usf"
  | "dxfp"
  | "srv1"
  | "srv2"
  | "srv3"
  | "ttml"
  | string;

export type LanguageCodes = LanguagesBasicISO | LanguagesISO_639_1 | LanguagesISO_639_3 | string;

export type LanguageNames =
  | "Afrikaans"
  | "Akan"
  | "Amharic"
  | "Arabic"
  | "Assamese"
  | "Aymara"
  | "Azerbaijani"
  | "Belarusian"
  | "Bulgarian"
  | "Bhojpuri"
  | "Bangla"
  | "Bosnian"
  | "Catalan"
  | "Cebuano"
  | "Corsican"
  | "Czech"
  | "Welsh"
  | "Danish"
  | "German"
  | "German (Original)"
  | "Divehi"
  | "Ewe"
  | "Greek"
  | "English"
  | "Esperanto"
  | "Spanish"
  | "Estonian"
  | "Basque"
  | "Persian"
  | "Finnish"
  | "Filipino"
  | "French"
  | "Western Frisian"
  | "Irish"
  | "Scottish Gaelic"
  | "Galician"
  | "Guarani"
  | "Gujarati"
  | "Hausa"
  | "Hawaiian"
  | "Hindi"
  | "Hmong"
  | "Croatian"
  | "Haitian Creole"
  | "Hungarian"
  | "Armenian"
  | "Indonesian"
  | "Igbo"
  | "Icelandic"
  | "Italian"
  | "Hebrew"
  | "Japanese"
  | "Javanese"
  | "Georgian"
  | "Kazakh"
  | "Khmer"
  | "Kannada"
  | "Korean"
  | "Krio"
  | "Kurdish"
  | "Kyrgyz"
  | "Latin"
  | "Luxembourgish"
  | "Ganda"
  | "Lingala"
  | "Lao"
  | "Lithuanian"
  | "Latvian"
  | "Malagasy"
  | "Māori"
  | "Macedonian"
  | "Malayalam"
  | "Mongolian"
  | "Marathi"
  | "Malay"
  | "Maltese"
  | "Burmese"
  | "Nepali"
  | "Dutch"
  | "Norwegian"
  | "Northern Sotho"
  | "Nyanja"
  | "Oromo"
  | "Odia"
  | "Punjabi"
  | "Polish"
  | "Pashto"
  | "Portuguese"
  | "Quechua"
  | "Romanian"
  | "Russian"
  | "Kinyarwanda"
  | "Sanskrit"
  | "Sindhi"
  | "Sinhala"
  | "Slovak"
  | "Slovenian"
  | "Samoan"
  | "Shona"
  | "Somali"
  | "Albanian"
  | "Serbian"
  | "Southern Sotho"
  | "Sundanese"
  | "Swedish"
  | "Swahili"
  | "Tamil"
  | "Telugu"
  | "Tajik"
  | "Thai"
  | "Tigrinya"
  | "Turkmen"
  | "Turkish"
  | "Tsonga"
  | "Tatar"
  | "Uyghur"
  | "Ukrainian"
  | "Unknown Language"
  | "Urdu"
  | "Uzbek"
  | "Vietnamese"
  | "Xhosa"
  | "Yiddish"
  | "Yoruba"
  | "Chinese (Simplified)"
  | "Chinese (Traditional)"
  | "Zulu"
  | "English (Original)"
  | "Spanish (Original)"
  | "French (Original)"
  | "Indonesian (Original)"
  | "Japanese (Original)"
  | "Dutch (Original)"
  | "Portuguese (Original)"
  | "Russian (Original)"
  | "Vietnamese (Original)"
  | "English (United Kingdom) - English (Animated)"
  | "English - en"
  | "Spanish (Latin America)"
  | "Spanish (Mexico)"
  | "French (France)"
  | "Portuguese (Brazil)"
  | "Portuguese (Portugal)"
  | "Chinese (Taiwan)";

export type LanguagesBasicISO =
  | "af"
  | "af-ZA"
  | "ar"
  | "ar-AE"
  | "ar-BH"
  | "ar-DZ"
  | "ar-EG"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KW"
  | "ar-LB"
  | "ar-LY"
  | "ar-MA"
  | "ar-OM"
  | "ar-QA"
  | "ar-SA"
  | "ar-SY"
  | "ar-TN"
  | "ar-YE"
  | "az"
  | "az-AZ"
  | "az-AZ"
  | "be"
  | "be-BY"
  | "bg"
  | "bg-BG"
  | "bs-BA"
  | "ca"
  | "ca-ES"
  | "cs"
  | "cs-CZ"
  | "cy"
  | "cy-GB"
  | "da"
  | "da-DK"
  | "de"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "de-LI"
  | "de-LU"
  | "dv"
  | "dv-MV"
  | "el"
  | "el-GR"
  | "en"
  | "en-AU"
  | "en-BZ"
  | "en-CA"
  | "en-CB"
  | "en-GB"
  | "en-IE"
  | "en-JM"
  | "en-NZ"
  | "en-PH"
  | "en-TT"
  | "en-US"
  | "en-ZA"
  | "en-ZW"
  | "eo"
  | "es"
  | "es-AR"
  | "es-BO"
  | "es-CL"
  | "es-CO"
  | "es-CR"
  | "es-DO"
  | "es-EC"
  | "es-ES"
  | "es-ES"
  | "es-GT"
  | "es-HN"
  | "es-MX"
  | "es-NI"
  | "es-PA"
  | "es-PE"
  | "es-PR"
  | "es-PY"
  | "es-SV"
  | "es-UY"
  | "es-VE"
  | "et"
  | "et-EE"
  | "eu"
  | "eu-ES"
  | "fa"
  | "fa-IR"
  | "fi"
  | "fi-FI"
  | "fo"
  | "fo-FO"
  | "fr"
  | "fr-BE"
  | "fr-CA"
  | "fr-CH"
  | "fr-FR"
  | "fr-LU"
  | "fr-MC"
  | "gl"
  | "gl-ES"
  | "gu"
  | "gu-IN"
  | "he"
  | "he-IL"
  | "hi"
  | "hi-IN"
  | "hr"
  | "hr-BA"
  | "hr-HR"
  | "hu"
  | "hu-HU"
  | "hy"
  | "hy-AM"
  | "id"
  | "id-ID"
  | "is"
  | "is-IS"
  | "it"
  | "it-CH"
  | "it-IT"
  | "ja"
  | "ja-JP"
  | "ka"
  | "ka-GE"
  | "kk"
  | "kk-KZ"
  | "kn"
  | "kn-IN"
  | "ko"
  | "ko-KR"
  | "kok"
  | "kok-IN"
  | "ky"
  | "ky-KG"
  | "lt"
  | "lt-LT"
  | "lv"
  | "lv-LV"
  | "mi"
  | "mi-NZ"
  | "mk"
  | "mk-MK"
  | "mn"
  | "mn-MN"
  | "mr"
  | "mr-IN"
  | "ms"
  | "ms-BN"
  | "ms-MY"
  | "mt"
  | "mt-MT"
  | "nb"
  | "nb-NO"
  | "nl"
  | "nl-BE"
  | "nl-NL"
  | "nn-NO"
  | "ns"
  | "ns-ZA"
  | "pa"
  | "pa-IN"
  | "pl"
  | "pl-PL"
  | "ps"
  | "ps-AR"
  | "pt"
  | "pt-BR"
  | "pt-PT"
  | "qu"
  | "qu-BO"
  | "qu-EC"
  | "qu-PE"
  | "ro"
  | "ro-RO"
  | "ru"
  | "ru-RU"
  | "sa"
  | "sa-IN"
  | "se"
  | "se-FI"
  | "se-FI"
  | "se-FI"
  | "se-NO"
  | "se-NO"
  | "se-NO"
  | "se-SE"
  | "se-SE"
  | "se-SE"
  | "sk"
  | "sk-SK"
  | "sl"
  | "sl-SI"
  | "sq"
  | "sq-AL"
  | "sr-BA"
  | "sr-BA"
  | "sr-SP"
  | "sr-SP"
  | "sv"
  | "sv-FI"
  | "sv-SE"
  | "sw"
  | "sw-KE"
  | "syr"
  | "syr-SY"
  | "ta"
  | "ta-IN"
  | "te"
  | "te-IN"
  | "th"
  | "th-TH"
  | "tl"
  | "tl-PH"
  | "tn"
  | "tn-ZA"
  | "tr"
  | "tr-TR"
  | "tt"
  | "tt-RU"
  | "ts"
  | "uk"
  | "uk-UA"
  | "ur"
  | "ur-PK"
  | "uz"
  | "uz-UZ"
  | "uz-UZ"
  | "vi"
  | "vi-VN"
  | "xh"
  | "xh-ZA"
  | "zh"
  | "zh-CN"
  | "zh-HK"
  | "zh-MO"
  | "zh-SG"
  | "zh-TW"
  | "zu"
  | "zu-ZA";
export type LanguagesISO_639_1 =
  | "aa"
  | "ab"
  | "af"
  | "ak"
  | "sq"
  | "am"
  | "ar"
  | "an"
  | "hy"
  | "as"
  | "av"
  | "ae"
  | "ay"
  | "az"
  | "ba"
  | "bm"
  | "eu"
  | "be"
  | "bn"
  | "bh"
  | "bi"
  | "bo"
  | "bs"
  | "br"
  | "bg"
  | "my"
  | "ca"
  | "cs"
  | "ch"
  | "ce"
  | "zh"
  | "cu"
  | "cv"
  | "kw"
  | "co"
  | "cr"
  | "cy"
  | "cs"
  | "da"
  | "de"
  | "dv"
  | "nl"
  | "dz"
  | "el"
  | "en"
  | "eo"
  | "et"
  | "eu"
  | "ee"
  | "fo"
  | "fa"
  | "fj"
  | "fi"
  | "fr"
  | "fr"
  | "fy"
  | "ff"
  | "ka"
  | "de"
  | "gd"
  | "ga"
  | "gl"
  | "gv"
  | "el"
  | "gn"
  | "gu"
  | "ht"
  | "ha"
  | "he"
  | "hz"
  | "hi"
  | "ho"
  | "hr"
  | "hu"
  | "hy"
  | "ig"
  | "is"
  | "io"
  | "ii"
  | "iu"
  | "ie"
  | "ia"
  | "id"
  | "ik"
  | "is"
  | "it"
  | "jv"
  | "ja"
  | "kl"
  | "kn"
  | "ks"
  | "ka"
  | "kr"
  | "kk"
  | "km"
  | "ki"
  | "rw"
  | "ky"
  | "kv"
  | "kg"
  | "ko"
  | "kj"
  | "ku"
  | "lo"
  | "la"
  | "lv"
  | "li"
  | "ln"
  | "lt"
  | "lb"
  | "lu"
  | "lg"
  | "mk"
  | "mh"
  | "ml"
  | "mi"
  | "mr"
  | "ms"
  | "mk"
  | "mg"
  | "mt"
  | "mn"
  | "mi"
  | "ms"
  | "my"
  | "na"
  | "nv"
  | "nr"
  | "nd"
  | "ng"
  | "ne"
  | "nl"
  | "nn"
  | "nb"
  | "no"
  | "ny"
  | "oc"
  | "oj"
  | "or"
  | "om"
  | "os"
  | "pa"
  | "fa"
  | "pi"
  | "pl"
  | "pt"
  | "ps"
  | "qu"
  | "rm"
  | "ro"
  | "ro"
  | "rn"
  | "ru"
  | "sg"
  | "sa"
  | "si"
  | "sk"
  | "sk"
  | "sl"
  | "se"
  | "sm"
  | "sn"
  | "sd"
  | "so"
  | "st"
  | "es"
  | "sq"
  | "sc"
  | "sr"
  | "ss"
  | "su"
  | "sw"
  | "sv"
  | "ty"
  | "ta"
  | "tt"
  | "te"
  | "tg"
  | "tl"
  | "th"
  | "bo"
  | "ti"
  | "to"
  | "tn"
  | "ts"
  | "tk"
  | "tr"
  | "tw"
  | "ug"
  | "uk"
  | "ur"
  | "uz"
  | "ve"
  | "vi"
  | "vo"
  | "cy"
  | "wa"
  | "wo"
  | "xh"
  | "yi"
  | "yo"
  | "za"
  | "zh"
  | "zu";
export type LanguagesISO_639_3 =
  | "und"
  | "aar"
  | "abk"
  | "ace"
  | "ach"
  | "ada"
  | "ady"
  | "afh"
  | "afr"
  | "ain"
  | "aka"
  | "akk"
  | "sqi"
  | "ale"
  | "alt"
  | "amh"
  | "ang"
  | "anp"
  | "ara"
  | "arc"
  | "arg"
  | "hye"
  | "arn"
  | "arp"
  | "arw"
  | "asm"
  | "ast"
  | "ava"
  | "ave"
  | "awa"
  | "aym"
  | "aze"
  | "bak"
  | "bal"
  | "bam"
  | "ban"
  | "eus"
  | "bas"
  | "bej"
  | "bel"
  | "bem"
  | "ben"
  | "bho"
  | "bik"
  | "bin"
  | "bis"
  | "bla"
  | "bod"
  | "bos"
  | "bra"
  | "bre"
  | "bua"
  | "bug"
  | "bul"
  | "mya"
  | "byn"
  | "cad"
  | "car"
  | "cat"
  | "ceb"
  | "ces"
  | "cha"
  | "chb"
  | "che"
  | "chg"
  | "zho"
  | "chk"
  | "chm"
  | "chn"
  | "cho"
  | "chp"
  | "chr"
  | "chu"
  | "chv"
  | "chy"
  | "cnr"
  | "cop"
  | "cor"
  | "cos"
  | "cre"
  | "crh"
  | "csb"
  | "cym"
  | "ces"
  | "dak"
  | "dan"
  | "dar"
  | "del"
  | "den"
  | "deu"
  | "dgr"
  | "din"
  | "div"
  | "doi"
  | "dsb"
  | "dua"
  | "dum"
  | "nld"
  | "dyu"
  | "dzo"
  | "efi"
  | "egy"
  | "eka"
  | "ell"
  | "elx"
  | "eng"
  | "enm"
  | "epo"
  | "est"
  | "eus"
  | "ewe"
  | "ewo"
  | "fan"
  | "fao"
  | "fas"
  | "fat"
  | "fij"
  | "fil"
  | "fin"
  | "fon"
  | "fra"
  | "fra"
  | "frm"
  | "fro"
  | "frr"
  | "frs"
  | "fry"
  | "ful"
  | "fur"
  | "gaa"
  | "gay"
  | "gba"
  | "kat"
  | "deu"
  | "gez"
  | "gil"
  | "gla"
  | "gle"
  | "glg"
  | "glv"
  | "gmh"
  | "goh"
  | "gon"
  | "gor"
  | "got"
  | "grb"
  | "grc"
  | "ell"
  | "grn"
  | "gsw"
  | "guj"
  | "gwi"
  | "hai"
  | "hat"
  | "hau"
  | "haw"
  | "heb"
  | "her"
  | "hil"
  | "hin"
  | "hit"
  | "hmn"
  | "hmo"
  | "hrv"
  | "hsb"
  | "hun"
  | "hup"
  | "hye"
  | "iba"
  | "ibo"
  | "isl"
  | "ido"
  | "iii"
  | "iku"
  | "ile"
  | "ilo"
  | "ina"
  | "ind"
  | "inh"
  | "ipk"
  | "isl"
  | "ita"
  | "jav"
  | "jbo"
  | "jpn"
  | "jpr"
  | "jrb"
  | "kaa"
  | "kab"
  | "kac"
  | "kal"
  | "kam"
  | "kan"
  | "kas"
  | "kat"
  | "kau"
  | "kaw"
  | "kaz"
  | "kbd"
  | "kha"
  | "khm"
  | "kho"
  | "kik"
  | "kin"
  | "kir"
  | "kmb"
  | "kok"
  | "kom"
  | "kon"
  | "kor"
  | "kos"
  | "kpe"
  | "krc"
  | "krl"
  | "kru"
  | "kua"
  | "kum"
  | "kur"
  | "kut"
  | "lad"
  | "lah"
  | "lam"
  | "lao"
  | "lat"
  | "lav"
  | "lez"
  | "lim"
  | "lin"
  | "lit"
  | "lol"
  | "loz"
  | "ltz"
  | "lua"
  | "lub"
  | "lug"
  | "lui"
  | "lun"
  | "luo"
  | "lus"
  | "mkd"
  | "mad"
  | "mag"
  | "mah"
  | "mai"
  | "mak"
  | "mal"
  | "man"
  | "mri"
  | "mar"
  | "mas"
  | "msa"
  | "mdf"
  | "mdr"
  | "men"
  | "mga"
  | "mic"
  | "min"
  | "mis"
  | "mkd"
  | "mlg"
  | "mlt"
  | "mnc"
  | "mni"
  | "moh"
  | "mon"
  | "mos"
  | "mri"
  | "msa"
  | "mul"
  | "mus"
  | "mwl"
  | "mwr"
  | "mya"
  | "myv"
  | "nap"
  | "nau"
  | "nav"
  | "nbl"
  | "nde"
  | "ndo"
  | "nds"
  | "nep"
  | "new"
  | "nia"
  | "niu"
  | "nld"
  | "nno"
  | "nob"
  | "nog"
  | "non"
  | "nor"
  | "nqo"
  | "nso"
  | "nwc"
  | "nya"
  | "nym"
  | "nyn"
  | "nyo"
  | "nzi"
  | "oci"
  | "oji"
  | "ori"
  | "orm"
  | "osa"
  | "oss"
  | "ota"
  | "pag"
  | "pal"
  | "pam"
  | "pan"
  | "pap"
  | "pau"
  | "peo"
  | "fas"
  | "phn"
  | "pli"
  | "pol"
  | "pon"
  | "por"
  | "pro"
  | "pus"
  | "qaa"
  | "qtz"
  | "que"
  | "raj"
  | "rap"
  | "rar"
  | "roh"
  | "rom"
  | "ron"
  | "ron"
  | "run"
  | "rup"
  | "rus"
  | "sad"
  | "sag"
  | "sah"
  | "sam"
  | "san"
  | "sas"
  | "sat"
  | "scn"
  | "sco"
  | "sel"
  | "sga"
  | "shn"
  | "sid"
  | "sin"
  | "slk"
  | "slk"
  | "slv"
  | "sma"
  | "sme"
  | "smj"
  | "smn"
  | "smo"
  | "sms"
  | "sna"
  | "snd"
  | "snk"
  | "sog"
  | "som"
  | "sot"
  | "spa"
  | "sqi"
  | "srd"
  | "srn"
  | "srp"
  | "srr"
  | "ssw"
  | "suk"
  | "sun"
  | "sus"
  | "sux"
  | "swa"
  | "swe"
  | "syc"
  | "syr"
  | "tah"
  | "tam"
  | "tat"
  | "tel"
  | "tem"
  | "ter"
  | "tet"
  | "tgk"
  | "tgl"
  | "tha"
  | "bod"
  | "tig"
  | "tir"
  | "tiv"
  | "tkl"
  | "tlh"
  | "tli"
  | "tmh"
  | "tog"
  | "ton"
  | "tpi"
  | "tsi"
  | "tsn"
  | "tso"
  | "tuk"
  | "tum"
  | "tur"
  | "tvl"
  | "twi"
  | "tyv"
  | "udm"
  | "uga"
  | "uig"
  | "ukr"
  | "umb"
  | "und"
  | "urd"
  | "uzb"
  | "vai"
  | "ven"
  | "vie"
  | "vol"
  | "vot"
  | "wal"
  | "war"
  | "was"
  | "cym"
  | "wln"
  | "wol"
  | "xal"
  | "xho"
  | "yao"
  | "yap"
  | "yid"
  | "yor"
  | "zap"
  | "zbl"
  | "zen"
  | "zgh"
  | "zha"
  | "zho"
  | "zul"
  | "zun"
  | "zxx"
  | "zza";
