import type { Project, Skill } from "@repo/db/generated/prisma";

export type project = Project;

export type projectWithSkills = Project & {
  skills?: Skill[];
};

export type TemplateProject = Omit<Project, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};
