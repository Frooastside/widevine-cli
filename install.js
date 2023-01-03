import { execSync } from "child_process";
import { existsSync } from "fs";

if (!existsSync("dist")) {
  execSync("pnpm build");
}

await (await import("./dist/install.js")).installDependencies();
