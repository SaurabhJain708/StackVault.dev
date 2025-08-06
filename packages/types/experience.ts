import type { Experience, Skill } from "../db/generated/prisma";
import { z } from "zod";

export type experience = Experience;

export type experienceWithSkills = Experience & {
  skills?: Skill[];
};

export type TemplateExperience = Omit<Experience, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export const experienceInputSchema = z.object({
  company: z.string().max(100),
  position: z.string().max(100),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  companyUrl: z.url().optional(),
  description: z.string().max(200).optional(),
  imageUrl: z.url().optional(),
  credentialUrl: z.url().optional(),
  skills: z.array(z.object({ id: z.cuid() })).optional(),
  id: z.string().optional(),
});
export type experienceInput = z.infer<typeof experienceInputSchema>;
