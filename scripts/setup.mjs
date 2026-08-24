#!/usr/bin/env node
// AKSHAR one-shot local setup (Phase 004):
//  1. npm ci in frontend/ (lockfile-driven)
//  2. composer install in backend/ via tools/composer.phar (downloaded if missing)
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createWriteStream } from "node:fs";
import { get } from "node:https";
import { join } from "node:path";
import process from "node:process";

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32", ...opts });
  return res.status ?? 1;
}

function downloadComposer(dest) {
  return new Promise((resolve) => {
    mkdirSync(join(process.cwd(), "tools"), { recursive: true });
    console.log("setup: downloading tools/composer.phar ...");
    const file = createWriteStream(dest);
    get("https://getcomposer.org/download/latest-stable/composer.phar", (res) => {
      if (res.statusCode !== 200 && res.statusCode !== 302) {
        console.error(`setup: composer download failed (HTTP ${res.statusCode})`);
        resolve(false);
        return;
      }
      if (res.statusCode === 302 && res.headers.location) {
        file.close();
        get(res.headers.location, (r2) => {
          if (r2.statusCode !== 200) { console.error("setup: redirect download failed"); resolve(false); return; }
          r2.pipe(file).on("finish", () => resolve(true));
        });
        return;
      }
      res.pipe(file).on("finish", () => resolve(true));
    }).on("error", (e) => { console.error(`setup: ${e.message}`); resolve(false); });
  });
}

const root = process.cwd();

// 1. frontend
if (!existsSync(join(root, "frontend", "package.json"))) {
  console.error("setup: frontend/package.json missing — repository incomplete?");
  process.exit(1);
}
let code = run("npm", ["ci", "--prefix", "frontend"]);
if (code !== 0 && !existsSync(join(root, "frontend", "package-lock.json"))) {
  console.log("setup: no lockfile yet — running npm install instead");
  code = run("npm", ["install", "--prefix", "frontend"]);
}
if (code !== 0) process.exit(code);

// 2. backend
const phar = join(root, "tools", "composer.phar");
if (!existsSync(phar)) {
  const ok = await downloadComposer(phar);
  if (!ok) {
    // Evidence discipline (MASTER_RULES §10): setup must never report success
    // when the backend install did not run. Fail loudly with remediation.
    console.error("setup: could not download tools/composer.phar — backend dependencies NOT installed.");
    console.error("setup: fix network access or install Composer globally, then re-run `npm run setup`.");
    process.exit(1);
  }
}
code = run("php", [phar, "install", "--working-dir=backend"]);
if (code !== 0) {
  console.error("setup: `composer install` failed — see output above; resolve and re-run `npm run setup`.");
}
process.exit(code);
