import { PrismaClient } from "@repo/db";
import { socialLinkInput, socialLinkInputSchema } from "@repo/types";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { userid } = body;

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
    const body = await request.json();
    const { link }: { link: socialLinkInput } = body;

    if (!link) {
      return new Response("Please add social link data", { status: 400 });
    }
    if (socialLinkInputSchema.safeParse(link).success === false) {
      return new Response("Invalid social link data", { status: 400 });
    }

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
    const body = await request.json();
    const { id } = body;

    await prisma.socialLink.delete({
      where: { id },
    });

    return new Response("Social link deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
