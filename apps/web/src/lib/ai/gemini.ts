"use server";

import { GoogleGenAI } from "@google/genai";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";

const ai = new GoogleGenAI({});
const session = await getServerSession();
if (!session?.user?.id) throw new Error("Not authenticated");

async function main(prompt: string) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }
  try {
    const userTokenUsage = await prisma.tokenUsage.findUnique({
      where: { userId: session?.user?.id },
    });
    if (!userTokenUsage || userTokenUsage.tokens <= 0) {
      throw new Error("Insufficient tokens");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const { usageMetadata } = response;
    const usedTokens = usageMetadata?.totalTokenCount ?? 0;

    await prisma.tokenUsage.update({
      where: { userId: session?.user.id },
      data: {
        tokens: userTokenUsage.tokens - usedTokens,
      },
    });

    return response.text;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
}

export async function generateDescription(prompt: string) {
  const response = await main(prompt);
  if (!response) {
    throw new Error("Failed to generate description");
  }
  return response;
}
