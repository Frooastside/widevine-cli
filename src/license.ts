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
    console.log("identifier", this._identifier.toString());
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

    console.log("license request", LicenseRequest.toJSON(licenseRequest));
    writeFileSync("security/raw_license_ss", Buffer.from(LicenseRequest.encode(licenseRequest).finish()));
    writeFileSync("security/raw_license_se", LicenseRequest.encode(licenseRequest).finish());
    this._rawLicenseRequest = Buffer.from(LicenseRequest.encode(licenseRequest).finish());

    const signature = crypto
      .createSign("sha1")
      .update(this._rawLicenseRequest)
      .sign({ key: this._devicePrivateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING });

    console.log("signature", Buffer.from(signature).toString("hex"));

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
    console.log("session key", sessionKey);

    const cmac = new AES_CMAC(Buffer.from(sessionKey));

    const encKeyBase = `ENCRYPTION\x00${this._rawLicenseRequest}\x00\x00\x00\x80`;
    const authKeyBase = `AUTHENTICATION\x00${this._rawLicenseRequest}\x00\x00\x02\x00`;

    const encKey = cmac.calculate(Buffer.from(`\x01${encKeyBase}`));
    const authKey1 = cmac.calculate(Buffer.from(`\x01${authKeyBase}`));
    const authKey2 = cmac.calculate(Buffer.from(`\x02${authKeyBase}`));
    const authKey3 = cmac.calculate(Buffer.from(`\x03${authKeyBase}`));
    const authKey4 = cmac.calculate(Buffer.from(`\x04${authKeyBase}`));

    const hmac = crypto.createHmac("sha256", Buffer.concat([authKey1, authKey2]));
    hmac.update(signedLicense.msg);
    const calculatedSignature = hmac.digest();

    console.log("calc, received", calculatedSignature.toString("hex"), signedLicense.msg.toString("hex"));

    if (!calculatedSignature.equals(signedLicense.msg)) {
      throw new Error("Signatures do not match!");
    }

    const license = License.decode(signedLicense.msg);

    for (const keyContainer of license.key) {
      const keyId = keyContainer.id.length ? keyContainer.id.toString() : keyContainer.type.toString();
      const decipher = crypto.createDecipheriv(`aes-${encKey.length * 8}-cbc`, encKey, keyContainer.iv);
      const decryptedKey = decipher.update(keyContainer.key);
      decipher.destroy();
      const key: Key = {
        kid: keyId,
        key: decryptedKey.toString()
      };
      console.log(`${keyId}:${decryptedKey.toString()}`, key, decryptedKey.toString("hex"));
    }
  }

  private _parsePSSH(pssh: Buffer): WidevinePsshData | null {
    try {
      return WidevinePsshData.decode(pssh.subarray(32));
    } catch {
      return null;
    }
  }

  private _generateIdentifier(): Buffer {
    //return Buffer.from(`${randomBytes(8).toString("hex")}${"01"}${"00000000000000"}`, "hex");
    return Buffer.from(`${"ABD82DC915BC20D0DCF832930DA7F197"}${"01"}${"00000000000000"}`, "ascii");
  }

  get pssh(): Buffer {
    return this._pssh;
  }
}

export function from64(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}
