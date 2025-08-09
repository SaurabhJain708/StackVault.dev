import { test } from "../fixtures";
import { expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test("POST /api/private/socialLink should add a social link", async ({
  authenticatedPage,
  userId,
}) => {
  const timestamp = Date.now();

  const res = await authenticatedPage.request.post(
    `${baseURL}/api/private/socialLink`,
    {
      data: {
        link: {
          platform: `Test Platform `,
          url: `https://example.com/${timestamp}`,
        },
      },
    },
  );
  expect(res.status()).toBe(201);
  const text = await res.text();
  expect(text).toBe("Social link added successfully");
});

test("GET /api/private/socialLink should return social links for user", async ({
  authenticatedPage,
  userId,
}) => {
  const res = await authenticatedPage.request.get(
    `${baseURL}/api/private/socialLink?userid=${userId}`,
  );

  expect(res.status()).toBe(200);

  const links = await res.json();
  expect(Array.isArray(links)).toBe(true);

  if (links.length > 0) {
    expect(links[0]).toHaveProperty("platform");
    expect(links[0]).toHaveProperty("url");
  }
});

test("DELETE /api/private/socialLink should delete a social link", async ({
  authenticatedPage,
  userId,
}) => {
  const timestamp = Date.now();

  // Step 1: Create a link to delete
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/socialLink`,
    {
      data: {
        link: {
          platform: `DeleteLink `,
          url: `https://example.com/${timestamp}`,
        },
      },
    },
  );

  expect(createRes.status()).toBe(201);

  // Step 2: Get all links
  const allLinks = await authenticatedPage.request.get(
    `${baseURL}/api/private/socialLink?userid=${userId}`,
  );
  const links = await allLinks.json();
  const linkToDelete = links.find((l: any) =>
    l.platform.includes("DeleteLink"),
  );

  expect(linkToDelete?.id).toBeTruthy();

  // Step 3: Delete the link
  const deleteRes = await authenticatedPage.request.delete(
    `${baseURL}/api/private/socialLink`,
    {
      data: { id: linkToDelete.id },
    },
  );

  expect(deleteRes.status()).toBe(200);
  const text = await deleteRes.text();
  expect(text).toBe("Social link deleted successfully");
});
