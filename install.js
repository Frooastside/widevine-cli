import { execSync } from "child_process";
import { existsSync } from "fs";
import { exit } from "process";

if (!existsSync("dist")) {
  execSync("bun run build");
}

try {
  const installer = await import("./dist/install.js");
  await installer.installDependencies();
} catch (error) {
  console.error(error);
  exit(1);
}

exit(0);
