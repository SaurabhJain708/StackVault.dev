import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { userInput, userInputSchema } from "@repo/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      console.log("User not found:", session?.user.id);

      return new NextResponse("User not found", { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const { user }: { user: userInput } = body;
  if (!user) {
    return new NextResponse("Please provide user data", { status: 400 });
  }

  if (userInputSchema.safeParse(user).success === false) {
    return new NextResponse("Invalid user data", { status: 400 });
  }
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: user,
    });
    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
