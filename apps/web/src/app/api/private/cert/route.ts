import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { certInput, certInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new Response("Please provide a user ID", { status: 400 });
    }

    const certs = await prisma.cert.findMany({
      where: { userId: userid },
      include: { skills: true },
    });

    return Response.json(certs, { status: 200 });
  } catch (error) {
    console.error("Error fetching user certs:", error);
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
    const { cert }: { cert: certInput } = body;
    const { skills, ...certData } = cert;
    console.log("BODY:", body);

    if (!cert) {
      return new Response("Please add a cert", { status: 400 });
    }
    if (certInputSchema.safeParse(cert).success === false) {
      return new Response("Invalid cert data", { status: 400 });
    }
    await prisma.cert.create({
      data: {
        ...certData,
        userId: session.user.id,
        skills: {
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });
    return new Response("Cert added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding user certs:", error);
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
    const { cert }: { cert: certInput & { id: string } } = body;
    const { id, skills, ...certData } = cert;

    if (!id) {
      return new Response("Cert ID is required for update", { status: 400 });
    }
    if (certInputSchema.safeParse(cert).success === false) {
      return new Response("Invalid cert data", { status: 400 });
    }

    // Disconnect all current skills, then reconnect the new ones
    await prisma.cert.update({
      where: { id, userId: session.user.id },
      data: {
        ...certData,
        skills: {
          set: [], // remove existing
          connect: skills?.map((skill) => ({ id: skill.id })) ?? [],
        },
      },
    });

    return new Response("Cert updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating cert:", error);
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
      return new Response("Cert ID is required for deletion", { status: 400 });
    }

    await prisma.cert.delete({
      where: { id, userId: session.user.id },
    });

    return new Response("Cert deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting cert:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
