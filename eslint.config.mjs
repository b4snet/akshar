import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Development/build-time utility scripts (not part of production bundle):
    "*.js",
    "scripts/**",
    "check-subjects.js",
    "debug-lessons.js",
    "fix-clipped.js",
    "fix-running.js",
    "run-migration.bat",
  ]),
]);

export default eslintConfig;
