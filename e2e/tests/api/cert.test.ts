// e2e/tests/cert.spec.ts
import { test } from "../fixtures";
import { expect } from "@playwright/test"; // ✅ correct

const baseURL = "http://localhost:3000";

test("POST /api/private/cert should add cert", async ({
  authenticatedPage,
}) => {
  const date = new Date();
  const res = await authenticatedPage.request.post(
    `${baseURL}/api/private/cert`,
    {
      data: {
        cert: {
          name: `Playwright Cert ${date}`,
          acquiredAt: new Date().toISOString(),
          skills: [], // or [{ id: "existing-skill-id" }]
        },
      },
    },
  );

  expect(res.status()).toBe(201);
  const text = await res.text();
  expect(text).toBe("Cert added successfully");
});

test("PATCH /api/private/cert should update cert", async ({
  authenticatedPage,
  userId,
}) => {
  // First create a cert
  const date = new Date();
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/cert`,
    {
      data: {
        cert: {
          name: `Temp Cert ${date}`,
          acquiredAt: new Date().toISOString(),
          credentialUrl: "https://example.com/credential231",
          imageUrl: "https://example.com/image123.png",
          skills: [],
        },
      },
    },
  );

  expect(createRes.status()).toBe(201);

  // Fetch certs to get the ID
  const allCerts = await authenticatedPage.request.get(
    `${baseURL}/api/private/cert?userid=${userId}`,
  );
  const certs = await allCerts.json();
  const certId = certs.find((c: any) => c.name === `Temp Cert ${date}`)?.id;

  expect(certId).toBeTruthy();

  const updateRes = await authenticatedPage.request.patch(
    `${baseURL}/api/private/cert`,
    {
      data: {
        cert: {
          id: certId,
          name: `Updated Cert ${Date.now()}`,
          acquiredAt: new Date().toISOString(),
          skills: [],
        },
      },
    },
  );

  expect(updateRes.status()).toBe(200);
});

test("DELETE /api/private/cert should delete cert", async ({
  authenticatedPage,
  userId,
}) => {
  // First create
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/cert`,
    {
      data: {
        cert: {
          name: "Delete Me",
          acquiredAt: new Date().toISOString(),
          skills: [],
          credentialUrl: "https://example.com/credential",
          imageUrl: "https://example.com/image.png",
        },
      },
    },
  );
  expect(createRes.status()).toBe(201);

  // Fetch cert ID
  const allCerts = await authenticatedPage.request.get(
    `${baseURL}/api/private/cert?userid=${userId}`,
  );
  const certs = await allCerts.json();
  const certId = certs.find((c: any) => c.name === "Delete Me")?.id;
  expect(certId).toBeTruthy();

  // Now delete
  const deleteRes = await authenticatedPage.request.delete(
    `${baseURL}/api/private/cert`,
    {
      data: { id: certId },
    },
  );
  expect(deleteRes.status()).toBe(200);
});
