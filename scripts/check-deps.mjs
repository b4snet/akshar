#!/usr/bin/env node
// AKSHAR dependency validation gate (Phase 009).
// Verifies installed dependencies exist locally without touching the network.
// Exit 0 = dependencies present, 1 = missing (with remediation hint).
// Composer availability itself (phar vs global) is resolved by
// scripts/run-backend.mjs at gate time and diagnosed by `npm run doctor`.
import { existsSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const REQUIREMENTS = [
  {
    label: "backend vendor autoload",
    path: join(ROOT, "backend", "vendor", "autoload.php"),
    hint: "run `npm run setup` (installs backend composer dependencies)",
  },
  {
    label: "backend Pint binary",
    path: join(ROOT, "backend", "vendor", "bin", "pint"),
    hint: "run `npm run setup` (installs backend dev tools)",
  },
  {
    label: "frontend node_modules",
    path: join(ROOT, "frontend", "node_modules", ".package-lock.json"),
    hint: "run `npm run setup` or `npm ci --prefix frontend`",
  },
];

const missing = REQUIREMENTS.filter((r) => !existsSync(r.path));

if (missing.length > 0) {
  console.error("DEPENDENCY CHECK FAILED — missing:");
  for (const m of missing) {
    console.error(`  - ${m.label}`);
    console.error(`    fix: ${m.hint}`);
  }
  process.exit(1);
}
console.log("dependency check: ok (backend vendor, pint, frontend node_modules)");
