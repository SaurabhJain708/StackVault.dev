import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { certInput, certInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new NextResponse("Please provide a user ID", { status: 400 });
    }

    const certs = await prisma.cert.findMany({
      where: { userId: userid },
      include: { skills: true },
    });

    return NextResponse.json(certs, { status: 200 });
  } catch (error) {
    console.error("Error fetching user certs:", error);
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
    const { cert }: { cert: certInput } = body;
    const { skills, ...certData } = cert;

    if (!cert) {
      return new NextResponse("Please add a cert", { status: 400 });
    }
    if (certInputSchema.safeParse(certData).success === false) {
      return new NextResponse("Invalid cert data", { status: 400 });
    }
    const count = await prisma.cert.count({
      where: { userId: session.user.id },
    });
    if (count > 6) {
      return new NextResponse("Cert limit reached", { status: 403 });
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
    return new NextResponse("Cert added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding user certs:", error);
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
    const { cert }: { cert: certInput & { id: string } } = body;
    const { id, skills, ...certData } = cert;

    if (!id) {
      return new NextResponse("Cert ID is required for update", {
        status: 400,
      });
    }
    if (certInputSchema.safeParse(certData).success === false) {
      return new NextResponse("Invalid cert data", { status: 400 });
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

    return new NextResponse("Cert updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating cert:", error);
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
    const { id }: { id: string } = body;

    if (!id) {
      return new NextResponse("Cert ID is required for deletion", {
        status: 400,
      });
    }

    await prisma.cert.delete({
      where: { id, userId: session.user.id },
    });

    return new NextResponse("Cert deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting cert:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
