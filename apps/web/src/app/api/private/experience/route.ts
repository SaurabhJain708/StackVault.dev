import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { experienceInput, experienceInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new NextResponse("Please provide a user ID", { status: 400 });
    }

    const experiences = await prisma.experience.findMany({
      where: { userId: userid },
      include: { skills: true },
    });

    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    console.error("Error fetching user experiences:", error);
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
    const { experience }: { experience: experienceInput } = body;
    const { skills, ...experienceData } = experience;

    if (!experience) {
      return new NextResponse("Please add experience data", { status: 400 });
    }
    if (experienceInputSchema.safeParse(experienceData).success === false) {
      return new NextResponse("Invalid experience data", { status: 400 });
    }
    const count = await prisma.experience.count({
      where: { userId: session.user.id },
    });
    if (count > 5) {
      return new NextResponse("Experience limit reached", { status: 403 });
    }

    await prisma.experience.create({
      data: {
        ...experienceData,
        userId: session.user.id,
        skills: {
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new NextResponse("Experience added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding experience:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { id, experience }: { id: string; experience: experienceInput } =
      body;
    const { skills, ...experienceData } = experience;

    if (!id) {
      return new NextResponse("Experience ID is required for update", {
        status: 400,
      });
    }
    if (experienceInputSchema.safeParse(experienceData).success === false) {
      return new NextResponse("Invalid experience data", { status: 400 });
    }

    await prisma.experience.update({
      where: { id, userId: session.user.id },
      data: {
        ...experienceData,
        skills: {
          set: [], // Remove old links first
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new NextResponse("Experience updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating experience:", error);
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

    await prisma.experience.delete({ where: { id, userId: session.user.id } });

    return new NextResponse("Experience deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
