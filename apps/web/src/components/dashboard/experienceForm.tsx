"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { experienceInputSchema } from "@repo/types";
import type { experienceInput } from "@repo/types";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { useEffect, useState } from "react";

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
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(experienceInputSchema),
  });
  useEffect(() => {
    if (isEdit && defaultValues) {
      reset(defaultValues);
      setValue("id", defaultValues.id);
    }
  }, [isEdit, defaultValues, reset]);

  useEffect(() => {
    if (fileUrl) {
      setValue("credentialUrl", fileUrl);
    }
  }, [fileUrl]);
  useEffect(() => {
    if (skills.length > 0) {
      setValue(
        "skills",
        skills.map((skill) => ({ id: skill.id })),
      );
    }
  }, [skills]);

  return (
    <>
      <FileUploader
        setUploadUrl={setFileUrl}
        Title={"Upload Experience Document"}
      />
      <SkillsUploader setSkillId={setSkills} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-400"
          >
            Company
          </label>
          <input
            {...register("company")}
            id="company"
            type="text"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.company && (
            <p className="text-red-400 text-xs mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-400"
          >
            Position
          </label>
          <input
            {...register("position")}
            id="position"
            type="text"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.position && (
            <p className="text-red-400 text-xs mt-1">
              {errors.position.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-400"
            >
              Start Date
            </label>
            <input
              {...register("startDate")}
              id="startDate"
              type="date"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            />
            {errors.startDate && (
              <p className="text-red-400 text-xs mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-400"
            >
              End Date (optional)
            </label>
            <input
              {...register("endDate")}
              id="endDate"
              type="date"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            />
            {errors.endDate && (
              <p className="text-red-400 text-xs mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="companyUrl"
            className="block text-sm font-medium text-gray-400"
          >
            Company Website (optional)
          </label>
          <input
            {...register("companyUrl")}
            id="companyUrl"
            type="url"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.companyUrl && (
            <p className="text-red-400 text-xs mt-1">
              {errors.companyUrl.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400"
          >
            Description (optional)
          </label>
          <textarea
            {...register("description")}
            id="description"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-400"
          >
            Company Logo URL (optional)
          </label>
          <input
            {...register("imageUrl")}
            id="imageUrl"
            type="url"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.imageUrl && (
            <p className="text-red-400 text-xs mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            {isEdit ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </form>
    </>
  );
}
