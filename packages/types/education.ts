import type { Education, Skill } from "../db/generated/prisma";
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
  institutionUrl: z.url().optional().or(z.literal("")),
  description: z.string().max(200).optional(),
  imageUrl: z.url().optional().or(z.literal("")),
  grade: z.string().max(10).optional(),
  credentialUrl: z
    .preprocess((val) => (val === "" ? undefined : val), z.string())
    .optional()
    .or(z.literal("")),
  skills: z
    .array(z.object({ id: z.cuid(), name: z.string().optional() }))
    .max(5)
    .optional(),
  id: z.string().optional(),
});

export type educationInput = z.infer<typeof educationInputSchema>;

export type FrontendEducation = {
  id: string;
  description: string | undefined;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  institution: string;
  degree: string;
  fieldOfStudy: string | undefined;
  startDate: Date;
  endDate: Date | undefined;
  institutionUrl: string | undefined;
  imageUrl: string | undefined;
  grade: string | undefined;
  activities: string[];
  credentialUrl: string | undefined;
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
