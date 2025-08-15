"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { experienceInputSchema } from "@repo/types";
import type { experienceInput } from "@repo/types";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { useEffect, useState } from "react";
import { generateDescription } from "@/lib/ai/gemini";
import { toast } from "sonner";
import GenerateWithAiButton from "./ui/generateWithAiButton";

export default function ExperienceForm({
  onSubmit,
  isEdit,
  defaultValues,
}: {
  onSubmit: (data: experienceInput) => void;
  isEdit?: boolean;
  defaultValues?: experienceInput;
}) {
  const [fileUrl, setFileUrl] = useState("");
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    control,
    getValues,
  } = useForm({
    resolver: zodResolver(experienceInputSchema),
  });

  useEffect(() => {
    if (isEdit && defaultValues) {
      const parsedDefaults = {
        ...defaultValues,
        startDate: defaultValues.startDate
          ? new Date(defaultValues.startDate)
          : undefined,
        endDate: defaultValues.endDate
          ? new Date(defaultValues.endDate)
          : undefined,
      };
      reset(parsedDefaults);
      setValue("id", defaultValues.id);
      if (defaultValues.skills) {
        setSkills(
          defaultValues?.skills.map((s) => ({ id: s.id, name: s.name || "" })),
        );
      }
    }
  }, [isEdit, defaultValues, reset, setValue]);

  useEffect(() => {
    if (fileUrl) {
      setValue("imageUrl", fileUrl);
    }
  }, [fileUrl, setValue]);

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
    data?: experienceInput,
    existingDescription?: string | null,
  ) {
    setAiState("uploading");
    try {
      const response = await generateDescription(
        `engaging description ≤200 characters: ${data?.position || "a position"}${data?.company ? ` at ${data.company}` : ""}${data?.startDate ? `, started on ${new Date(data.startDate).toLocaleDateString()}` : ""}${data?.endDate ? `, ended ${new Date(data.endDate).toLocaleDateString()}` : ""} desc: ${existingDescription || ""}.return text.`,
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
      <FileUploader
        setUploadUrl={setFileUrl}
        Title="Upload Experience Document"
      />
      <SkillsUploader setSkillId={setSkills} skills={skills} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-300"
          >
            Company
          </label>
          <input
            {...register("company")}
            id="company"
            type="text"
            maxLength={100}
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-300"
          >
            Position
          </label>
          <input
            {...register("position")}
            id="position"
            type="text"
            maxLength={100}
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.position && (
            <p className="mt-1 text-xs text-red-400">
              {errors.position.message}
            </p>
          )}
        </div>

        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <div className="space-y-1">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-300"
              >
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? new Date(e.target.value) : undefined,
                  )
                }
                className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
              />
              {errors.startDate && (
                <p className="text-red-400 text-xs">
                  {errors.startDate.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <div className="space-y-1">
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-300"
              >
                End Date (optional)
              </label>
              <input
                id="endDate"
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? new Date(e.target.value) : undefined,
                  )
                }
                className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
              />
              {errors.endDate && (
                <p className="text-red-400 text-xs">{errors.endDate.message}</p>
              )}
            </div>
          )}
        />

        <div>
          <label
            htmlFor="companyUrl"
            className="block text-sm font-medium text-gray-300"
          >
            Company Website (optional)
          </label>
          <input
            {...register("companyUrl")}
            id="companyUrl"
            type="url"
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.companyUrl && (
            <p className="mt-1 text-xs text-red-400">
              {errors.companyUrl.message}
            </p>
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
              const values = getValues() as experienceInput;
              writeAboutWithAi(values, values.description);
            }}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-purple-600 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </form>
    </div>
  );
}
