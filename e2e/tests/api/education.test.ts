import { test } from "../fixtures";
import { expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test("POST /api/private/education should add education", async ({
  authenticatedPage,
  testUserData,
  userId,
}) => {
  const date = new Date();
  const res = await authenticatedPage.request.post(
    `${baseURL}/api/private/education`,
    {
      data: {
        education: {
          institution: `Playwright University ${date.toISOString()}`,
          degree: "Bachelor of Testing",
          fieldOfStudy: "Quality Assurance",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          institutionUrl: "https://example.edu",
          description: "A test education record",
          imageUrl: "https://example.com/image.png",
          grade: "A+",
          activities: ["Testing", "Debugging"],
          credentialUrl: "https://example.com/cert",
          userId: userId,
          skills: testUserData.skills,
        },
      },
    },
  );

  expect(res.status()).toBe(201);

  const text = await res.text();
  expect(text).toBe("Education added successfully");
});

test("PATCH /api/private/education should update education", async ({
  authenticatedPage,
  userId,
  testUserData,
}) => {
  const date = new Date();

  // Create education
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/education`,
    {
      data: {
        education: {
          institution: `Temp Institution ${date.toISOString()}`,
          degree: "Bachelor of Temp",
          startDate: new Date().toISOString(),
          userId,
          skills: [],
        },
      },
    },
  );

  expect(createRes.status()).toBe(201);

  // Fetch education ID
  const getRes = await authenticatedPage.request.get(
    `${baseURL}/api/private/education?userid=${userId}`,
  );
  const educations = await getRes.json();
  const educationId = educations.find((e: any) =>
    e.institution.includes("Temp Institution"),
  )?.id;

  expect(educationId).toBeTruthy();

  // Update the education
  const updateRes = await authenticatedPage.request.patch(
    `${baseURL}/api/private/education`,
    {
      data: {
        education: {
          id: educationId,
          institution: `Updated Institution ${Date.now()}`,
          degree: "Updated Degree",
          startDate: new Date().toISOString(),
          skills: testUserData.skills,
          userId,
        },
      },
    },
  );

  expect(updateRes.status()).toBe(200);
});

test("DELETE /api/private/education should delete education", async ({
  authenticatedPage,
  userId,
  testUserData,
}) => {
  const date = new Date();

  // Create an education record
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/education`,
    {
      data: {
        education: {
          institution: `Delete Me Institution ${date.toISOString()}`,
          degree: "Delete Me Degree",
          startDate: new Date().toISOString(),
          userId,
          skills: testUserData.skills,
        },
      },
    },
  );
  expect(createRes.status()).toBe(201);

  // Get education ID
  const getRes = await authenticatedPage.request.get(
    `${baseURL}/api/private/education?userid=${userId}`,
  );
  const educations = await getRes.json();
  const educationId = educations.find((e: any) =>
    e.institution.includes("Delete Me Institution"),
  )?.id;

  expect(educationId).toBeTruthy();

  // Delete the record
  const deleteRes = await authenticatedPage.request.delete(
    `${baseURL}/api/private/education`,
    {
      data: { id: educationId },
    },
  );

  expect(deleteRes.status()).toBe(200);
});
