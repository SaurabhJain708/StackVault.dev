import type { Cert, Skill } from "@repo/db/generated/prisma";

export type cert = Cert;

export type certWithSkills = Cert & {
  skills?: Skill[];
};

export type TemplateCert = Omit<Cert, "createdAt" | "updatedAt"> & {
  skills?: Skill[];
};

export type certInput = Omit<Cert, "id" | "createdAt" | "updatedAt"> & {
  skills?: { id: string }[];
};
