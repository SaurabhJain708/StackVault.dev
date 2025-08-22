"use server";
import { prisma } from "@repo/db";

export async function checkDomain(domain: string): Promise<boolean> {
  try {
    const domainExists = await prisma.user.findUnique({
      where: { url: domain },
    });
    if (domainExists) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error checking domain:", error);
    return false;
  }
}
