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
  institution: z.string().max(100),
  degree: z.string().max(100),
  fieldOfStudy: z.string().max(100).optional(),
  startDate: z.coerce.date(),
  endDate: z
    .preprocess((val) => (val === "" ? undefined : val), z.date())
    .optional(),
  institutionUrl: z.url().optional(),
  description: z.string().max(200).optional(),
  imageUrl: z.url().optional(),
  grade: z.string().max(10).optional(),
  credentialUrl: z
    .preprocess((val) => (val === "" ? undefined : val), z.string())
    .optional(),
  skills: z
    .array(z.object({ id: z.cuid() }))
    .max(5)
    .optional(),
});

export type educationInput = z.infer<typeof educationInputSchema>;
