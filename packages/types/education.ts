import { Education, Skill } from "@repo/db/generated/prisma/client";

export type education = Education;

export type educationWithSkills = Education & {
  skills?: Skill[];
};

export type TemplateEducation = Omit<Education, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};
