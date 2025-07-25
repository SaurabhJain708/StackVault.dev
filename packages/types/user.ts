import type {
  User,
  Cert,
  Education,
  Experience,
  Recommendation,
  Skill,
  SocialLink,
  Project,
} from "@repo/db/generated/prisma";

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
