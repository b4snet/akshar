#!/usr/bin/env node
// AKSHAR migration runner with preflight (Phase 008): fails fast with an
// actionable message when PostgreSQL is not reachable instead of surfacing a
// raw PDO driver error, then delegates to `php artisan migrate --force`.
import { spawn } from "node:child_process";
import { connect } from "node:net";
import { join } from "node:path";
import process from "node:process";

const root = process.cwd();

function probeTcp(port, host = "127.0.0.1", timeoutMs = 1000) {
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

const reachable = await probeTcp(5432);
if (!reachable) {
  console.error("db:migrate: PostgreSQL is not reachable on 127.0.0.1:5432.");
  console.error("db:migrate: start the local stack first: npm run db:up (requires Docker).");
  console.error("db:migrate: see infrastructure/README.md for the service topology.");
  process.exit(1);
}

const child = spawn(
  "php",
  ["artisan", "migrate", "--force"],
  { cwd: join(root, "backend"), stdio: "inherit", windowsHide: true },
);

child.on("close", (code) => process.exit(code ?? 1));

child.on("error", (err) => {
  console.error(`db:migrate: failed to launch php: ${err.message}`);
  process.exit(2);
});
