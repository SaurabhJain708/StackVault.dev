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
