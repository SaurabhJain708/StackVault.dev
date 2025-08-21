import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const domain = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { url: true },
  });
  if (!domain) {
    return new NextResponse("Domain not found", { status: 404 });
  }
  return NextResponse.json({ domain: domain.url }, { status: 200 });
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { domain }: { domain: string } = body;
    if (!domain) {
      return new NextResponse("Please provide a domain", { status: 400 });
    }
    const checkDomain = await prisma.user.findUnique({
      where: { url: domain },
    });
    if (checkDomain) {
      return new NextResponse("Domain already taken", { status: 400 });
    }
    await prisma.user.update({
      where: { id: session.user.id },
      data: { url: domain },
    });
    return new NextResponse("Domain updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating domain:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
