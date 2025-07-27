import type { Education, Skill } from "@repo/db/generated/prisma";
import { z } from "zod";

export type education = Education;

export type educationWithSkills = Education & {
  skills?: Skill[];
};

export type TemplateEducation = Omit<Education, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export const educationInputSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  institutionUrl: z.url().optional(),
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  grade: z.string().optional(),
  activities: z.array(z.string()).optional(),
  userId: z.cuid(),
  credentialUrl: z.url().optional(),
  skills: z.array(z.object({ id: z.cuid() })).optional(),
});

export type educationInput = z.infer<typeof educationInputSchema>;
