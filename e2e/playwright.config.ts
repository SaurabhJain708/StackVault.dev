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
    command: "bash ./test-start.sh",
    timeout: 300 * 1000,
    reuseExistingServer: false,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      NODE_ENV: process.env.CI
        ? "development"
        : process.env.NODE_ENV || "development",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
      DATABASE_URL: process.env.DATABASE_URL || "",
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    },
  },
});
