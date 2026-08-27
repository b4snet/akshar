#!/usr/bin/env node
// AKSHAR artifact/debug sweep gate (Phase 009, MASTER_RULES §10 discipline).
// Formalizes the debug-artifact scans previously performed manually per phase:
// detects accidental debug probes and temporary/stray artifacts among GIT-TRACKED
// files (untracked local junk is a developer-machine concern, not a repository
// state concern — scanning tracked files keeps the result deterministic in CI).
// Exit 0 = clean, 1 = artifacts found.
//
// Content rules apply ONLY to source code files (.php, .js, .mjs, .ts, .tsx,
// .jsx, .vue). Documentation that mentions rule pattern strings (e.g., an
// incident record naming `var_dump(`) is legitimate and must not trigger.
// Filename rules apply to all tracked files.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import process from "node:process";

// Filename rules. `.env.example` / `*.example` templates are legitimate;
// a real `.env`, probe files, editor leftovers and logs are not.
const FILENAME_RULES = [
  { name: "probe/temp file", re: /(^|\/)_probe_/i },
  { name: "stray .env tracked", re: /(^|\/)\.env$/ },
  { name: "editor leftover", re: /\.(orig|rej|bak)$/i },
  { name: "dump artifact", re: /\.(dump|sql\.gz)$/i },
  { name: "OS metadata file", re: /(^|\/)(\.DS_Store|Thumbs\.db)$/i },
  { name: "log file tracked", re: /\.log$/i },
];

// Content rules — source-code-only. `dd(` is flagged only as a Laravel debug
// dump with a literal argument (not `add(` etc.). console.log in tooling/tests
// is NOT flagged: it is legitimate CLI output.
const CONTENT_RULES = [
  { name: "var_dump(", re: /\bvar_dump\s*\(/ },
  { name: "print_r(", re: /\bprint_r\s*\(/ },
  { name: "console.debug(", re: /\bconsole\.debug\s*\(/ },
  { name: "debugger statement", re: /^\s*debugger\s*;?\s*$/ },
  { name: "dd('...') debug dump", re: /(^|[^\w])dd\(\s*['"]/ },
];

// Only apply content rules to source code; documentation mentioning rule names
// is legitimate and never constitutes an artifact.
const SOURCE_CODE_EXTENSIONS = new Set([
  ".php", ".js", ".mjs", ".ts", ".tsx", ".jsx", ".vue",
]);

// The file containing the rules itself contains pattern strings as source
// code; it must not self-match. No other source file legitimately contains
// these patterns (documentation files are excluded by extension).
const CONTENT_SKIP_FILES = new Set([
  "scripts/artifact-scan.mjs",
]);

const TEXT_EXT_SKIP = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp", ".woff", ".woff2",
  ".ttf", ".eot", ".pdf", ".zip", ".gz", ".phar", ".lock",
]);

const git = spawnSync("git", ["ls-files", "-z"], {
  cwd: process.cwd(),
  encoding: "utf8",
  shell: process.platform === "win32",
  maxBuffer: 64 * 1024 * 1024,
});
if (git.error || git.status !== 0) {
  console.error("artifact scan: failed to enumerate tracked files via git ls-files");
  if (git.stderr) console.error(git.stderr);
  process.exit(2);
}

const findings = [];
for (const rel of git.stdout.split("\0")) {
  if (!rel) continue;
  const normalized = rel.replaceAll("\\", "/");

  for (const rule of FILENAME_RULES) {
    if (rule.re.test(normalized)) {
      findings.push(`${normalized}  [${rule.name}]`);
    }
  }

  const ext = normalized.slice(normalized.lastIndexOf(".")).toLowerCase();
  if (TEXT_EXT_SKIP.has(ext)) continue;
  if (!SOURCE_CODE_EXTENSIONS.has(ext)) continue;
  if (CONTENT_SKIP_FILES.has(normalized)) continue;

  let content;
  try {
    content = readFileSync(normalized, "utf8");
  } catch {
    continue;
  }
  const lines = content.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const rule of CONTENT_RULES) {
      if (rule.re.test(line)) {
        findings.push(`${normalized}:${i + 1}  [${rule.name}]`);
      }
    }
  });
}

if (findings.length > 0) {
  console.error("ARTIFACT SCAN FAILED — review the following:");
  for (const f of findings) console.error(`  ${f}`);
  console.error("If a finding is legitimate, adjust the rules in scripts/artifact-scan.mjs with documented rationale.");
  process.exit(1);
}
console.log("artifact scan: clean");
