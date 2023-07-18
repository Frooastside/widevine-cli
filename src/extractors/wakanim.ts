import { createCipheriv } from "crypto";
import { Server } from "http";
import Koa from "koa";
import { exit } from "process";
import { URL } from "url";
import { format } from "util";
import { v4 as uuidv4, validate } from "uuid";
import { extractPsshData } from "../drm.js";
import { DownloadConfig, globalConfig } from "../index.js";
import { ContainerMetadata, EpisodeMetadata, Extractor, Metadata } from "../service.js";

import { wakanim_api, wakanim_core } from "wakanim-api";

export default class WakanimService extends Extractor {
  private _config: DownloadConfig;
  private _initialized = false;
  private _koa: Koa;
  private _koaServer: Server;
  private _koaAddress: string;
  private _manifests: Record<string, string> = {};
  private _deviceUserAgent = "Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_x86_64 Build/SE1A.220826.006.A1)";
  private _playerUserAgent = "Wakanim/7.1.0 (Linux;Android 12) ExoPlayerLib/2.13.3";
  private _userId?: string;
  private _accessToken?: string;
  private _premiumAccess?: boolean;

  constructor(config: DownloadConfig) {
    super();
    this._config = config;
    this._koa = new Koa();
    this._koa.use((context) => {
      const paths = context.request.path.split("/");
      if (paths.length < 2) {
        return (context.response.status = 400);
      }
      const episodeId = paths[1];
      if (!validate(episodeId)) {
        return (context.response.status = 400);
      }
      const manifest = this._manifests[episodeId];
      if (!manifest) {
        return (context.response.status = 400);
      }
      context.response.headers["content-type"] = "application/dash+xml";
      context.response.body = manifest;
    });
    this._koaServer = this._koa.listen();
    const serverAddress = this._koaServer.address();
    const port = typeof serverAddress !== "string" ? serverAddress?.port : Number(serverAddress.split(":")[1]);
    this._koaAddress = `http://localhost:${port}`;
    this.logger.debug(`koa server online on port ${port}`, this._koaAddress);
  }

  async initialize() {
    this._initialized = true;
  }

  async release() {
    this._initialized = false;
    this._koaServer.closeAllConnections();
    this._koaServer.close();
  }

  private _makeManifestAvailable(id: string, manifest: string) {
    this._manifests[id] = manifest;
  }

  private _removeManifest(id: string) {
    delete this._manifests[id];
  }

  checkResponsibility(url: string): boolean {
    return /^(https?:)\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/(show|episode)\/[0-9]+\/[\-a-zA-Z0-9]+\/?(season\/[0-9]+\/[\-a-zA-Z0-9]+)?\/?/gi.test(
      url
    ) /* https://regex101.com/r/y0G0tj/2 */;
  }

  async fetchMetadata(url: string): Promise<Metadata | null> {
    if (!this._accessToken) {
      if (!(await this._login())) {
        throw new Error("an error occurred while trying to log in to wakanim services");
      }
    }
    if (
      /^https?:\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/episode\/([0-9]+)\/[\-a-zA-Z0-9]+\/?/gi.test(
        url
      ) /* https://regex101.com/r/2T6ZsI/2 */
    ) {
      return await this._fetchEpisodeMetadataFromUrl(url);
    } else if (
      /^https?:\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/show\/([0-9]+)\/[\-a-zA-Z0-9]+(\/season\/([0-9]+)\/[\-a-zA-Z0-9]+)?\/?/gi.test(
        url
      ) /* https://regex101.com/r/PHufNF/3 */
    ) {
      return await this._fetchSeasonMetadata(url);
    } else {
      throw new Error("this should have never had happen");
    }
  }

