import crypto from "crypto";
import { readFileSync, writeFileSync } from "fs";
import Long from "long";
import { AES_CMAC } from "./cmac.js";
import {
  ClientIdentification,
  License,
  LicenseRequest,
  LicenseRequest_RequestType,
  LicenseType,
  ProtocolVersion,
  SignedMessage,
  SignedMessage_MessageType,
  SignedMessage_SessionKeyType,
  WidevinePsshData
} from "./license_protocol.js";

const WIDEVINE_SYSTEM_ID = new Uint8Array([237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237]);

const identifierBlob = readFileSync("security/device_client_id_blob");
const privateKey = readFileSync("security/device_private_key");

export type Key = {
  kid: string;
  key: string;
};

export class WVDecryptior {
  private _sessions: {
    [key: string]: Session[];
  } = {};
  constructor(pssh: Buffer) {
    console.log("pssh", Buffer.from(pssh).toString("hex"));
  }

  checkPSSH(pssh: Buffer): boolean {
    return pssh.subarray(12, 28).equals(Buffer.from(WIDEVINE_SYSTEM_ID));
  }
}

export class Session {
  private _devicePrivateKey: crypto.KeyObject;
  private _identifier: Buffer;
  private _pssh: Buffer;
  private _rawLicenseRequest?: Buffer;

  constructor(pssh: Buffer) {
    this._devicePrivateKey = crypto.createPrivateKey(privateKey);
    this._identifier = this._generateIdentifier();
    this._pssh = pssh;
  }

  createLicenseRequest(): Buffer {
    const clientIdentification = ClientIdentification.decode(identifierBlob);
    writeFileSync("security/client_id_stuff", ClientIdentification.encode(clientIdentification).finish());
    const pssh = this._parsePSSH(this._pssh);
    if (!pssh) {
      throw new Error("pssh error!");
    }

    const licenseRequest: LicenseRequest = {
      type: LicenseRequest_RequestType.NEW,
      clientId: clientIdentification,
      contentId: {
        widevinePsshData: {
          psshData: [this._pssh.subarray(32)],
          licenseType: LicenseType.STREAMING,
          requestId: this._identifier
        }
      },
      requestTime: Long.fromNumber(Date.now()).divide(1000),
      protocolVersion: ProtocolVersion.VERSION_2_1,
      keyControlNonce: crypto.randomInt(2 ** 31),
      keyControlNonceDeprecated: Buffer.alloc(0),
      encryptedClientId: undefined
    };

    this._rawLicenseRequest = Buffer.from(LicenseRequest.encode(licenseRequest).finish());

    const signature = crypto
      .createSign("sha1")
      .update(this._rawLicenseRequest)
      .sign({ key: this._devicePrivateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength: 20 });

    const signedLicenseRequest: SignedMessage = {
      type: SignedMessage_MessageType.LICENSE_REQUEST,
      msg: this._rawLicenseRequest,
      signature: Buffer.from(signature),
      sessionKey: Buffer.alloc(0),
      remoteAttestation: Buffer.alloc(0),
      metricData: [],
      serviceVersionInfo: undefined,
      sessionKeyType: SignedMessage_SessionKeyType.UNDEFINED,
      oemcryptoCoreMessage: Buffer.alloc(0)
    };

    return Buffer.from(SignedMessage.encode(signedLicenseRequest).finish());
  }

  parseLicense(rawLicense: Buffer) {
    if (!this._rawLicenseRequest) {
      throw new Error("Request a license first!");
    }
    const signedLicense = SignedMessage.decode(rawLicense);
    const sessionKey = crypto.privateDecrypt(this._devicePrivateKey, signedLicense.sessionKey);

    const cmac = new AES_CMAC(Buffer.from(sessionKey));

    const encKeyBase = Buffer.concat([Buffer.from("ENCRYPTION"), Buffer.from("\x00"), this._rawLicenseRequest, Buffer.from("\x00\x00\x00\x80")]);
    const authKeyBase = Buffer.concat([Buffer.from("AUTHENTICATION"), Buffer.from("\x00"), this._rawLicenseRequest, Buffer.from("\x00\x00\x02\x00")]);

    const encKey = cmac.calculate(Buffer.concat([Buffer.from("\x01"), encKeyBase]));
    const serverKey = Buffer.concat([
      cmac.calculate(Buffer.concat([Buffer.from("\x01"), authKeyBase])),
      cmac.calculate(Buffer.concat([Buffer.from("\x02"), authKeyBase]))
    ]);
    const clientKey = Buffer.concat([
      cmac.calculate(Buffer.concat([Buffer.from("\x03"), authKeyBase])),
      cmac.calculate(Buffer.concat([Buffer.from("\x04"), authKeyBase]))
    ]);

    const calculatedSignature = crypto.createHmac("sha256", serverKey).update(signedLicense.msg).digest();

    if (!calculatedSignature.equals(signedLicense.signature)) {
      throw new Error("Signatures do not match!");
    }

    const license = License.decode(signedLicense.msg);

    return license.key.map((keyContainer) => {
      const keyId = keyContainer.id.length ? keyContainer.id.toString("hex") : keyContainer.type.toString();
      const decipher = crypto.createDecipheriv(`aes-${encKey.length * 8}-cbc`, encKey, keyContainer.iv);
      const decryptedKey = decipher.update(keyContainer.key);
      decipher.destroy();
      const key: Key = {
        kid: keyId,
        key: decryptedKey.toString("hex")
      };
      console.log(`${keyContainer.type.toString()}, ${key.kid}:${key.key}`);
      return key;
    });
  }

  private _parsePSSH(pssh: Buffer): WidevinePsshData | null {
    try {
      return WidevinePsshData.decode(pssh.subarray(32));
    } catch {
      return null;
    }
  }

  private _generateIdentifier(): Buffer {
    return Buffer.from(`${crypto.randomBytes(8).toString("hex")}${"01"}${"00000000000000"}`);
  }

  get pssh(): Buffer {
    return this._pssh;
  }
}

export function from64(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}
