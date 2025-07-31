import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { userInput, userInputSchema } from "@repo/types";
import { getServerSession } from "next-auth/";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const { user }: { user: userInput } = body;
  if (!user) {
    return new Response("Please provide user data", { status: 400 });
  }

  if (userInputSchema.safeParse(user).success === false) {
    return new Response("Invalid user data", { status: 400 });
  }
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: user,
    });
    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
