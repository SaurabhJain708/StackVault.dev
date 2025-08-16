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
  institution: z
    .string()
    .min(1, "Institution name is required")
    .max(100, "Institution name must be less than 100 characters"),
  degree: z
    .string()
    .min(1, "Degree is required")
    .max(100, "Degree must be less than 100 characters"),
  fieldOfStudy: z
    .string()
    .max(100, "Field of study must be less than 100 characters")
    .optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().or(z.literal("")),
  institutionUrl: z.url().optional().or(z.literal("")),
  description: z.string().max(200).optional(),
  imageUrl: z.url().nullable().optional().or(z.literal("")),
  grade: z.string().max(10, "Grade must be less than 10 characters").optional(),
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
