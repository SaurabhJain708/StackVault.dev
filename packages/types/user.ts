import {
  User,
  Cert,
  Education,
  Experience,
  Recommendation,
  Skill,
  SocialLink,
  Project,
} from "@repo/db/generated/prisma";

import { skillWithRelations, TemplateSkill } from "./skill";
import { projectWithSkills, TemplateProject } from "./project";
import { experienceWithSkills, TemplateExperience } from "./experience";
import { certWithSkills, TemplateCert } from "./cert";
import { educationWithSkills, TemplateEducation } from "./education";
import { TemplateRecommendation } from "recommendation";
import { TemplateSocialLink } from "socialLink";

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
