import { SocialLink } from "@repo/db/generated/prisma";

export type socialLink = SocialLink;

export type TemplateSocialLink = Omit<SocialLink, "createdAt" | "updatedAt">;
