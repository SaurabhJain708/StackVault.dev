import type { Project, Skill } from "../db/generated/prisma";
import { z } from "zod";

export type project = Project;

export type projectWithSkills = Project & {
  skills?: Skill[];
};

export type TemplateProject = Omit<Project, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export const projectInputSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be less than 100 characters"),
  description: z
    .string()
    .max(200, "Project description must be less than 200 characters")
    .optional(),
  imageUrl: z.url().optional().nullable().or(z.literal("")),
  url: z.url().optional().nullable().or(z.literal("")),
  skills: z
    .array(z.object({ id: z.cuid(), name: z.string().optional() }))
    .max(5)
    .optional(),
  id: z.string().optional(),
});
export type projectInput = z.infer<typeof projectInputSchema>;

export type FrontendProject = {
  name: string;
  id: string;
  description: string | undefined;
  imageUrl: string | undefined;
  url: string | undefined;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  skills:
    | {
        name: string;
        id: string;
        description: string | undefined;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
};
