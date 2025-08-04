import { prisma } from "@repo/db";
import {
  TemplateUser,
  TemplateRecommendation,
  TemplateCert,
  TemplateExperience,
  TemplateEducation,
  TemplateSocialLink,
  TemplateProject,
} from "@repo/types";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: { userid: string } },
) {
  try {
    const { userid } = context.params;
    const user = await prisma.user.findUnique({
      where: { id: userid },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const [
      userData,
      rawProjects,
      rawSocialLinks,
      rawEducations,
      rawExperiences,
      rawRecommendations,
      rawcerts,
      skillsWithRelations,
    ] = await Promise.all([
      prisma.user.findUnique({ where: { id: userid } }),
      prisma.project.findMany({
        where: { userId: userid },
        include: { skills: true },
      }),
      prisma.socialLink.findMany({ where: { userId: userid } }),
      prisma.education.findMany({
        where: { userId: userid },
        include: { skills: true },
      }),
      prisma.experience.findMany({
        where: { userId: userid },
        include: { skills: true },
      }),
      prisma.recommendation.findMany({
        where: { givenToId: userid },
        select: {
          id: true,
          content: true,
          givenById: true,
          givenToId: true,
          givenBy: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      }),
      prisma.cert.findMany({
        where: { userId: userid },
        include: { skills: true },
      }),
      prisma.skill.findMany({
        where: { userId: userid },
        select: {
          projects: true,
          certs: true,
          educations: true,
          experiences: true,
          id: true,
          name: true,
          description: true,
          userId: true,
          user: true,
        },
      }),
    ]);

    if (!userData) {
      return new Response("User not found", { status: 404 });
    }

    const projectsWithSkills: TemplateProject[] = rawProjects.map(
      (project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        imageUrl: project.imageUrl,
        url: project.url,
        userId: project.userId,
        skills: project.skills,
      }),
    );

    const socialLinks: TemplateSocialLink[] = rawSocialLinks.map((link) => ({
      id: link.id,
      platform: link.platform,
      url: link.url,
      userId: link.userId,
    }));

    const educationsWithSkills: TemplateEducation[] = rawEducations.map(
      (edu) => ({
        id: edu.id,
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        institutionUrl: edu.institutionUrl,
        description: edu.description,
        imageUrl: edu.imageUrl,
        grade: edu.grade,
        activities: edu.activities,
        userId: edu.userId,
        credentialUrl: edu.credentialUrl,
        skills: edu.skills,
      }),
    );

    const experiencesWithSkills: TemplateExperience[] = rawExperiences.map(
      (exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        companyUrl: exp.companyUrl,
        description: exp.description,
        imageUrl: exp.imageUrl,
        userId: exp.userId,
        credentialUrl: exp.credentialUrl,
        skills: exp.skills,
      }),
    );

    const recommendations: TemplateRecommendation[] = rawRecommendations.map(
      (r) => ({
        id: r.id,
        content: r.content,
        authorName: r.givenBy.name,
        authorImageUrl: r.givenBy.avatarUrl ?? undefined,
        givenById: r.givenById,
        givenToId: r.givenToId,
      }),
    );

    const templateCerts: TemplateCert[] = rawcerts.map((cert) => ({
      id: cert.id,
      name: cert.name,
      description: cert.description,
      imageUrl: cert.imageUrl,
      acquiredAt: cert.acquiredAt,
      credentialUrl: cert.credentialUrl,
      userId: cert.userId,
      skills: cert.skills,
    }));

    const fullProfile: TemplateUser = {
      ...userData,
      skillsWithRelations,
      recommendations,
      socialLinks,
      certsWithSkills: templateCerts,
      educationsWithSkills,
      experiencesWithSkills,
      projectsWithSkills,
    };

    return Response.json(fullProfile, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
