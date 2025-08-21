import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { socialLinkInput, socialLinkInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new NextResponse("Please provide a user ID", { status: 400 });
    }
    const links = await prisma.socialLink.findMany({
      where: { userId: userid },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { link }: { link: socialLinkInput } = body;

    if (!link) {
      return new NextResponse("Please add social link data", { status: 400 });
    }
    if (socialLinkInputSchema.safeParse(link).success === false) {
      return new NextResponse("Invalid social link data", { status: 400 });
    }
    const count = await prisma.socialLink.count({
      where: { userId: session.user.id },
    });
    if (count > 5) {
      return new NextResponse("Social link limit reached", { status: 403 });
    }
    await prisma.socialLink.create({
      data: { ...link, userId: session.user.id },
    });

    return new NextResponse("Social link added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding social link:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { id } = body;

    await prisma.socialLink.delete({
      where: { id, userId: session.user.id },
    });

    return new NextResponse("Social link deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
