#!/usr/bin/env node
// Runs a composer script in backend/ using the local phar when available,
// falling back to a global composer. Exposes Phase 004 backend commands on
// any developer machine without requiring global installs.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const cmd = process.argv[2];
if (!cmd) {
  console.error("usage: node scripts/run-backend.mjs <composer-script>");
  process.exit(2);
}

const root = process.cwd();
const phar = join(root, "tools", "composer.phar");
const usePhar = existsSync(phar);
const base = usePhar
  ? { cmd: "php", args: [phar] }
  : { cmd: "composer", args: [] };

const res = spawnSync(base.cmd, [...base.args, cmd, "--working-dir=backend"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (res.error) {
  console.error(`run-backend: failed to launch ${base.cmd}: ${res.error.message}`);
  if (!usePhar) {
    console.error("hint: run `npm run setup` to download tools/composer.phar, or install composer globally.");
  }
  process.exit(2);
}
process.exit(res.status ?? 1);
