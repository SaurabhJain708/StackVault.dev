"use server";

import { GoogleGenAI } from "@google/genai";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { InsufficientTokensError } from "../types/error";

const ai = new GoogleGenAI({});

async function main(prompt: string) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Not authenticated");

    const userTokenUsage = await prisma.tokenUsage.findUnique({
      where: { userId: session?.user?.id },
    });
    if (!userTokenUsage || userTokenUsage.tokens <= 0) {
      throw new InsufficientTokensError();
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
    console.error("AI generation error:", error);
    throw new Error("Failed to generate description");
  }
}

export async function generateDescription(prompt: string) {
  try {
    const response = await main(prompt);
    if (!response) throw new Error("Empty response from AI");
    return response;
  } catch (error) {
    if (error instanceof InsufficientTokensError) throw error;
    throw new Error("Failed to generate description");
  }
}
