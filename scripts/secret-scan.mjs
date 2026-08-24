#!/usr/bin/env node
// AKSHAR secret scan (Phase 004 gate).
// Scans repository text files for common credential patterns.
// Exit code 0 = clean, 1 = potential secret found.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  ".git", "node_modules", "vendor", "dist", "coverage", "tools",
  ".idea", ".vscode", "logs",
]);
const SKIP_FILES = new Set([
  "package-lock.json", "composer.lock", "yarn.lock", "pnpm-lock.yaml",
]);
const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp", ".woff", ".woff2",
  ".ttf", ".eot", ".pdf", ".zip", ".gz", ".phar",
]);

const PATTERNS = [
  { name: "AWS access key id", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "private key block", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: "GitHub token", re: /\b(ghp|gho|ghu|ghs)_[A-Za-z0-9]{36,}\b|\bgithub_pat_[A-Za-z0-9_]{22,}\b/ },
  { name: "Slack token", re: /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/ },
  {
    name: "hard-coded secret assignment",
    re: /(?:api[_-]?key|secret|passwd|password|token|auth)\s*[:=]\s*["'][^"']{8,}["']/gi,
    // ignore obvious non-secrets: empty-ish, placeholder, template or env lookups
    allow: (line) =>
      /(?:placeholder|example|changeme|change-me|xxx+|\$\{|process\.env|import\.meta\.env|env\(|YOUR_|<[^>]*>)/i.test(line),
  },
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) yield* walk(full);
    } else {
      yield full;
    }
  }
}

const findings = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  const base = rel.split("/").pop();
  if (SKIP_FILES.has(base)) continue;
  if (BINARY_EXT.has(base.slice(base.lastIndexOf(".")).toLowerCase())) continue;
  let content;
  try { content = readFileSync(file, "utf8"); } catch { continue; }
  const lines = content.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const p of PATTERNS) {
      p.re.lastIndex = 0;
      const m = p.re.exec(line);
      if (m && !(p.allow && p.allow(line))) {
        findings.push(`${rel}:${i + 1}  [${p.name}]`);
      }
    }
  });
}

if (findings.length) {
  console.error("SECRET SCAN FAILED — review the following:");
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}
console.log("secret scan: clean");
