import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { socialLinkInput, socialLinkInputSchema } from "@repo/types";
import { getServerSession } from "next-auth/";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");
    if (!userid) {
      return new Response("Please provide a user ID", { status: 400 });
    }
    const links = await prisma.socialLink.findMany({
      where: { userId: userid },
    });

    return Response.json(links, { status: 200 });
  } catch (error) {
    console.error("Error fetching social links:", error);
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
    const { link }: { link: socialLinkInput } = body;

    if (!link) {
      return new Response("Please add social link data", { status: 400 });
    }
    if (socialLinkInputSchema.safeParse(link).success === false) {
      return new Response("Invalid social link data", { status: 400 });
    }
    link.userId = session.user.id;
    await prisma.socialLink.create({
      data: link,
    });

    return new Response("Social link added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding social link:", error);
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

    await prisma.socialLink.delete({
      where: { id, userId: session.user.id },
    });

    return new Response("Social link deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
