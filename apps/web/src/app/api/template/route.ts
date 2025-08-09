import { prisma } from "@repo/db";

export async function GET(_request: Request) {
  try {
    const templates = await prisma.template.findMany();

    return new Response(JSON.stringify(templates), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(`Failed to fetch templates`, {
      status: 500,
    });
  }
}
