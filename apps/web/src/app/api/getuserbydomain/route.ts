import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    if (!domain) {
      return new NextResponse("Domain is required", { status: 400 });
    }
    const userId = await prisma.user.findUnique({
      where: { url: domain },
      select: { id: true },
    });
    if (!userId) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json({ userId: userId.id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user by domain:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
