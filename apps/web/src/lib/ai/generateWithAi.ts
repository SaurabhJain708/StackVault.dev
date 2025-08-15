import { toast } from "sonner";
import { generateDescription } from "./gemini";
import { Path, PathValue, UseFormSetValue } from "react-hook-form";
import { useAIStore } from "@/lib/zustand/aiState";
import { InsufficientTokensError } from "../types/error";

export async function writeWithAi<T extends Record<string, unknown>>(
  prompt: string,
  setValue: UseFormSetValue<T>,
  fieldName: Path<T>,
) {
  const aiState = useAIStore.getState().aiState;
  const setAIState = useAIStore.getState().setAIState;

  if (aiState === "uploading") {
    toast.error("AI is already generating, please wait.");
    return;
  }

  setAIState("uploading");

  try {
    const response = await generateDescription(prompt);

    if (response) {
      setValue(fieldName, response as PathValue<T, typeof fieldName>);
      toast.success("Text generated successfully!");
      setAIState("done");
    }
  } catch (error) {
    if (error instanceof InsufficientTokensError) {
      toast.warning("Insufficient tokens, Upgrade to Premium");
    } else {
      toast.error("Failed to generate text");
    }
    setAIState("error");
  }
}
