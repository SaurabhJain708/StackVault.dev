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
  company: z.string().min(1, "Company name is required").max(100),
  position: z.string().min(1, "Position is required").max(100),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  companyUrl: z.url().optional().or(z.literal("")),
  description: z.string().max(200).optional(),
  imageUrl: z.url().optional().or(z.literal("")),
  skills: z
    .array(z.object({ id: z.cuid(), name: z.string().optional() }))
    .max(5)
    .optional(),
  id: z.string().optional(),
});
export type experienceInput = z.infer<typeof experienceInputSchema>;

export type FrontendExperience = {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | undefined;
  companyUrl: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  userId: string;
  credentialUrl: string | undefined;
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
