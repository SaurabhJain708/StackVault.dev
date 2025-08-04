import type { Cert, Skill } from "../db/generated/prisma";
import { z } from "zod";

export type cert = Cert;

export type certWithSkills = Cert & {
  skills?: Skill[];
};

export type TemplateCert = Omit<Cert, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export const certInputSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(200).optional(),
  imageUrl: z.url().optional(),
  acquiredAt: z.coerce.date().optional(), // optional if not passed from client
  credentialUrl: z.url().optional(),
  skills: z.array(z.object({ id: z.cuid() })).optional(),
});

export type certInput = z.infer<typeof certInputSchema>;
