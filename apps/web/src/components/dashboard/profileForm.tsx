"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userInput, userInputSchema } from "@repo/types";
import { useEffect, useState } from "react";
import { FileUploader } from "./utils/fileUploader";

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
  } = useForm<userInput>({
    resolver: zodResolver(userInputSchema),
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
          />
          {errors.bio && (
            <p className="text-red-400 text-xs">{errors.bio.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Location</label>
          <input
            {...register("location")}
            type="text"
            className="w-full rounded-lg bg-gray-800 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.location && (
            <p className="text-red-400 text-xs">{errors.location.message}</p>
          )}
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
