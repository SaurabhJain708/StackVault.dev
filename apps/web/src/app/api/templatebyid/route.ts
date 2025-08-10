import { prisma } from "@repo/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get("templateId");

  if (!templateId) {
    return new Response("Template ID is required", { status: 400 });
  }

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });
    if (!template) {
      return new Response("Template not found", { status: 404 });
    }
    return new Response(JSON.stringify(template), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(`Failed to fetch template`, {
      status: 500,
    });
  }
}
