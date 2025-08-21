import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { projectInput, projectInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new NextResponse("Please provide a user ID", { status: 400 });
    }
    const projects = await prisma.project.findMany({
      where: { userId: userid },
      include: { skills: true },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
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
    const { project }: { project: projectInput } = body;
    const { skills, ...projectData } = project;

    if (!project) {
      return new NextResponse("Please add a project", { status: 400 });
    }
    if (projectInputSchema.safeParse(projectData).success === false) {
      return new NextResponse("Invalid project data", { status: 400 });
    }
    const count = await prisma.project.count({
      where: { userId: session.user.id },
    });
    if (count > 5) {
      return new NextResponse("Project limit reached", { status: 403 });
    }
    await prisma.project.create({
      data: {
        ...projectData,
        userId: session.user.id,
        skills: {
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new NextResponse("Project added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
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
    const { id, project }: { id: string; project: projectInput } = body;
    const { skills, ...projectData } = project;

    if (!id) {
      return new NextResponse("Project ID is required for update", {
        status: 400,
      });
    }
    if (projectInputSchema.safeParse(projectData).success === false) {
      return new NextResponse("Invalid project data", { status: 400 });
    }

    await prisma.project.update({
      where: { id, userId: session.user.id },
      data: {
        ...projectData,
        skills: {
          set: [], // remove old skill links
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new NextResponse("Project updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
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

    await prisma.project.delete({ where: { id, userId: session.user.id } });

    return new NextResponse("Project deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
