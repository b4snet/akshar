#!/usr/bin/env node
// AKSHAR local-environment doctor (Phase 008): verifies the developer toolchain
// against the repository contract and prints actionable hints for everything
// that is optional or not yet running. Toolchain gaps exit non-zero; service
// availability is advisory only (services arrive via `npm run db:up`).
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { connect } from "node:net";
import { join } from "node:path";
import process from "node:process";
import {
  missingPhpExtensions,
  nodeSatisfiesEngines,
  phpVersionAtLeast,
  summarizeDoctorResults,
} from "./lib/doctor-checks.mjs";

const root = process.cwd();
const REQUIRED_PHP_EXTENSIONS = ["mbstring", "openssl", "pdo_pgsql"];
const SERVICES = [
  { label: "PostgreSQL 17", port: 5432, hint: "npm run db:up" },
  { label: "Redis 7", port: 6379, hint: "npm run db:up" },
];

function probeTcp(port, host = "127.0.0.1", timeoutMs = 750) {
  return new Promise((resolve) => {
    const socket = connect(port, host);
    const settle = (result) => {
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => settle(true));
    socket.once("timeout", () => settle(false));
    socket.once("error", () => settle(false));
  });
}

async function main() {
  const results = [];
  const add = (name, ok, severity, detail = "", hint = "") =>
    results.push({ name, ok, severity, detail, hint });

  // Node.js
  const nodeOk = nodeSatisfiesEngines(process.version);
  add(
    "Node.js >= 20",
    nodeOk,
    "error",
    `running ${process.version}`,
    nodeOk ? "" : "install Node.js 20 LTS or newer",
  );

  // PHP binary + version + extensions
  const phpVersion = spawnSync("php", ["-v"], { encoding: "utf8" });
  if (phpVersion.error || phpVersion.status !== 0) {
    add("PHP >= 8.4", false, "error", "php not found on PATH", "install PHP 8.4 with mbstring, openssl, pdo_pgsql");
  } else {
    const versionLine = String(phpVersion.stdout).split(/\r?\n/)[0] ?? "";
    const versionToken = versionLine.split(/\s+/)[1] ?? "";
    const phpOk = phpVersionAtLeast(versionToken, 8, 4);
    add("PHP >= 8.4", phpOk, "error", versionLine.trim(), phpOk ? "" : "install PHP 8.4 or newer");

    const modulesRaw = spawnSync("php", ["-m"], { encoding: "utf8" });
    if (modulesRaw.error || modulesRaw.status !== 0) {
      add("PHP extensions", false, "error", "php -m failed");
    } else {
      const missing = missingPhpExtensions(modulesRaw.stdout, REQUIRED_PHP_EXTENSIONS);
      add(
        `PHP extensions (${REQUIRED_PHP_EXTENSIONS.join(", ")})`,
        missing.length === 0,
        "error",
        missing.length === 0 ? "all present" : `missing: ${missing.join(", ")}`,
        missing.length === 0 ? "" : "enable the listed extensions in php.ini",
      );
    }
  }

function shellProbe(command) {
  // String form avoids Node's DEP0190 (args concatenated into a shell line).
  return spawnSync(command, { encoding: "utf8", shell: true });
}

// Composer (phar preferred, global fallback)
const phar = join(root, "tools", "composer.phar");
let composerOk = false;
let composerDetail = "";
if (existsSync(phar)) {
  const probe = spawnSync("php", [phar, "--version"], { encoding: "utf8" });
  composerOk = !probe.error && probe.status === 0;
  composerDetail = composerOk ? "tools/composer.phar usable" : "phar present but not executable";
}
if (!composerOk) {
  const globalProbe = shellProbe("composer --version");
  composerOk = !globalProbe.error && globalProbe.status === 0;
  composerDetail = composerOk ? "global composer found" : composerDetail || "no phar and no global composer";
}
  add(
    "Composer",
    composerOk,
    composerOk ? "info" : "error",
    composerDetail,
    composerOk ? "" : "run `npm run setup` to download tools/composer.phar (network required)",
  );

  // Docker — advisory: only needed for npm run db:up
  const dockerProbe = shellProbe("docker --version");
  const dockerOk = !dockerProbe.error && dockerProbe.status === 0;
  add(
    "Docker (for db:up only)",
    dockerOk,
    "info",
    dockerOk ? String(dockerProbe.stdout).trim() : "not detected",
    dockerOk ? "" : "install Docker Desktop to use npm run db:up (optional until database-backed local work)",
  );

  // backend/.env guidance
  const envExists = existsSync(join(root, "backend", ".env"));
  add(
    "backend/.env present",
    envExists,
    "info",
    envExists ? "found" : "missing",
    envExists ? "" : "copy backend/.env.example to backend/.env and run `php backend/artisan key:generate`",
  );

  // Service reachability — advisory
  for (const service of SERVICES) {
    const reachable = await probeTcp(service.port);
    add(
      `${service.label} reachable`,
      reachable,
      "info",
      reachable ? `127.0.0.1:${service.port} accepting connections` : `nothing listening on 127.0.0.1:${service.port}`,
      reachable ? "" : `start services with \`${service.hint}\` (requires Docker)`,
    );
  }

  console.log("doctor: local environment report");
  for (const r of results) {
    const mark = r.ok ? "ok  " : r.severity === "error" ? "FAIL" : "warn";
    const suffix = r.detail ? ` — ${r.detail}` : "";
    console.log(`doctor:   [${mark}] ${r.name}${suffix}`);
    if (!r.ok && r.hint) console.log(`doctor:          hint: ${r.hint}`);
  }

  const summary = summarizeDoctorResults(results);
  if (!summary.ok) {
    for (const failure of summary.failures) {
      console.error(`doctor: toolchain problem: ${failure.name} (${failure.detail})`);
    }
    process.exit(1);
  }
  console.log("doctor: toolchain satisfies the repository contract");
  process.exit(0);
}

main();
