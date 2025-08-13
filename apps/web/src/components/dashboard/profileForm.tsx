"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { userInput, userInputSchema } from "@repo/types";
import { useEffect, useState } from "react";
import { FileUploader } from "./utils/fileUploader";
import { generateDescription } from "@/lib/ai/gemini";
import { toast } from "sonner";
import GenerateWithAiButton from "./ui/generateWithAiButton";

export default function UserProfileForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: userInput) => void;
  defaultValues: userInput;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      ...defaultValues,
      languages: defaultValues.languages?.length
        ? defaultValues.languages
        : [""],
      causes: defaultValues.causes?.length ? defaultValues.causes : [""],
    },
  });

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setAvatarUrl(defaultValues.avatarUrl ?? "");
      setResumeUrl(defaultValues.resumeUrl ?? "");
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    setValue("avatarUrl", avatarUrl);
  }, [avatarUrl, setValue]);

  useEffect(() => {
    setValue("resumeUrl", resumeUrl);
  }, [resumeUrl, setValue]);

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    // @ts-expect-error: react-hook-form useFieldArray types bug workaround
    name: "languages",
  });
  const {
    fields: causeFields,
    append: appendCause,
    remove: removeCause,
  } = useFieldArray({
    control,
    // @ts-expect-error: react-hook-form useFieldArray types bug workaround
    name: "causes",
  });

  const [aiState, setAiState] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  async function writeAboutWithAi(
    data: userInput,
    existingBio?: string | null,
  ) {
    setAiState("uploading");
    try {
      const response = await generateDescription(
        `Write a concise, engaging bio (max 200 characters) for ${data.name}, age ${data.age}, from ${data.location}. Interests: ${data?.languages?.join(", ")}. Passionate about: ${data?.causes?.join(", ")}. Existing bio: ${existingBio}. Only return text.`,
      );
      if (aiState === "uploading") {
        toast.error("AI is already generating a bio, please wait.");
        return;
      }
      if (response) {
        setValue("bio", response);
        toast.success("Bio generated successfully!");
        setAiState("done");
      }
    } catch (error) {
      toast.error("Failed to generate bio");
      setAiState("error");
    }
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FileUploader Title="Upload Avatar" setUploadUrl={setAvatarUrl} />
        <FileUploader Title="Upload Resume" setUploadUrl={setResumeUrl} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Name</label>
          <input
            {...register("name")}
            type="text"
            maxLength={50}
            className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.name && (
            <p className="text-red-400 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Age</label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.age && (
            <p className="text-red-400 text-xs">{errors.age.message}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            rows={4}
            maxLength={300}
          />
          <GenerateWithAiButton
            state={aiState}
            onSubmit={() => writeAboutWithAi(defaultValues, defaultValues.bio)}
          />
          {errors.bio && (
            <p className="text-red-400 text-xs">{errors.bio.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Stars</label>
          <input
            {...register("stars", { valueAsNumber: true })}
            type="number"
            min={0}
            className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.stars && (
            <p className="text-red-400 text-xs">{errors.stars.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Location</label>
          <input
            {...register("location")}
            type="text"
            maxLength={100}
            placeholder="City, Country"
            className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.location && (
            <p className="text-red-400 text-xs">{errors.location.message}</p>
          )}
        </div>

        {/* Languages */}
        <div>
          <label className="block font-semibold">Languages</label>
          {languageFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`languages.${index}`)}
                placeholder="English, Spanish, etc."
                className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2"
              />
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendLanguage("")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Language
          </button>
        </div>

        {/* Causes */}
        <div>
          <label className="block font-semibold">Causes</label>
          {causeFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`causes.${index}`)}
                placeholder="Environment, Education, etc."
                className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2"
              />
              <button
                type="button"
                onClick={() => removeCause(index)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendCause("")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Cause
          </button>
        </div>

        {/* Available Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("available")}
            id="available"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-800"
          />
          <label htmlFor="available" className="text-sm text-gray-300">
            Available for work
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full transition-colors duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
