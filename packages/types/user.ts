import type {
  User,
  Cert,
  Education,
  Experience,
  Skill,
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
  id: z.string().optional(),
  name: z.string().max(50, "Name must be less than 50 characters").optional(),
  age: z.number().int().optional(),
  avatarUrl: z.url().optional().or(z.literal("")),
  bio: z
    .string()
    .max(200, "Bio must be less than 200 characters")
    .nullable()
    .optional(),
  available: z.boolean().optional(),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .nullable()
    .optional(),
  resumeUrl: z.url().optional().or(z.literal("")),
  languages: z.array(z.string()).optional(),
  causes: z.array(z.string()).optional(),
  TemplateId: z.string().nullable().optional(),
  stars: z.number().int().optional(),
});
export type userInput = z.infer<typeof userInputSchema>;

// Frontend
// types.ts
// A base user with only non-relational fields.
interface BaseUser {
  id: string;
  email: string;
  name: string;
  age: number;
  stars: number;
  isActive: boolean;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  available: boolean;
  location: string | null;
  resumeUrl: string | null;
  badges: string[];
  languages: string[];
  causes: string[];
  isProfileComplete: boolean;
  TemplateId: string | null;
  createdAt: string;
  updatedAt: string;
}

// A more detailed skill type that matches the relational data in the JSON.
interface RelationalSkill {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// CORRECTED: Base types for portfolio items, now with optional timestamps.
interface BaseProject {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  url: string | null;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BaseCert {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  acquiredAt: string;
  credentialUrl: string | null;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BaseEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string;
  endDate: string | null;
  institutionUrl: string | null;
  description: string | null;
  imageUrl: string | null;
  grade: string | null;
  activities: string[];
  userId: string;
  credentialUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface BaseExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  companyUrl: string | null;
  description: string | null;
  imageUrl: string | null;
  userId: string;
  credentialUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// CORRECTED: Portfolio items with their related skills, using the detailed RelationalSkill type.
interface ProjectWithSkills extends BaseProject {
  skills: RelationalSkill[];
}

interface CertWithSkills extends BaseCert {
  skills: RelationalSkill[];
}

interface EducationWithSkills extends BaseEducation {
  skills: RelationalSkill[];
}

interface ExperienceWithSkills extends BaseExperience {
  skills: RelationalSkill[];
}

// A skill that holds all its relations. This type is now correct because
// its constituent Base types have been fixed.
interface SkillWithRelations {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  projects: BaseProject[];
  certs: BaseCert[];
  educations: BaseEducation[];
  experiences: BaseExperience[];
  user: BaseUser;
}

// A link to a social media profile.
interface SocialLink {
  id: string;
  platform: string;
  url: string;
  userId: string;
}

// A placeholder for a recommendation.
interface Recommendation {}

// The main, top-level user profile type, now fully correct.
export interface UserProfile extends BaseUser {
  skillsWithRelations: SkillWithRelations[];
  recommendations: Recommendation[];
  socialLinks: SocialLink[];
  certsWithSkills: CertWithSkills[];
  educationsWithSkills: EducationWithSkills[];
  experiencesWithSkills: ExperienceWithSkills[];
  projectsWithSkills: ProjectWithSkills[];
}
