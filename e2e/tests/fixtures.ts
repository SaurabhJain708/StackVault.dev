import { test as base, Page } from "@playwright/test";

type TestUserData = {
  userId: string;
  cookie: string;
  skills: { id: string }[];
  certs: { id: string }[];
  educations: { id: string }[];
  experiences: { id: string }[];
  projects: { id: string }[];
  socialLinks: { id: string }[];
};
export const test = base.extend<{
  authenticatedPage: Page;
  userId: string;
  testUserData: TestUserData;
}>({
  authenticatedPage: async ({ page, context }, use) => {
    const res = await page.request.get("http://localhost:3000/api/test_login");
    const jsonText = await res.text();

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
    (page as any)._testUserData = parsed;

    await use(page);
  },

  userId: async ({ authenticatedPage }, use) => {
    const userId = (authenticatedPage as any)._testUserData?.userId;
    if (!userId) throw new Error("userId not found");
    await use(userId);
  },
  testUserData: async ({ authenticatedPage }, use) => {
    const data = (authenticatedPage as any)._testUserData as TestUserData;
    await use(data);
  },
});
