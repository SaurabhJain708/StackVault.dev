// pages/api/test-login.ts
import { encode } from "next-auth/jwt";
import { prisma } from "@repo/db";
// apps/web/app/api/test-login/route.ts

export async function GET() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      id: "test-user-id",
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
    },
  });
  const userId = user.id;
  await prisma.skill.createMany({
    data: [
      { id: "skill-1", name: "JavaScript", userId },
      { id: "skill-2", name: "React", userId },
    ],
    skipDuplicates: true,
  });

  await prisma.cert.createMany({
    data: [
      {
        id: "cert-1",
        name: "Frontend Developer",
        userId,
        acquiredAt: new Date(),
      },
      {
        id: "cert-2",
        name: "Backend Developer",
        userId,
        acquiredAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  await prisma.education.createMany({
    data: [
      {
        id: "edu-1",
        institution: "MIT",
        degree: "B.Tech",
        startDate: new Date("2020-01-01"),
        userId,
      },
      {
        id: "edu-2",
        institution: "Stanford",
        degree: "M.Tech",
        startDate: new Date("2022-01-01"),
        userId,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.experience.createMany({
    data: [
      {
        id: "exp-1",
        company: "Google",
        position: "Intern",
        startDate: new Date("2023-01-01"),
        userId,
      },
      {
        id: "exp-2",
        company: "Microsoft",
        position: "Software Engineer",
        startDate: new Date("2023-06-01"),
        userId,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.project.createMany({
    data: [
      {
        id: "proj-1",
        name: "SkillTree",
        userId,
      },
      {
        id: "proj-2",
        name: "StackVault",
        userId,
      },
      {
        id: "proj-3",
        name: "NextAuth Example",
        userId,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.socialLink.createMany({
    data: [
      {
        id: "link-1",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/testuser",
        userId,
      },
      {
        id: "link-2",
        platform: "GitHub",
        url: "https://github.com/testuser",
        userId,
      },
      {
        id: "link-3",
        platform: "Twitter",
        url: "https://twitter.com/testuser",
        userId,
      },
    ],
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

  return new Response(JSON.stringify({ token, cookie, userId: user.id }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
