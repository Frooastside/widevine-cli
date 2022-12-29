import { randomBytes, randomInt } from "crypto";
import { readFileSync } from "fs";
import Long from "long";
import * as forge from "node-forge";
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
    console.log(pssh);
  }

  checkPSSH(pssh: Buffer): boolean {
    return pssh.subarray(12, 28).equals(Buffer.from(WIDEVINE_SYSTEM_ID));
  }
}

export class Session {
  private _devicePrivateKey: forge.pki.rsa.PrivateKey;
  private _identifier: Buffer;
  private _pssh: Buffer;
  private _rawLicenseRequest?: Buffer;

  constructor(pssh: Buffer) {
    this._devicePrivateKey = forge.pki.privateKeyFromPem(privateKey.toString());
    this._identifier = this._generateIdentifier();
    this._pssh = pssh;
  }

  createLicenseRequest(): Buffer {
    const clientIdentification = ClientIdentification.decode(identifierBlob);
    const pssh = this.parsePSSH(this._pssh);
    if (!pssh) {
      throw new Error("pssh error!");
    }

    const licenseRequest: LicenseRequest = {
      type: LicenseRequest_RequestType.NEW,
      clientId: clientIdentification,
      contentId: {
        widevinePsshData: {
          psshData: [this._pssh.subarray(32)],
          licenseType: LicenseType.AUTOMATIC,
          requestId: this._identifier
        }
      },
      requestTime: new Long(Date.now()),
      protocolVersion: ProtocolVersion.VERSION_2_2,
      keyControlNonce: randomInt(2 ** 31),
      keyControlNonceDeprecated: Buffer.alloc(0),
      encryptedClientId: undefined
    };

    this._rawLicenseRequest = Buffer.from(LicenseRequest.encode(licenseRequest).finish());

    const hash = forge.sha1.create();
    hash.update(this._rawLicenseRequest.toString());
    const signature = this._devicePrivateKey.sign(hash);

    console.log("signature", signature);

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
    const sessionKey = this._devicePrivateKey.decrypt(signedLicense.sessionKey.toString());
    console.log(sessionKey);

    const cmac = new AES_CMAC(Buffer.from(sessionKey));

    const encKeyBase = `ENCRYPTION\x00${this._rawLicenseRequest}\x00\x00\x00\x80`;
    const authKeyBase = `AUTHENTICATION\x00${this._rawLicenseRequest}\x00\x00\x02\x00`;

    const encKey = cmac.calculate(Buffer.from(`\x01${encKeyBase}`));
    const authKey1 = cmac.calculate(Buffer.from(`\x01${authKeyBase}`));
    const authKey2 = cmac.calculate(Buffer.from(`\x02${authKeyBase}`));
    const authKey3 = cmac.calculate(Buffer.from(`\x03${authKeyBase}`));
    const authKey4 = cmac.calculate(Buffer.from(`\x04${authKeyBase}`));

    const hmac = forge.hmac.create();
    hmac.start("sha256", `${authKey1.toString()}${authKey2.toString()}`);
    hmac.update(signedLicense.msg.toString());
    const calculatedSignature = hmac.digest().toHex();

    console.log("calc, received", calculatedSignature, signedLicense.msg.toString("hex"));

    if (calculatedSignature !== signedLicense.msg.toString("hex")) {
      throw new Error("Signatures do not match!");
    }

    const license = License.decode(signedLicense.msg);

    for (const keyContainer of license.key) {
      const keyId = keyContainer.id.length ? keyContainer.id.toString() : keyContainer.type.toString();
      const decipher = forge.cipher.createDecipher("AES-CBC", forge.util.createBuffer(encKey));
      decipher.start({ iv: forge.util.createBuffer(keyContainer.iv) });
      decipher.update(forge.util.createBuffer(keyContainer.key));
      decipher.finish();
      const decryptedKey = Buffer.from(decipher.output.toHex(), "hex");
      const key: Key = {
        kid: keyId,
        key: decryptedKey.toString()
      };
      console.log(`${keyId}:${decryptedKey.toString()}`, key, decryptedKey.toString("hex"));
    }
  }

  parsePSSH(pssh: Buffer): WidevinePsshData | null {
    try {
      return WidevinePsshData.decode(pssh.subarray(32));
    } catch {
      return null;
    }
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
