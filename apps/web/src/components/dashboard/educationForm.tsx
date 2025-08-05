"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { educationInput, educationInputSchema } from "@repo/types";
import { useEffect, useState } from "react";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";

type skills = { id: string; name: string }[];

export const EducationForm = ({
  onSubmit,
  isEdit,
  defaultValues,
}: {
  onSubmit: (data: educationInput) => void;
  isEdit?: boolean;
  defaultValues?: educationInput;
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [skillId, setSkillId] = useState<skills>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(educationInputSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEdit && defaultValues) {
      reset(defaultValues);
    }
  }, [isEdit, defaultValues, reset]);

  useEffect(() => {
    if (fileUrl) {
      reset((prevValues) => ({
        ...prevValues,
        credentialUrl: fileUrl,
      }));
    }
  }, [fileUrl]);
  useEffect(() => {
    if (skillId.length > 0) {
      const currentVal = getValues();
      reset({
        ...currentVal,
        skills: skillId.map((skill) => ({ id: skill.id })),
      });
    }
  }, [skillId]);

  return (
    <>
      <FileUploader setUploadUrl={setFileUrl} Title="Upload Credential" />
      <SkillsUploader skills={skillId} setSkillId={setSkillId} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-3">
        <input type="hidden" {...register("credentialUrl")} />

        <div>
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-gray-400"
          >
            Institution
          </label>
          <input
            {...register("institution")}
            id="institution"
            type="text"
            maxLength={100}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.institution && (
            <p className="text-red-400 text-xs mt-1">
              {errors.institution.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-gray-400"
          >
            Degree
          </label>
          <input
            {...register("degree")}
            id="degree"
            type="text"
            maxLength={100}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.degree && (
            <p className="text-red-400 text-xs mt-1">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="fieldOfStudy"
            className="block text-sm font-medium text-gray-400"
          >
            Field of Study (optional)
          </label>
          <input
            {...register("fieldOfStudy")}
            id="fieldOfStudy"
            type="text"
            maxLength={100}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.fieldOfStudy && (
            <p className="text-red-400 text-xs mt-1">
              {errors.fieldOfStudy.message}
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
            htmlFor="institutionUrl"
            className="block text-sm font-medium text-gray-400"
          >
            Institution Website (optional)
          </label>
          <input
            {...register("institutionUrl")}
            id="institutionUrl"
            type="url"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.institutionUrl && (
            <p className="text-red-400 text-xs mt-1">
              {errors.institutionUrl.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400"
          >
            Description (max 200 characters)
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows={3}
            maxLength={200}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-gray-400"
          >
            Grade (optional, max 10 characters)
          </label>
          <input
            {...register("grade")}
            id="grade"
            type="text"
            maxLength={10}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.grade && (
            <p className="text-red-400 text-xs mt-1">{errors.grade.message}</p>
          )}
        </div>
        {/* skills[] and activities[] could be added later with tag inputs or multiselects and capped at 5 entries */}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            {isEdit ? "Update Education" : "Add Education"}
          </button>
        </div>
      </form>
    </>
  );
};
