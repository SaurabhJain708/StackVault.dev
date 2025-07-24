import { Experience, Skill } from "@repo/db/generated/prisma/client";

export type experience = Experience;

export type experienceWithSkills = Experience & {
  skills?: Skill[];
};

export type TemplateExperience = Omit<Experience, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};
