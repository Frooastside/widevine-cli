import { randomBytes, randomInt } from "crypto";
import { readFileSync } from "fs";
import {
  SignedDeviceCertificate,
  SignedMessage,
  SignedMessage_MessageType,
  WidevineCencHeader,
  SignedLicenseRequest,
  ClientIdentification,
  SignedLicenseRequest_MessageType,
  LicenseType,
  LicenseRequest_RequestType,
  ProtocolVersion,
  EncryptedClientIdentification
} from "./wv_proto3.js";
import * as forge from "node-forge";

const WIDEVINE_SYSTEM_ID = new Uint8Array([237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237]);

const identifierBlob = readFileSync("security/device_client_id_blob");
const privateKey = readFileSync("security/device_private_key");

type Device = {
  privateKey: string;
};

export type Key = {
  kid: string;
  key: string;
};

export class WVDecryptior {
  constructor(pssh: string, device: CDM, cert: string | undefined) {
    console.log(pssh);
  }
}

export function checkPSSH(pssh: Buffer): boolean {
  return pssh.subarray(12, 28).equals(Buffer.from(WIDEVINE_SYSTEM_ID));
}

export class CDM {
  private _sessions: {
    [key: string]: Session[];
  } = {};

  parsePSSH(pssh: Buffer): WidevineCencHeader | null {
    try {
      return WidevineCencHeader.decode(pssh.subarray(32));
    } catch {
      return null;
    }
  }
}

export class Session {
  private _identifier: Buffer;
  private _pssh: Buffer;
  private _privacyMode = false;
  private _serviceCertificate?: SignedDeviceCertificate;

  constructor(pssh: Buffer) {
    this._identifier = this._generateIdentifier();
    this._pssh = pssh;
  }

  getLicenseRequest(): string {
    const clientIdentification = ClientIdentification.decode(identifierBlob);
    const cenc = this.parsePSSH(this._pssh);
    if (!cenc) {
      throw new Error("cenc error!");
    }
    /*const licenseRequest: SignedLicenseRequest = {
      Type: SignedLicenseRequest_MessageType.LICENSE_REQUEST,
      Msg: {
        Type: LicenseRequest_RequestType.NEW,
        ContentId: {
          CencId: {
            Pssh: cenc,
            LicenseType: LicenseType.DEFAULT,
            RequestId: this._identifier
          },
          WebmId: undefined,
          License: undefined
        },
        RequestTime: Date.now(),
        ProtocolVersion: ProtocolVersion.CURRENT,
        KeyControlNonce: randomInt(2 ** 31),
        KeyControlNonceDeprecated: Buffer.alloc(0),
        ClientId: clientIdentification,
        EncryptedClientId: this._encryptClientIdentification()
      }
    };*/

    return "";
  }

  /*private _encryptClientIdentification(): EncryptedClientIdentification {
    try {
      forge.pki.create;
      const encryptedClientIdentification: EncryptedClientIdentification = {};
    } catch {
      throw new Error("Method not implemented.");
    }
  }*/

  parsePSSH(pssh: Buffer): WidevineCencHeader | null {
    try {
      return WidevineCencHeader.decode(pssh.subarray(32));
    } catch {
      return null;
    }
  }

  parseServiceMessage(certificate: Buffer) {
    try {
      const message = SignedMessage.decode(certificate);
      if (message.Type !== SignedMessage_MessageType.UNRECOGNIZED) {
        this._serviceCertificate = SignedDeviceCertificate.decode(message.Msg);
      } else {
        this._serviceCertificate = SignedDeviceCertificate.decode(certificate);
      }
      this._privacyMode = true;
    } catch (error) {}
  }

  private _generateIdentifier(): Buffer {
    return Buffer.from(`${randomBytes(8).toString("hex")}${"01"}${"00000000000000"}`, "hex");
  }

  get pssh(): Buffer {
    return this._pssh;
  }
}

export function from64(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}
