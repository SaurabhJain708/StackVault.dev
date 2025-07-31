import { test } from "../fixtures";
import { expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test("PATCH /api/private/user should update user", async ({
  authenticatedPage,
}) => {
  const date = new Date();

  const res = await authenticatedPage.request.patch(
    `${baseURL}/api/private/user`,
    {
      data: {
        user: {
          name: `Playwright User ${date.toISOString()}`,
          bio: "Updated via test",
          location: "Test City",
          available: true,
          age: 20,
          languages: ["English", "Hindi"],
          causes: ["Open Source", "Education"],
        },
      },
    },
  );
  expect(res.status()).toBe(200);
  const message = await res.text();
  expect(message).toBe("User updated successfully");
});

test("PATCH /api/private/user should return 400 if user object missing", async ({
  authenticatedPage,
}) => {
  const res = await authenticatedPage.request.patch(
    `${baseURL}/api/private/user`,
    {
      data: {},
    },
  );

  expect(res.status()).toBe(400);
  const message = await res.text();
  expect(message).toBe("Please provide user data");
});

test("PATCH /api/private/user should return 400 on invalid data", async ({
  authenticatedPage,
}) => {
  const res = await authenticatedPage.request.patch(
    `${baseURL}/api/private/user`,
    {
      data: {
        user: {
          name: 123, // invalid type
          age: "twenty", // invalid type
        },
      },
    },
  );

  expect(res.status()).toBe(400);
  const text = await res.text();
  expect(text).toContain("Invalid user data");
});
