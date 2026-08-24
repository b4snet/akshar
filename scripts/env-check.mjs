#!/usr/bin/env node
// AKSHAR environment contract check (Phase 006).
// Validates every committed environment template against
// scripts/env-contract.mjs. Never prints values — only variable names.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { CONTRACT, validateTemplate } from "./env-contract.mjs";

const root = process.cwd();
let failed = false;

for (const template of CONTRACT) {
  const path = join(root, template.file);
  if (!existsSync(path)) {
    console.error(`env:check FAIL ${template.file}: missing template`);
    failed = true;
    continue;
  }
  const result = validateTemplate({ ...template, content: readFileSync(path, "utf8") });
  if (result.ok) {
    console.log(`env:check OK   ${template.file} (${template.description})`);
  } else {
    failed = true;
    for (const error of result.errors) {
      console.error(`env:check FAIL ${error}`);
    }
  }
}

if (failed) process.exit(1);
