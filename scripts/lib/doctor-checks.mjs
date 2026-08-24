// Pure, side-effect-free predicates used by scripts/doctor.mjs (Phase 008).
// Kept free of any I/O so the local-experience checks are unit-testable on
// every platform via node:test.
import process from "node:process";

const NODE_MINIMUM_MAJOR = 20;

function parseVersionParts(version) {
  const match = /^v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(String(version).trim());
  if (!match) return null;
  return [
    Number(match[1]),
    Number(match[2] ?? 0),
    Number(match[3] ?? 0),
  ];
}

export function nodeSatisfiesEngines(version = process.version) {
  const parts = parseVersionParts(version);
  if (!parts) return false;
  const minimum = [NODE_MINIMUM_MAJOR, 0, 0];
  for (let i = 0; i < 3; i += 1) {
    if (parts[i] !== minimum[i]) return parts[i] > minimum[i];
  }
  return true;
}

export function phpVersionAtLeast(actual, major, minor) {
  const parts = parseVersionParts(actual);
  if (!parts) return false;
  if (parts[0] !== major) return parts[0] > major;
  return parts[1] >= minor;
}

export function parsePhpModules(rawOutput) {
  return new Set(
    String(rawOutput)
      .split(/\r?\n/)
      .map((line) => line.trim().toLowerCase())
      .filter((line) => /^[a-z0-9_]+$/.test(line)),
  );
}

export function missingPhpExtensions(modules, required) {
  const normalized = modules instanceof Set ? modules : parsePhpModules(modules);
  return required
    .map((name) => name.toLowerCase())
    .filter((name) => !normalized.has(name));
}

export function summarizeDoctorResults(results) {
  const failures = results.filter((r) => r.severity === "error" && !r.ok);
  const advisories = results.filter(
    (r) => r.severity === "info" && !r.ok && r.hint,
  );
  return {
    ok: failures.length === 0,
    failures,
    advisories,
  };
}
