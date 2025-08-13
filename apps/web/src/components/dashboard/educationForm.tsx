"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { educationInput, educationInputSchema } from "@repo/types";
import { useEffect, useState } from "react";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { generateDescription } from "@/lib/ai/gemini";
import { toast } from "sonner";
import GenerateWithAiButton from "./ui/generateWithAiButton";

type skills = { id: string; name: string }[];

export default function EducationForm({
  onSubmit,
  isEdit,
  defaultValues,
}: {
  onSubmit: (data: educationInput) => void;
  isEdit?: boolean;
  defaultValues?: educationInput;
}) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [skillId, setSkillId] = useState<skills>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    getValues,
  } = useForm({
    resolver: zodResolver(educationInputSchema),
    defaultValues,
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
        setSkillId(
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
    if (skillId.length > 0) {
      setValue(
        "skills",
        skillId.map((skill) => ({ id: skill.id })),
      );
    }
  }, [skillId, setValue]);

  const [aiState, setAiState] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  async function writeAboutWithAi(
    data?: educationInput,
    existingDescription?: string | null,
  ) {
    setAiState("uploading");
    try {
      const response = await generateDescription(
        `
Write a concise, engaging description (max 200 characters) for ${data?.degree || "a degree"} from ${data?.institution}${data?.fieldOfStudy ? ", field of study: " + data?.fieldOfStudy : ""}${data?.startDate ? ", started on " + new Date(data?.startDate).toLocaleDateString() : ""}${data?.endDate ? ", ended on " + new Date(data?.endDate).toLocaleDateString() : ""}${data?.grade ? ", grade: " + data?.grade : ""}. Existing description: ${existingDescription || ""}. Only return plain text, do not include extra instructions or formatting.`,
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
    <>
      <div className="mb-6 space-y-4">
        <FileUploader setUploadUrl={setFileUrl} Title="Upload Credential" />
        <SkillsUploader skills={skillId} setSkillId={setSkillId} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-4">
        <input type="hidden" {...register("credentialUrl")} />

        {/* Institution */}
        <div className="space-y-1">
          <label
            htmlFor="institution"
            className="text-sm font-medium text-gray-300"
          >
            Institution
          </label>
          <input
            {...register("institution")}
            id="institution"
            type="text"
            maxLength={100}
            className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
          />
          {errors.institution && (
            <p className="text-red-400 text-xs">{errors.institution.message}</p>
          )}
        </div>

        {/* Degree */}
        <div className="space-y-1">
          <label htmlFor="degree" className="text-sm font-medium text-gray-300">
            Degree
          </label>
          <input
            {...register("degree")}
            id="degree"
            type="text"
            maxLength={100}
            className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
          />
          {errors.degree && (
            <p className="text-red-400 text-xs">{errors.degree.message}</p>
          )}
        </div>

        {/* Field of Study */}
        <div className="space-y-1">
          <label
            htmlFor="fieldOfStudy"
            className="text-sm font-medium text-gray-300"
          >
            Field of Study (optional)
          </label>
          <input
            {...register("fieldOfStudy")}
            id="fieldOfStudy"
            type="text"
            maxLength={100}
            className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
          />
          {errors.fieldOfStudy && (
            <p className="text-red-400 text-xs">
              {errors.fieldOfStudy.message}
            </p>
          )}
        </div>

        {/* Start & End Date */}
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

        {/* Institution URL */}
        <div className="space-y-1">
          <label
            htmlFor="institutionUrl"
            className="text-sm font-medium text-gray-300"
          >
            Institution Website (optional)
          </label>
          <input
            {...register("institutionUrl")}
            id="institutionUrl"
            type="url"
            className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
          />
          {errors.institutionUrl && (
            <p className="text-red-400 text-xs">
              {errors.institutionUrl.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-300"
          >
            Description (max 200 characters)
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows={3}
            maxLength={200}
            className="form-textarea w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
          />
          <GenerateWithAiButton
            state={aiState}
            onSubmit={() => {
              const values = getValues() as educationInput;
              writeAboutWithAi(values, values.description);
            }}
          />

          {errors.description && (
            <p className="text-red-400 text-xs">{errors.description.message}</p>
          )}
        </div>

        {/* Grade */}
        <div className="space-y-1">
          <label htmlFor="grade" className="text-sm font-medium text-gray-300">
            Grade (optional, max 10 characters)
          </label>
          <input
            {...register("grade")}
            id="grade"
            type="text"
            maxLength={10}
            className="form-input w-full bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-2"
          />
          {errors.grade && (
            <p className="text-red-400 text-xs">{errors.grade.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full transition-colors duration-200"
          >
            {isEdit ? "Update Education" : "Add Education"}
          </button>
        </div>
      </form>
    </>
  );
}
