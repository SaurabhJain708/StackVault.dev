import type { SocialLink } from "@repo/db/generated/prisma";

export type socialLink = SocialLink;

export type TemplateSocialLink = Omit<SocialLink, "createdAt" | "updatedAt">;

export type socialLinkInput = Omit<SocialLink, "createdAt" | "updatedAt" | "id">;
