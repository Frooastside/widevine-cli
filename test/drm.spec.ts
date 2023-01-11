import { equal, ok } from "assert";
import { existsSync } from "fs";
import { describe } from "mocha";
import DrmSolver from "../dist/drm.js";
import { Config } from "../dist/index.js";

const pssh = Buffer.from(
  "AAAAW3Bzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAADsIARIQ62dqu8s0Xpa7z2FmMPGj2hoNd2lkZXZpbmVfdGVzdCIQZmtqM2xqYVNkZmFsa3IzaioCSEQyAA==",
  "base64"
);
const licenseUrl = "https://cwip-shaka-proxy.appspot.com/no_auth";

describe("DRM Solver Tests", () => {
  if (existsSync("./security/device_private_key") && existsSync("./security/device_client_id_blob")) {
    it("Should return a list of keys using the local content decryption module", async () => {
      const config: Config = { onlyDrm: true, forceLocalDrm: true };
      const solver = new DrmSolver(config);

      const keys = await solver.solveDrm({ url: licenseUrl, pssh: pssh });

      ok(keys.length > 1, "List of keys is empty!");
      const firstKey = keys.find((key) => key.kid === "ccbf5fb4c2965be7aa130ffb3ba9fd73");
      ok(firstKey, "key with id 'ccbf5fb4c2965be7aa130ffb3ba9fd73' was expected but not found");
      equal(firstKey.key, "9cc0c92044cb1d69433f5f5839a159df", "key of id 'ccbf5fb4c2965be7aa130ffb3ba9fd73' is not correct!");

      const secondKey = keys.find((key) => key.kid === "9bf0e9cf0d7b55aeb4b289a63bab8610");
      ok(secondKey, "key with id '9bf0e9cf0d7b55aeb4b289a63bab8610' was expected but not found");
      equal(secondKey.key, "90f52fd8ca48717b21d0c2fed7a12ae1", "key of id '9bf0e9cf0d7b55aeb4b289a63bab8610' is not correct!");

      const thirdKey = keys.find((key) => key.kid === "eb676abbcb345e96bbcf616630f1a3da");
      ok(thirdKey, "key with id 'eb676abbcb345e96bbcf616630f1a3da' was expected but not found");
      equal(thirdKey.key, "100b6c20940f779a4589152b57d2dacb", "key of id 'eb676abbcb345e96bbcf616630f1a3da' is not correct!");

      const fourthKey = keys.find((key) => key.kid === "0294b9599d755de2bbf0fdca3fa5eab7");
      ok(fourthKey, "key with id '0294b9599d755de2bbf0fdca3fa5eab7' was expected but not found");
      equal(fourthKey.key, "3bda2f40344c7def614227b9c0f03e26", "key of id '0294b9599d755de2bbf0fdca3fa5eab7' is not correct!");

      const fifthKey = keys.find((key) => key.kid === "639da80cf23b55f3b8cab3f64cfa5df6");
      ok(fifthKey, "key with id '639da80cf23b55f3b8cab3f64cfa5df6' was expected but not found");
      equal(fifthKey.key, "229f5f29b643e203004b30c4eaf348f4", "key of id '639da80cf23b55f3b8cab3f64cfa5df6' is not correct!");
    });
  } else {
    console.warn("skip local tests because content decryption module files were not found");
  }
  it("Should return a list of keys using the remote content decryption module", async () => {
    const config: Config = { onlyDrm: true, forceRemoteDrm: true };
    const solver = new DrmSolver(config);

    const keys = await solver.solveDrm({ url: licenseUrl, pssh: pssh });

    ok(keys.length > 1, "List of keys is empty!");
    const firstKey = keys.find((key) => key.kid === "ccbf5fb4c2965be7aa130ffb3ba9fd73");
    ok(firstKey, "key with id 'ccbf5fb4c2965be7aa130ffb3ba9fd73' was expected but not found");
    equal(firstKey.key, "9cc0c92044cb1d69433f5f5839a159df", "key of id 'ccbf5fb4c2965be7aa130ffb3ba9fd73' is not correct!");

    const secondKey = keys.find((key) => key.kid === "9bf0e9cf0d7b55aeb4b289a63bab8610");
    ok(secondKey, "key with id '9bf0e9cf0d7b55aeb4b289a63bab8610' was expected but not found");
    equal(secondKey.key, "90f52fd8ca48717b21d0c2fed7a12ae1", "key of id '9bf0e9cf0d7b55aeb4b289a63bab8610' is not correct!");

    const thirdKey = keys.find((key) => key.kid === "eb676abbcb345e96bbcf616630f1a3da");
    ok(thirdKey, "key with id 'eb676abbcb345e96bbcf616630f1a3da' was expected but not found");
    equal(thirdKey.key, "100b6c20940f779a4589152b57d2dacb", "key of id 'eb676abbcb345e96bbcf616630f1a3da' is not correct!");

    const fourthKey = keys.find((key) => key.kid === "0294b9599d755de2bbf0fdca3fa5eab7");
    ok(fourthKey, "key with id '0294b9599d755de2bbf0fdca3fa5eab7' was expected but not found");
    equal(fourthKey.key, "3bda2f40344c7def614227b9c0f03e26", "key of id '0294b9599d755de2bbf0fdca3fa5eab7' is not correct!");

    const fifthKey = keys.find((key) => key.kid === "639da80cf23b55f3b8cab3f64cfa5df6");
    ok(fifthKey, "key with id '639da80cf23b55f3b8cab3f64cfa5df6' was expected but not found");
    equal(fifthKey.key, "229f5f29b643e203004b30c4eaf348f4", "key of id '639da80cf23b55f3b8cab3f64cfa5df6' is not correct!");
  });
});
