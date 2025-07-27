// import { test } from "../fixtures";
// import { expect } from "@playwright/test";

// const baseURL = "http://localhost:3000";

// test("POST /api/private/cert should add cert", async ({
//   authenticatedPage,
// }) => {
//   const res = await authenticatedPage.request.patch(
//     `${baseURL}/api/private/cert`,
//     {
//       data: {
//         cert: {
//           name: "Tommy",
//           acquiredAt: new Date().toISOString(),
//           skills: [], // or [{ id: "existing-skill-id" }]
//         },
//       },
//     },
//   );

//   expect(res.status()).toBe(201);
//   const text = await res.text();
//   expect(text).toBe("Cert added successfully");
// });
