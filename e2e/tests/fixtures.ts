import { test as base, Page } from "@playwright/test";

export const test = base.extend<{
  authenticatedPage: Page;
  userId: string;
}>({
  authenticatedPage: async ({ page, context }, use) => {
    const res = await page.request.get("http://localhost:3000/api/test_login");
    const jsonText = await res.text();

    console.log("DEBUG: /api/test_login response:", jsonText);

    const parsed = JSON.parse(jsonText);
    const cookieString = parsed.cookie;

    const [name, ...rest] = cookieString.split("=");
    const rawValue = rest.join("="); // Handles "=" in JWT
    const value = rawValue.split(";")[0]; // Remove "; Path=...", etc.

    await context.addCookies([
      {
        name,
        value,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      },
    ]);

    await use(page);
  },

  userId: async ({ page }, use) => {
    const res = await page.request.get("http://localhost:3000/api/test_login");
    const json = await res.json();
    await use(json.userId);
  },
});
