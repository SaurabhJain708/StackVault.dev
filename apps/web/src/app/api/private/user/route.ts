import { PrismaClient } from "@repo/db";
import { userInput, userInputSchema } from "@repo/types";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { user }: { user: userInput } = body;
  if (!user) {
    return new Response("Please add user data", { status: 400 });
  }
  if (userInputSchema.safeParse(user).success === false) {
    return new Response("Invalid user data", { status: 400 });
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });
    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }
    const newUser = await prisma.user.create({
      data: user,
    });
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { user }: { user: userInput } = body;
  if (!user || !user.email) {
    return new Response("Please provide user data with email", { status: 400 });
  }
  if (userInputSchema.safeParse(user).success === false) {
    return new Response("Invalid user data", { status: 400 });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: user,
    });
    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
