import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const resolvePath = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // `server-only` throws when imported outside a React Server environment;
      // unit tests run in plain node, so stub it out.
      "server-only": resolvePath("./tests/server-only-stub.ts"),
      "@": resolvePath("./src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // Live-network tests run only via vitest.live.config.ts.
    exclude: ["**/node_modules/**", "**/.git/**", "tests/**/*.manual.test.ts"],
  },
});
