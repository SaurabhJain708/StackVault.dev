import type { Education, Skill } from "@repo/db/generated/prisma";

export type education = Education;

export type educationWithSkills = Education & {
  skills?: Skill[];
};

export type TemplateEducation = Omit<Education, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export type educationInput = Omit<Education, "createdAt" | "updatedAt" | "id"> & {
  skills?: {id:string}[];
};