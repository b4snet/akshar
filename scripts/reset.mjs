#!/usr/bin/env node
// AKSHAR reset (Phase 004): removes generated artifacts and reinstalls from
// lockfiles. Never touches source, docs, or lockfiles themselves.
import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import process from "node:process";

const root = process.cwd();
for (const p of [
  join(root, "frontend", "node_modules"),
  join(root, "frontend", "dist"),
  join(root, "frontend", "coverage"),
  join(root, "backend", "vendor"),
]) {
  console.log(`reset: removing ${p}`);
  rmSync(p, { recursive: true, force: true });
}

console.log("reset: reinstalling from lockfiles via setup");
const res = spawnSync(process.execPath, [join("scripts", "setup.mjs")], {
  stdio: "inherit",
});
process.exit(res.status ?? 1);
