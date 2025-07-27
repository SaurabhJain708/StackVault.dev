import { test } from "../fixtures";
import { expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test("POST /api/private/experience should add experience", async ({
  authenticatedPage,
  userId,
}) => {
  const date = new Date();
  const res = await authenticatedPage.request.post(
    `${baseURL}/api/private/experience`,
    {
      data: {
        experience: {
          company: `Test Company ${date.getTime()}`,
          position: "Software Engineer",
          startDate: date.toISOString(),
          endDate: new Date(
            date.getFullYear(),
            date.getMonth() + 6,
          ).toISOString(),
          companyUrl: "https://company.com",
          description: "Worked on testing",
          imageUrl: "https://company.com/logo.png",
          credentialUrl: "https://company.com/cert",
          skills: [],
          userId,
        },
      },
    },
  );

  expect(res.status()).toBe(201);
  const text = await res.text();
  expect(text).toBe("Experience added successfully");
});

test("PATCH /api/private/experience should update experience", async ({
  authenticatedPage,
  userId,
  testUserData,
}) => {
  const date = new Date();

  // Step 1: Create experience
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/experience`,
    {
      data: {
        experience: {
          company: `Temp Company ${date.getTime()}`,
          position: "Developer",
          startDate: date.toISOString(),
          companyUrl: "https://example.com/company",
          imageUrl: "https://example.com/logo.png",
          credentialUrl: "https://example.com/cert",
          skills: [],
          userId,
        },
      },
    },
  );
  expect(createRes.status()).toBe(201);

  // Step 2: Get experience ID
  const getRes = await authenticatedPage.request.get(
    `${baseURL}/api/private/experience?userid=${userId}`,
  );
  const experiences = await getRes.json();
  const experienceId = experiences.find((exp: any) =>
    exp.company.includes("Temp Company"),
  )?.id;

  expect(experienceId).toBeTruthy();

  // Step 3: Update experience
  const patchRes = await authenticatedPage.request.patch(
    `${baseURL}/api/private/experience`,
    {
      data: {
        id: experienceId,
        experience: {
          company: `Updated Company ${Date.now()}`,
          position: "Senior Dev",
          startDate: date.toISOString(),
          skills: testUserData.skills,
          userId,
        },
      },
    },
  );

  expect(patchRes.status()).toBe(200);
  const text = await patchRes.text();
  expect(text).toBe("Experience updated successfully");
});

test("DELETE /api/private/experience should delete experience", async ({
  authenticatedPage,
  userId,
  testUserData,
}) => {
  const date = new Date();

  // Step 1: Create experience
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/experience`,
    {
      data: {
        experience: {
          company: `Delete Me ${date.getTime()}`,
          position: "Intern",
          startDate: date.toISOString(),
          skills: testUserData.skills.map((s) => ({ id: s.id })),
          userId,
        },
      },
    },
  );

  expect(createRes.status()).toBe(201);

  // Step 2: Get ID
  const allRes = await authenticatedPage.request.get(
    `${baseURL}/api/private/experience?userid=${userId}`,
  );
  const allExperiences = await allRes.json();
  const experienceId = allExperiences.find((exp: any) =>
    exp.company.includes("Delete Me"),
  )?.id;

  expect(experienceId).toBeTruthy();

  // Step 3: Delete
  const deleteRes = await authenticatedPage.request.delete(
    `${baseURL}/api/private/experience`,
    {
      data: { id: experienceId },
    },
  );

  expect(deleteRes.status()).toBe(200);
  const text = await deleteRes.text();
  expect(text).toBe("Experience deleted successfully");
});