  private async _login(): Promise<boolean> {
    if (this._config.anonymous || (!this._config.credentials && !this._config.refreshToken)) {
      throw new Error("Wakanim requires credentials with --credentials or a refresh token with --refresh-token to log in");
    }
    if (this._config.refreshToken) {
      const body = `client_id=wakanim.android.test2&grant_type=refresh_token&refresh_token=${
        this._config.refreshToken
      }&response_type=code+id_token+token&client_secret=sypzbgkAPqTd9qrZ12oP&scope=email+openid+profile+offline_access+read&redirect_uri=wakanimandroidapp%3A%2F%2Fcallback&nonce=${uuidv4()}&state=${uuidv4()}`;
      const loginResponse = await fetch("https://account.wakanim.tv/core/connect/token", {
        method: "POST",
        headers: {
          "User-Agent": this._deviceUserAgent,
          "X-DeviceType": "Google",
          "X-SoftwareVersion": "12 S",
          "X-AppVersion": "7.1.0",
          "X-DeviceVersion": "sdk_gphone64_x86_64",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
      });
      if (!loginResponse.ok) {
        throw new Error("an error occurred while trying to log in", { cause: loginResponse.statusText });
      }
      const loginInformation: wakanim_core.paths["/connect/token"]["post"]["responses"]["200"]["content"]["application/json"] =
        await loginResponse.json();
      this._accessToken = loginInformation.access_token;
      if (globalConfig.verbose) {
        this.logger.debug("access token", this._accessToken);
      }
    } else if (this._config.credentials) {
      const tokens = this._config.credentials.split(":");
      if (tokens.length < 2) {
        throw new Error("please provide email and password in the format --credentials EMAIL:PASSWORD");
      }
      const email = tokens[0];
      const password = tokens[1];
      const body = `client_id=wakanim.android.test2&grant_type=password&response_type=code+id_token+token&client_secret=sypzbgkAPqTd9qrZ12oP&username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(
        password
      )}&scope=email+openid+profile+offline_access+read&redirect_uri=wakanimandroidapp%3A%2F%2Fcallback&nonce=${uuidv4()}&state=${uuidv4()}`;
      const loginResponse = await fetch("https://account.wakanim.tv/core/connect/token", {
        method: "POST",
        headers: {
          "User-Agent": this._deviceUserAgent,
          "X-DeviceType": "Google",
          "X-SoftwareVersion": "12 S",
          "X-AppVersion": "7.1.0",
          "X-DeviceVersion": "sdk_gphone64_x86_64",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
      });
      if (!loginResponse.ok) {
        throw new Error("an error occurred while trying to log in", { cause: loginResponse.statusText });
      }
      const loginInformation: wakanim_core.paths["/connect/token"]["post"]["responses"]["200"]["content"]["application/json"] =
        await loginResponse.json();
      this._accessToken = loginInformation.access_token;
      if (globalConfig.verbose) {
        this.logger.debug("access token", this._accessToken);
      }
    } else {
      throw new Error("this should have never had happen");
    }
    if (!this._accessToken) {
      return false;
    }
    const userInformationResponse = await fetch("https://account.wakanim.tv/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._accessToken}`
      }
    });
    if (!userInformationResponse.ok) {
      return false;
    }
    const userInformation: wakanim_api.paths["/user"]["get"]["responses"]["200"]["content"]["application/json"] =
      await userInformationResponse.json();
    this._premiumAccess = !!userInformation.accountType;
    this._userId = userInformation.public?.userId;
    return true;
  }

