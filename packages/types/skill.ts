import { Skill, Project, Experience, Cert } from "@repo/db/generated/prisma";

export type skill = Skill;

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
