import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  fullyParallel: true,
  outputDir: "test-results",
  use: {
    baseURL: "http://localhost:3000", // only used for UI/browser tests
    headless: true,
  },
  webServer: {
    command: "pnpm dev",
    port: 3000,
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
