import type {
  User,
  Cert,
  Education,
  Experience,
  Recommendation,
  Skill,
  SocialLink,
  Project,
} from "../db/generated/prisma";

import type { skillWithRelations, TemplateSkill } from "./skill";
import type { projectWithSkills, TemplateProject } from "./project";
import type { experienceWithSkills, TemplateExperience } from "./experience";
import type { certWithSkills, TemplateCert } from "./cert";
import type { educationWithSkills, TemplateEducation } from "./education";
import type { TemplateRecommendation } from "./recommendation";
import type { TemplateSocialLink } from "./socialLink";

export type user = User;

export type completeUser = User & {
  skills?: Skill[];
  skillsWithRelations?: skillWithRelations[];
  projects?: Project[];
  projectsWithSkills?: projectWithSkills[];
  experiences?: Experience[];
  experiencesWithSkills?: experienceWithSkills[];
  certs?: Cert[];
  certsWithSkills?: certWithSkills[];
  educations?: Education[];
  educationsWithSkills?: educationWithSkills[];
  recommendations?: Recommendation[];
  socialLinks?: SocialLink[];
};

export type TemplateUser = User & {
  skillsWithRelations?: TemplateSkill[];
  projectsWithSkills?: TemplateProject[];
  experiencesWithSkills?: TemplateExperience[];
  certsWithSkills?: TemplateCert[];
  educationsWithSkills?: TemplateEducation[];
  recommendations?: TemplateRecommendation[];
  socialLinks?: TemplateSocialLink[];
};

import { z } from "zod";

export const userInputSchema = z.object({
  name: z.string().max(50),
  age: z.number().int().optional(),
  avatarUrl: z.url().optional(),
  bio: z.string().max(200).optional(),
  available: z.boolean().optional(),
  location: z.string().max(100).optional(),
  resumeUrl: z.url().optional(),
  languages: z.array(z.string()).optional(),
  causes: z.array(z.string()).optional(),
  TemplateId: z.string().optional(),
});
export type userInput = z.infer<typeof userInputSchema>;
