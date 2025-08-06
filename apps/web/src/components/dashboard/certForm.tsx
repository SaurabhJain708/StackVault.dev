"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { certInput, certInputSchema } from "@repo/types";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { useEffect, useState } from "react";

export const CertForm = ({
  onSubmit,
  isEdit,
  defaultValues,
}: {
  onSubmit: (data: certInput) => void;
  isEdit?: boolean;
  defaultValues?: certInput;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(certInputSchema),
  });
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [certUrl, setCertUrl] = useState("");
  useEffect(() => {
    if (isEdit && defaultValues) {
      reset(defaultValues);
      setValue("id", defaultValues.id);
    }
  }, [isEdit, defaultValues, reset]);

  useEffect(() => {
    if (certUrl) {
      setValue("imageUrl", certUrl);
    }
  }, [certUrl]);
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
      <FileUploader Title={"Upload Certificate"} setUploadUrl={setCertUrl} />
      <SkillsUploader setSkillId={setSkills} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400"
          >
            Certification Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
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
            htmlFor="acquiredAt"
            className="block text-sm font-medium text-gray-400"
          >
            Acquired Date
          </label>
          <input
            {...register("acquiredAt")}
            id="acquiredAt"
            type="date"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.acquiredAt && (
            <p className="text-red-400 text-xs mt-1">
              {errors.acquiredAt.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="credentialUrl"
            className="block text-sm font-medium text-gray-400"
          >
            Credential URL
          </label>
          <input
            {...register("credentialUrl")}
            id="credentialUrl"
            type="url"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
          />
          {errors.credentialUrl && (
            <p className="text-red-400 text-xs mt-1">
              {errors.credentialUrl.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            {isEdit ? "Update Cert" : "Add Cert"}
          </button>
        </div>
      </form>
    </>
  );
};
