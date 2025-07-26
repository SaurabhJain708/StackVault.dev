import { PrismaClient } from "@repo/db";
import { projectInput, projectInputSchema } from "@repo/types";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { userid } = body;

    const projects = await prisma.project.findMany({
      where: { userId: userid },
      include: { skills: true },
    });

    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project }: { project: projectInput } = body;
    const { skills, ...projectData } = project;

    if (!project) {
      return new Response("Please add a project", { status: 400 });
    }
    if (projectInputSchema.safeParse(project).success === false) {
      return new Response("Invalid project data", { status: 400 });
    }

    await prisma.project.create({
      data: {
        ...projectData,
        skills: {
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new Response("Project added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, project }: { id: string; project: projectInput } = body;
    const { skills, ...projectData } = project;

    if (!id) {
      return new Response("Project ID is required for update", { status: 400 });
    }
    if (projectInputSchema.safeParse(project).success === false) {
      return new Response("Invalid project data", { status: 400 });
    }

    await prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        skills: {
          set: [], // remove old skill links
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new Response("Project updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.project.delete({ where: { id } });

    return new Response("Project deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
