import type { Recommendation } from "@repo/db/generated/prisma";

export type recommendation = Recommendation;

export type TemplateRecommendation = Omit<
  Recommendation,
  "createdAt" | "updatedAt"
> & {
  content?: string;
  authorName?: string;
  authorPosition?: string;
  authorCompany?: string;
  authorImageUrl?: string;
};
