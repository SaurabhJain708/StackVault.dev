import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { educationInput, educationInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new Response("Please provide a user ID", { status: 400 });
    }

    const educations = await prisma.education.findMany({
      where: { userId: userid },
      include: { skills: true },
    });

    return Response.json(educations, { status: 200 });
  } catch (error) {
    console.error("Error fetching user education:", error);
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
    const { education }: { education: educationInput } = body;
    const { skills, ...educationData } = education;

    if (!education) {
      return new Response("Please provide education data", { status: 400 });
    }
    if (
      educationInputSchema.safeParse(educationData).success === false ||
      (skills?.length && skills.length > 5)
    ) {
      return new Response("Invalid education data", { status: 400 });
    }
    const count = await prisma.education.count({
      where: { userId: session.user.id },
    });
    if (count > 15) {
      return new Response("Education limit reached", { status: 403 });
    }

    await prisma.education.create({
      data: {
        ...educationData,
        userId: session.user.id,
        skills: {
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new Response("Education added successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating education:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { education }: { education: educationInput & { id: string } } = body;
    const { id, skills, ...updateData } = education;

    if (!id) {
      return new Response("Education ID is required for update", {
        status: 400,
      });
    }
    console.log("Update data:", updateData);
    if (
      educationInputSchema.safeParse(updateData).success === false ||
      (skills?.length && skills.length > 5)
    ) {
      return new Response("Invalid education data", { status: 400 });
    }
    await prisma.education.update({
      where: { id, userId: session.user.id },
      data: {
        ...updateData,
        skills: {
          set: [], // clear existing
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new Response("Education updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating education:", error);
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
    const { id }: { id: string } = body;
    if (!id) {
      return new Response("Education ID is required for deletion", {
        status: 400,
      });
    }

    await prisma.education.delete({ where: { id, userId: session.user.id } });

    return new Response("Education deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting education:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