  private async _fetchSeasonMetadata(url: string): Promise<ContainerMetadata | null> {
    if (!this._accessToken) {
      throw new Error("Wakanim requires to be logged in supply credentials with --credentials or use a refresh token with --refresh-token");
    }
    try {
      const regexResult =
        /^https?:\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/show\/([0-9]+)\/[\-a-zA-Z0-9]+(\/season\/([0-9]+)\/[\-a-zA-Z0-9]+)?\/?/gi.exec(
          url
        );
      if (!regexResult) {
        throw new Error("an error occurred while extracting the season id");
      }
      const showId = regexResult[2];
      const seasonId = regexResult[4];

      const showInformation: wakanim_api.Show = await this._fetchShowInformation(showId, this._accessToken);
      if (!showInformation.seasons) {
        throw new Error("an error occurred while fetching the show information, no seasons available");
      }
      const episodes = showInformation.seasons.filter((season) => (seasonId ? `${season.idSeason}` : true)).flatMap((season) => season.episodes);

      const episodeMetadataList: EpisodeMetadata[] = [];
      for (const episode of episodes) {
        try {
          if (!episode) {
            continue;
          }
          const episodeMetadata = await this._fetchEpisodeMetadata(`${episode.id}`);
          if (!episodeMetadata) {
            throw new Error(`got empty episode metadata from "${url}"`);
          }
          episodeMetadataList.push(episodeMetadata);
        } catch (error) {
          this.logger.debug(error, (<Error>error)?.stack);
          this.logger.error(error);
          if (globalConfig.ignoreErrors) {
            continue;
          } else {
            exit(1);
          }
        }
      }
      if (!episodeMetadataList.length) {
        throw new Error("could not fetch the metadata of any episode");
      }

      const containerMetadata: ContainerMetadata = {
        type: "container",
        source: {
          url: url
        },
        contents: episodeMetadataList,
        title: showInformation.name
      };
      return containerMetadata;
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    }
  }

  private async _fetchEpisodeMetadataFromUrl(url: string): Promise<EpisodeMetadata | null> {
    if (!this._accessToken || !this._userId) {
      throw new Error("Wakanim requires to be logged in supply credentials with --credentials or use a refresh token with --refresh-token");
    }
    try {
      const regexResult = /^https?:\/\/(www\.)?wakanim\.tv\/[a-z]+\/v[0-9]\/catalogue\/episode\/([0-9]+)\/[\-a-zA-Z0-9]+\/?/gi.exec(url);
      if (!regexResult) {
        throw new Error("an error occurred while extracting the season id");
      }
      const episodeId = regexResult[2];
      return await this._fetchEpisodeMetadata(episodeId);
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    }
  }

  private async _fetchEpisodeMetadata(episodeId: string): Promise<EpisodeMetadata | null> {
    if (!this._accessToken || !this._userId) {
      throw new Error("Wakanim requires to be logged in supply credentials with --credentials or use a refresh token with --refresh-token");
    }
    try {
      const streamInformation: wakanim_api.Episode = await this._fetchStreamInformation(episodeId, this._accessToken);
      if (!streamInformation.episodeFreeStreaming) {
        throw new Error("an error occurred while fetching the stream information");
      }
      const manifestUrl = new URL(streamInformation.episodeFreeStreaming);
      const kid = manifestUrl.searchParams.get("kid");
      const token = manifestUrl.searchParams.get("token");
      const forge = manifestUrl.searchParams.get("forge");
      if (!kid || !token || !forge) {
        throw new Error("an error occurred while extracting token for the license request");
      }

      this.logger.debug("manifest url", streamInformation.episodeFreeStreaming);
      const manifestResponse = await fetch(streamInformation.episodeFreeStreaming, {
        headers: {
          "User-Agent": this._playerUserAgent,
          "X-DeviceType": "Google",
          "X-Player": "2",
          "X-SoftwareVersion": "12 S",
          "X-AppVersion": "7.1.0",
          "X-DeviceVersion": "sdk_gphone64_x86_64"
        }
      });
      if (!manifestResponse.ok) {
        throw new Error("an error occurred while fetching the stream information");
      }
      const manifest = await manifestResponse.text();

      let psshData: Record<string, Buffer>;
      if (!manifest || !(psshData = await extractPsshData(this.logger, manifest))) {
        throw new Error("an error occurred while parsing the manifest");
      }
      const episodeIndex = streamInformation.numero;
      const seasonIndex =
        streamInformation.season && streamInformation.season.shortName ? this._parseShortSeason(streamInformation.season.shortName) : null;
      const container = streamInformation.show && streamInformation.show.name ? streamInformation.show.name : null;
      const title = streamInformation.title;

      const manifestId = uuidv4();
      if (!this._config.simulate && !this._config.onlyDrm) {
        this._makeManifestAvailable(manifestId, manifest);
      }
      const metadata: Metadata = {
        type: "episode",
        title: title,
        container: container,
        season: seasonIndex,
        index: !!episodeIndex ? Number(episodeIndex) : undefined,
        source: {
          url: `${this._koaAddress}/${manifestId}`,
          cleanup: () => this._removeManifest(manifestId)
        },
        licenseInformation: {
          url: `https://app-api.wakanim.tv/api/key/widevineapp?kid=${kid}`,
          headers: {
            "User-Agent": this._playerUserAgent,
            Authorization: token,
            "X-DeviceType": "Google",
            "X-Player": "2",
            "X-SoftwareVersion": "12 S",
            "X-AppVersion": "7.1.0",
            "X-DeviceVersion": "sdk_gphone64_x86_64",
            "X-HToken-Forge": forge,
            "X-HToken": calculateHToken(this._userId, forge, kid, "wakanim.android.test2"),
            "Content-Type": "application/octet-stream"
          },
          psshData: psshData
        }
      };
      return metadata;
    } catch (error) {
      this.logger.debug(error, (<Error>error)?.stack);
      this.logger.error(error);
      return null;
    }
  }

