import type { Project, Skill } from "@repo/db/generated/prisma";
import { z } from "zod";

export type project = Project;

export type projectWithSkills = Project & {
  skills?: Skill[];
};

export type TemplateProject = Omit<Project, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};


export const projectInputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  url: z.url().optional(),
  userId: z.cuid(),
  skills: z.array(z.object({ id: z.cuid() })).optional(),
});
export type projectInput = z.infer<typeof projectInputSchema>;
