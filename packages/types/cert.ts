import { Cert, Skill } from "@repo/db/generated/prisma/client";

export type cert = Cert;

export type certWithSkills = Cert & {
  skills?: Skill[];
};

export type TemplateCert = Omit<Cert, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};
