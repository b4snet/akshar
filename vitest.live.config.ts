import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const resolvePath = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));

// Config for MANUAL live tests only (real provider network calls):
//   npx vitest run --config vitest.live.config.ts
// These are excluded from `npm test` so normal runs stay offline/mocked.
export default defineConfig({
  resolve: {
    alias: {
      "server-only": resolvePath("./tests/server-only-stub.ts"),
      "@": resolvePath("./src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.manual.test.ts"],
    testTimeout: 60_000,
  },
});
