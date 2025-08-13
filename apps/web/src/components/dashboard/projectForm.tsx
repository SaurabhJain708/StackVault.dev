"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { projectInputSchema } from "@repo/types";
import type { projectInput } from "@repo/types";
import { useEffect, useState } from "react";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { generateDescription } from "@/lib/ai/gemini";
import { toast } from "sonner";
import GenerateWithAiButton from "./ui/generateWithAiButton";

export default function ProjectForm({
  onSubmit,
  isEdit,
  defaultValues,
}: {
  onSubmit: (data: projectInput) => void;
  isEdit?: boolean;
  defaultValues?: projectInput;
}) {
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [certUrl, setCertUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(projectInputSchema),
  });

  useEffect(() => {
    if (isEdit && defaultValues) {
      if (defaultValues.skills) {
        setSkills(
          defaultValues?.skills.map((s) => ({ id: s.id, name: s.name || "" })),
        );
      }
      reset(defaultValues);
      setValue("id", defaultValues.id);
    }
  }, [isEdit, defaultValues, reset, setValue]);

  useEffect(() => {
    if (certUrl) {
      setValue("imageUrl", certUrl);
    }
  }, [certUrl, setValue]);

  useEffect(() => {
    if (skills.length > 0) {
      setValue(
        "skills",
        skills.map((skill) => ({ id: skill.id })),
      );
    }
  }, [skills, setValue]);

  const [aiState, setAiState] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  async function writeAboutWithAi(
    data?: projectInput,
    existingDescription?: string | null,
  ) {
    setAiState("uploading");
    try {
      const response = await generateDescription(
        `Summarize a project in ≤200 characters: "${data?.name || "Unnamed project"}"${data?.skills?.length ? `, skills: ${data.skills.map((s) => s.name).join(", ")}` : ""}${data?.url ? `, URL: ${data.url}` : ""}. Existing: ${existingDescription || ""}. Only return plain text.`,
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
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg space-y-6">
      <FileUploader Title="Upload Project Image" setUploadUrl={setCertUrl} />
      <SkillsUploader setSkillId={setSkills} skills={skills} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Project Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            maxLength={100}
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description (optional)
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows={3}
            maxLength={200}
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <GenerateWithAiButton
            state={aiState}
            onSubmit={() => {
              const values = getValues() as projectInput;
              writeAboutWithAi(values, values.description);
            }}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-300"
          >
            Project URL (optional)
          </label>
          <input
            {...register("url")}
            id="url"
            type="url"
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.url && (
            <p className="mt-1 text-xs text-red-400">{errors.url.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-purple-600 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
