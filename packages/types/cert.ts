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
  imageUrl: z.url().nullable().optional(),
  acquiredAt: z.coerce.date().optional(),
  credentialUrl: z.url().or(z.literal("")).optional(),
  skills: z
    .array(z.object({ id: z.cuid(), name: z.string().optional() }))
    .max(5)
    .optional(),
  id: z.string().optional(),
});

export type certInput = z.infer<typeof certInputSchema>;

export type FrontendCert = {
  name: string;
  description: string | undefined;
  imageUrl: string | undefined;
  acquiredAt: Date;
  credentialUrl: string | undefined;
  id: string;
  userId: string;
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
