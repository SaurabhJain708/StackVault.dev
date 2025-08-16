import type { SocialLink } from "../db/generated/prisma";
import { z } from "zod";

export type socialLink = SocialLink;

export type TemplateSocialLink = Omit<SocialLink, "createdAt" | "updatedAt">;

export const socialLinkInputSchema = z.object({
  platform: z
    .string()
    .min(1, "Platform name is required")
    .max(30, "Platform name must be less than 30 characters"),
  url: z.url(),
  id: z.string().optional(),
});
export type socialLinkInput = z.infer<typeof socialLinkInputSchema>;
