#!/usr/bin/env node
// AKSHAR parallel dev stack (Phase 008): runs the Laravel API and the Vite
// dev server in one terminal with prefixed, interleaved output. A Ctrl-C or a
// failing child tears down BOTH processes; the exit code is the first child
// failure (or 130 on interrupt). No shells are spawned between node and the
// actual servers, so signals reach real process trees on every platform.
import { spawn, spawnSync } from "node:child_process";
import { join } from "node:path";
import process from "node:process";

const root = process.cwd();
const API_URL = "http://127.0.0.1:8000";

// Vite is launched directly through the current Node binary instead of
// `npm run dev`: .cmd shims are blocked without a shell on modern Node
// (post-CVE hardening), and skipping the npm wrapper keeps signal handling
// inside one real process tree.
const viteEntry = join(root, "frontend", "node_modules", "vite", "bin", "vite.js");

const children = [
  {
    tag: "api",
    label: `Laravel API (${API_URL}, health: ${API_URL}/api/v1/health)`,
    command: "php",
    args: ["artisan", "serve", "--host=127.0.0.1", "--port=8000"],
    cwd: join(root, "backend"),
  },
  {
    tag: "web",
    label: "Vite dev server (http://127.0.0.1:5173)",
    command: process.execPath,
    args: [viteEntry],
    cwd: join(root, "frontend"),
  },
];

function pipeTagged(child, stream, tag) {
  let pending = "";
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    pending += chunk;
    const lines = pending.split(/\r?\n/);
    pending = lines.pop() ?? "";
    for (const line of lines) {
      if (line.length > 0) process.stdout.write(`[${tag}] ${line}\n`);
    }
  });
  child.on("close", () => {
    if (pending.length > 0) process.stdout.write(`[${tag}] ${pending}\n`);
  });
}

function killTree(child) {
  if (child.killed || child.exitCode !== null) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], { stdio: "ignore" });
  } else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }
  }
}

let shuttingDown = false;
function shutdown(exitCode) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of running) killTree(child);
  setTimeout(() => process.exit(exitCode), 150);
}

const running = [];
for (const spec of children) {
  const child = spawn(spec.command, spec.args, {
    cwd: spec.cwd,
    windowsHide: true,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  running.push(child);
  console.log(`dev: starting ${spec.label}`);
  pipeTagged(child, child.stdout, spec.tag);
  pipeTagged(child, child.stderr, spec.tag);
  child.on("error", (err) => {
    console.error(`dev: failed to launch ${spec.tag}: ${err.message}`);
    shutdown(2);
  });
  child.on("close", (code, signal) => {
    if (shuttingDown) return;
    console.log(`dev: ${spec.tag} exited (${signal ?? code})`);
    shutdown(code === null ? 130 : code);
  });
}

process.on("SIGINT", () => shutdown(130));
process.on("SIGTERM", () => shutdown(143));

console.log(`dev: press Ctrl-C to stop both servers`);
