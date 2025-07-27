import { test } from "../fixtures";
import { expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test("POST /api/private/skill should add skill", async ({
  authenticatedPage,
}) => {
  const date = Date.now();

  const res = await authenticatedPage.request.post(
    `${baseURL}/api/private/skill`,
    {
      data: {
        skill: {
          name: `Playwright Skill ${date}`,
          description: "A skill added via test",
        },
      },
    },
  );

  expect(res.status()).toBe(201);

  const body = await res.json();
  expect(body.message).toBe("Skill added successfully");
  expect(body.id).toBeTruthy();
});

test("GET /api/private/skill should fetch all skills for user", async ({
  authenticatedPage,
  userId,
}) => {
  const res = await authenticatedPage.request.get(
    `${baseURL}/api/private/skill?userid=${userId}`,
  );

  expect(res.status()).toBe(200);

  const skills = await res.json();
  expect(Array.isArray(skills)).toBe(true);

  // Optionally check if a known skill exists
  if (skills.length > 0) {
    expect(skills[0]).toHaveProperty("name");
    expect(skills[0]).toHaveProperty("id");
  }
});

test("DELETE /api/private/skill should delete a skill", async ({
  authenticatedPage,
}) => {
  const date = Date.now();

  // Step 1: Create a skill to delete
  const createRes = await authenticatedPage.request.post(
    `${baseURL}/api/private/skill`,
    {
      data: {
        skill: {
          name: `Skill To Delete ${date}`,
          description: "Temporary skill",
        },
      },
    },
  );

  expect(createRes.status()).toBe(201);
  const { id: skillId } = await createRes.json();
  expect(skillId).toBeTruthy();

  // Step 2: Delete the skill
  const deleteRes = await authenticatedPage.request.delete(
    `${baseURL}/api/private/skill`,
    {
      data: { id: skillId },
    },
  );

  expect(deleteRes.status()).toBe(200);
  const text = await deleteRes.text();
  expect(text).toBe("Skill deleted successfully");
});
