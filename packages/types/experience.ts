import type { Experience, Skill } from "@repo/db/generated/prisma";

export type experience = Experience;

export type experienceWithSkills = Experience & {
  skills?: Skill[];
};

export type TemplateExperience = Omit<Experience, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export type experienceInput = Omit<
  Experience,
  "createdAt" | "updatedAt" | "id"
> & {
  skills?: { id: string }[];
};
