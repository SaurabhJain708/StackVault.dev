// e2e/tests/cert-api.spec.ts
import { test, expect } from "@playwright/test";

const BASE_API = "/api/cert";
const userId = "c1-example-user-id"; // replace with a real test user ID from seed

const mockCert = {
  name: "Test Cert",
  description: "For testing purposes",
  imageUrl: "https://example.com/image.png",
  acquiredAt: new Date().toISOString(),
  credentialUrl: "https://example.com/certificate",
  userId,
  skills: [{ id: "c1-example-skill-id" }], // replace with test skill
};

let certId: string;

test.describe("Cert API CRUD", () => {
  test("POST /cert - create cert", async ({ request }) => {
    const res = await request.post(BASE_API, {
      data: { cert: mockCert },
    });
    expect(res.status()).toBe(201);

    const certsRes = await request.get(BASE_API, {
      data: { userid: mockCert.userId },
    });
    const certs = await certsRes.json();
    certId = certs.find((c: any) => c.name === mockCert.name)?.id;
    expect(certId).toBeTruthy();
  });

  test("PATCH /cert - update cert", async ({ request }) => {
    const updatedCert = { ...mockCert, id: certId, name: "Updated Cert Name" };

    const res = await request.patch(BASE_API, {
      data: { cert: updatedCert },
    });
    expect(res.status()).toBe(200);
  });

  test("GET /cert - fetch certs", async ({ request }) => {
    const res = await request.get(BASE_API, {
      data: { userid: mockCert.userId },
    });
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.some((c: any) => c.id === certId)).toBe(true);
  });

  test("DELETE /cert - delete cert", async ({ request }) => {
    const res = await request.delete(BASE_API, {
      data: { id: certId },
    });
    expect(res.status()).toBe(200);
  });
});
