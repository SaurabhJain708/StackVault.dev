import type { SocialLink } from "../db/generated/prisma";
import { z } from "zod";

export type socialLink = SocialLink;

export type TemplateSocialLink = Omit<SocialLink, "createdAt" | "updatedAt">;

export const socialLinkInputSchema = z.object({
  platform: z.string().max(30),
  url: z.url(),
  id: z.string().optional(),
});
export type socialLinkInput = z.infer<typeof socialLinkInputSchema>;
