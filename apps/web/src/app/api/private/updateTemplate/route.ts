import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { templateId }: { templateId: string } = body;
    if (!templateId) {
      return new Response("Please provide a template ID", { status: 400 });
    }
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        TemplateId: templateId,
      },
    });
    return new Response("Template updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating template:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
