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
    <>
      <FileUploader Title="Upload Avatar" setUploadUrl={setAvatarUrl} />
      <br />
      <FileUploader Title="Upload Resume" setUploadUrl={setResumeUrl} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Age</label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
          {errors.age && (
            <p className="text-red-400 text-xs mt-1">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Bio</label>
          <textarea
            {...register("bio")}
            className="mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
          {errors.bio && (
            <p className="text-red-400 text-xs mt-1">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Location
          </label>
          <input
            {...register("location")}
            type="text"
            className="mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
          {errors.location && (
            <p className="text-red-400 text-xs mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("available")} id="available" />
          <label htmlFor="available" className="text-sm text-gray-400">
            Available for work
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}
