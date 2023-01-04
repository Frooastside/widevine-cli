import { execSync } from "child_process";
import { existsSync } from "fs";
import { exit } from "process";

if (!existsSync("dist")) {
  execSync("pnpm build");
}

try {
  await (await import("./dist/install.js")).installDependencies();
} catch (error) {
  console.error(error);
  exit(1);
}

exit(0);
