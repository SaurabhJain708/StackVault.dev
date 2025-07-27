import { prisma } from "@repo/db";
import { skillInput, skillInputSchema } from "@repo/types";
import { getServerSession } from "next-auth/";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new Response("Please provide a user ID", { status: 400 });
    }

    const skills = await prisma.skill.findMany({
      where: { userId: userid },
    });

    return Response.json(skills, { status: 200 });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { skill }: { skill: skillInput } = body;

    if (!skill) {
      return new Response("Please add skill data", { status: 400 });
    }
    if (skillInputSchema.safeParse(skill).success === false) {
      return new Response("Invalid skill data", { status: 400 });
    }
    const createdSkill = await prisma.skill.create({
      data: {
        ...skill,
        userId: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Skill added successfully",
        id: createdSkill.id,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error adding skill:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { id } = body;

    await prisma.skill.delete({
      where: { id, userId: session.user.id },
    });

    return new Response("Skill deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
