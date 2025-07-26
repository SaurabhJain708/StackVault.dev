import { PrismaClient } from "@repo/db";
import { skillInput, skillInputSchema } from "@repo/types";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { userid } = body;

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
    const body = await request.json();
    const { skill }: { skill: skillInput } = body;

    if (!skill) {
      return new Response("Please add skill data", { status: 400 });
    }
    if (skillInputSchema.safeParse(skill).success === false) {
      return new Response("Invalid skill data", { status: 400 });
    }

    await prisma.skill.create({
      data: skill,
    });

    return new Response("Skill added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding skill:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.skill.delete({
      where: { id },
    });

    return new Response("Skill deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
