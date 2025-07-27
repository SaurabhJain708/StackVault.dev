import { test } from "../fixtures";
import { expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test("POST /api/private/project should add project", async ({
  authenticatedPage,
  userId,
}) => {
  const date = new Date();

  const res = await authenticatedPage.request.post(
    `${baseURL}/api/private/project`,
    {
      data: {
        project: {
          name: `Test Project ${date.getTime()}`,
          description: "Some description about the project.",
          imageUrl: "https://example.com/image.png",
          url: "https://github.com/example/project",
          skills: [],
          userId,
        },
      },
    },
  );

  expect(res.status()).toBe(201);
  const text = await res.text();
  expect(text).toBe("Project added successfully");
});

test("PATCH /api/private/project should update project", async ({
  authenticatedPage,
  userId,
  testUserData,
}) => {
  const date = new Date();

  // Create a project
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/project`,
    {
      data: {
        project: {
          name: `Temp Project ${date.getTime()}`,
          description: "Initial description",
          imageUrl: "https://example.com/project.png",
          url: "https://github.com/example/temp",
          skills: [],
          userId,
        },
      },
    },
  );
  expect(createRes.status()).toBe(201);

  // Fetch project ID
  const allProjects = await authenticatedPage.request.get(
    `${baseURL}/api/private/project?userid=${userId}`,
  );
  const projects = await allProjects.json();
  const projectId = projects.find((p: any) =>
    p.name.includes("Temp Project"),
  )?.id;

  expect(projectId).toBeTruthy();

  // Update the project
  const updateRes = await authenticatedPage.request.patch(
    `${baseURL}/api/private/project`,
    {
      data: {
        id: projectId,
        project: {
          name: `Updated Project ${Date.now()}`,
          description: "Updated description",
          url: "https://example.com/updated",
          skills: testUserData.skills,
          userId,
        },
      },
    },
  );

  expect(updateRes.status()).toBe(200);
  const text = await updateRes.text();
  expect(text).toBe("Project updated successfully");
});

test("DELETE /api/private/project should delete project", async ({
  authenticatedPage,
  userId,
  testUserData,
}) => {
  const date = new Date();

  // Create a project
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/project`,
    {
      data: {
        project: {
          name: `Delete Project ${date.getTime()}`,
          url: "https://delete-me.com",
          skills: testUserData.skills.map((s) => ({ id: s.id })),
          userId,
        },
      },
    },
  );

  expect(createRes.status()).toBe(201);

  // Get project ID
  const allProjects = await authenticatedPage.request.get(
    `${baseURL}/api/private/project?userid=${userId}`,
  );
  const projects = await allProjects.json();
  const projectId = projects.find((p: any) =>
    p.name.includes("Delete Project"),
  )?.id;

  expect(projectId).toBeTruthy();

  // Delete the project
  const deleteRes = await authenticatedPage.request.delete(
    `${baseURL}/api/private/project`,
    {
      data: { id: projectId },
    },
  );

  expect(deleteRes.status()).toBe(200);
  const text = await deleteRes.text();
  expect(text).toBe("Project deleted successfully");
});
