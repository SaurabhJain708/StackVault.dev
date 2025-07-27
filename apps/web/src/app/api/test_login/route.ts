// pages/api/test-login.ts
import { encode } from "next-auth/jwt";
import { prisma } from "@repo/db";
// apps/web/app/api/test-login/route.ts

export async function GET() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      id: "cmlv3tzxw001eu77gqz35l4va",
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
    },
  });
  const userId = user.id;

  const skillData = [
    { id: "cmlv3tzxw001eu77gqz35l4va", name: "JavaScript", userId },
    { id: "cmlv3tzxw001eu77gqz35l4vb", name: "React", userId },
  ];
  await prisma.skill.createMany({ data: skillData, skipDuplicates: true });

  const certData = [
    {
      id: "cmlv3tzxw001eu77gqz35l4vc",
      name: "Frontend Developer",
      userId,
      acquiredAt: new Date(),
    },
    {
      id: "cmlv3tzxw001eu77gqz35l4vd",
      name: "Backend Developer",
      userId,
      acquiredAt: new Date(),
    },
  ];
  await prisma.cert.createMany({ data: certData, skipDuplicates: true });

  const educationData = [
    {
      id: "cmlv3tzxw001eu77gqz35l4ve",
      institution: "MIT",
      degree: "B.Tech",
      startDate: new Date("2020-01-01"),
      userId,
    },
    {
      id: "cmlv3tzxw001eu77gqz35l4va",
      institution: "Stanford",
      degree: "M.Tech",
      startDate: new Date("2022-01-01"),
      userId,
    },
  ];
  await prisma.education.createMany({
    data: educationData,
    skipDuplicates: true,
  });

  const experienceData = [
    {
      id: "cmlv3tzxw001eu77gqz35l4va",
      company: "Google",
      position: "Intern",
      startDate: new Date("2023-01-01"),
      userId,
    },
    {
      id: "cmlv3tzxw001eu77gqz35l4vb",
      company: "Microsoft",
      position: "Software Engineer",
      startDate: new Date("2023-06-01"),
      userId,
    },
  ];
  await prisma.experience.createMany({
    data: experienceData,
    skipDuplicates: true,
  });

  const projectData = [
    { id: "cmlv3tzxw001eu77gqz35l4va", name: "SkillTree", userId },
    { id: "cmlv3tzxw001eu77gqz35l4vb", name: "StackVault", userId },
    { id: "cmlv3tzxw001eu77gqz35l4vc", name: "NextAuth Example", userId },
  ];
  await prisma.project.createMany({ data: projectData, skipDuplicates: true });

  const socialLinkData = [
    {
      id: "cmlv3tzxw001eu77gqz35l4va",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/testuser",
      userId,
    },
    {
      id: "cmlv3tzxw001eu77gqz35l4vb",
      platform: "GitHub",
      url: "https://github.com/testuser",
      userId,
    },
    {
      id: "cmlv3tzxw001eu77gqz35l4vc",
      platform: "Twitter",
      url: "https://twitter.com/testuser",
      userId,
    },
  ];
  await prisma.socialLink.createMany({
    data: socialLinkData,
    skipDuplicates: true,
  });

  const token = await encode({
    token: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const cookie = `next-auth.session-token=${token}; Path=/; HttpOnly; SameSite=Lax`;

  return new Response(
    JSON.stringify({
      token,
      cookie,
      userId,
      skills: skillData.map((s) => ({ id: s.id })),
      certs: certData.map((c) => ({ id: c.id })),
      educations: educationData.map((e) => ({ id: e.id })),
      experiences: experienceData.map((e) => ({ id: e.id })),
      projects: projectData.map((p) => ({ id: p.id })),
      socialLinks: socialLinkData.map((l) => ({ id: l.id })),
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    },
  );
}
