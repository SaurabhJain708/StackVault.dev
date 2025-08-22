import { prisma } from "@repo/db";

export async function getUserByDomain(domain: string) {
  try {
    const userId = await prisma.user.findUnique({
      where: { url: domain },
      select: { id: true },
    });
    return userId ? userId.id : null;
  } catch (error) {
    console.error("Error fetching user by domain:", error);
    return null;
  }
}
