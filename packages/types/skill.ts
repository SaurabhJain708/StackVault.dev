import type { Skill, Project, Experience, Cert } from "../db/generated/prisma";

export type skill = Skill;
import { z } from "zod";
export type skillWithRelations = Skill & {
  projects?: Project[];
  experiences?: Experience[];
  certs?: Cert[];
};

export type TemplateSkill = Omit<Skill, "createdAt" | "updatedAt"> & {
  projects?: Project[];
  experiences?: Experience[];
  certs?: Cert[];
};

export const skillInputSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(50, "Skill name must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Skill description must be less than 200 characters")
    .optional(),
  id: z.string().optional(),
});
export type skillInput = z.infer<typeof skillInputSchema>;
