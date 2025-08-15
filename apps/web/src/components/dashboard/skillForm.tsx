"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { skillInput, skillInputSchema } from "@repo/types";
import { useState } from "react";
import { generateDescription } from "@/lib/ai/gemini";
import { toast } from "sonner";
import GenerateWithAiButton from "./ui/generateWithAiButton";

export default function SkillForm({
  onSubmit,
  isEdit,
}: {
  onSubmit: (data: skillInput) => void;
  isEdit?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<skillInput>({
    resolver: zodResolver(skillInputSchema),
  });

  const [aiState, setAiState] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  async function writeAboutWithAi(
    data?: skillInput,
    existingDescription?: string | null,
  ) {
    setAiState("uploading");
    try {
      const response = await generateDescription(
        `Summarize skill ≤200 char: "${data?.name || ""}". desc: ${existingDescription || ""}.return text.`,
      );
      if (aiState === "uploading") {
        toast.error("AI is already generating a description, please wait.");
        return;
      }
      if (response) {
        setValue("description", response);
        toast.success("Description generated successfully!");
        setAiState("done");
      }
    } catch (error) {
      toast.error("Failed to generate description");
      setAiState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 rounded-xl bg-gray-800 shadow-md"
    >
      <div className="space-y-2">
        <label
          htmlFor="skillName"
          className="block text-sm font-medium text-gray-300"
        >
          Skill Name
        </label>
        <input
          {...register("name")}
          id="skillName"
          type="text"
          placeholder="e.g., React, Python"
          className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300"
        >
          Description <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          placeholder="Write a short description..."
          className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
        <GenerateWithAiButton
          onSubmit={() => {
            const values = getValues() as skillInput;
            writeAboutWithAi(values, values.description);
          }}
        />
        {errors.description && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition"
        >
          {isEdit ? "Update Skill" : "Add Skill"}
        </button>
      </div>
    </form>
  );
}