  private _parseShortSeason(shortName: string): number | null {
    const regex = /^(S([0-9]+))?(A([0-9]+))?$/gi.exec(shortName);
    if (!regex) {
      return null;
    }
    const coup = Number(regex[4]);
    const season = Number(regex[2]) || (coup ? 1 : null);
    return season;
  }

  private async _fetchShowInformation(showId: string, accessToken: string): Promise<wakanim_api.Show> {
    const showInformationResponse = await fetch(`https://account.wakanim.tv/api/catalogue/show?Id=${showId}`, {
      method: "GET",
      headers: {
        "User-Agent": this._deviceUserAgent,
        Authorization: `Bearer ${accessToken}`,
        "X-DeviceType": "Google",
        "X-SoftwareVersion": "12 S",
        "X-AppVersion": "7.1.0",
        "X-DeviceVersion": "sdk_gphone64_x86_64"
      }
    });
    if (!showInformationResponse.ok) {
      throw new Error("an error occurred while fetching the show information");
    }
    const showInformation: wakanim_api.Show = await showInformationResponse.json();
    return showInformation;
  }

  private async _fetchStreamInformation(episodeId: string, accessToken: string): Promise<wakanim_api.Episode> {
    const streamInformationResponse = await fetch(`https://account.wakanim.tv/api/catalogue/episodestreamingfree?Id=${episodeId}`, {
      method: "GET",
      headers: {
        "User-Agent": this._playerUserAgent,
        Authorization: `Bearer ${accessToken}`,
        "X-DeviceType": "Google",
        "X-Player": "2",
        "X-SoftwareVersion": "12 S",
        "X-AppVersion": "7.1.0",
        "X-DeviceVersion": "sdk_gphone64_x86_64"
      }
    });
    if (!streamInformationResponse.ok) {
      throw new Error("an error occurred while fetching the stream information");
    }
    const streamInformation: wakanim_api.Episode = await streamInformationResponse.json();
    return streamInformation;
  }

  get name(): string {
    return "Wakanim";
  }
  get version(): string {
    return "0.0.1";
  }

  get ready(): boolean {
    return this._initialized;
  }
}

function calculateHToken(userId: string, iv: string, kid: string, client: string): string {
  const d0c_format = "@%s@Dew#@WAK@%s@N1M@%s";
  const d0c_output = format(d0c_format, client, kid, userId);
  const encryptionKey = Buffer.from("0484032047dd341820aa19621bdc3459", "hex");
  const cipher = createCipheriv("aes-128-cbc", encryptionKey, Buffer.from(iv, "ascii"));
  let encrypted = cipher.update(d0c_output, "ascii", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
