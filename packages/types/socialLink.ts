import type { SocialLink } from "@repo/db/generated/prisma";
import { z } from "zod";

export type socialLink = SocialLink;

export type TemplateSocialLink = Omit<SocialLink, "createdAt" | "updatedAt">;

export const socialLinkInputSchema = z.object({
  platform: z.string(),
  url: z.url(),
});
export type socialLinkInput = z.infer<typeof socialLinkInputSchema>;
