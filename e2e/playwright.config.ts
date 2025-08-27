import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve("./global-setup"),
  globalTeardown: require.resolve("./global-teardown"),
  timeout: 30 * 1000,
  fullyParallel: true,
  outputDir: "test-results",
  use: {
    baseURL: "http://localhost:3000", // only used for UI/browser tests
    headless: true,
  },
  webServer: {
    command: " ",
    timeout: 240 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
