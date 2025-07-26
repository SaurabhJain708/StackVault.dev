import type { Experience, Skill } from "@repo/db/generated/prisma";
import { z } from "zod";

export type experience = Experience;

export type experienceWithSkills = Experience & {
  skills?: Skill[];
};

export type TemplateExperience = Omit<Experience, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export const experienceInputSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  companyUrl: z.url().optional(),
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  userId: z.string().cuid(),
  credentialUrl: z.url().optional(),
  skills: z.array(z.object({ id: z.string().cuid() })).optional(),
});
export type experienceInput = z.infer<typeof experienceInputSchema>;
