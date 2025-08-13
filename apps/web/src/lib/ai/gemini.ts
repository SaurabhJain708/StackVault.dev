"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

await main("Explain how AI works in a few words");

export async function generateDescription(prompt: string) {
  const response = await main(prompt);
  if (!response) {
    throw new Error("Failed to generate description");
  }
  return response;
}
