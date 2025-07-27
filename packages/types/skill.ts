import type {
  Skill,
  Project,
  Experience,
  Cert,
} from "@repo/db/generated/prisma";

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
  name: z.string(),
  description: z.string().optional(),
});
export type skillInput = z.infer<typeof skillInputSchema>;
