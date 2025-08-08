"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { certInput, certInputSchema } from "@repo/types";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { useEffect, useState } from "react";

export default function CertForm({
  onSubmit,
  isEdit,
  defaultValues,
}: {
  onSubmit: (data: certInput) => void;
  isEdit?: boolean;
  defaultValues?: certInput;
}) {
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
      if (defaultValues.skills) {
        setSkills(
          defaultValues?.skills.map((s) => ({ id: s.id, name: s.name || "" })),
        );
      }
      if (defaultValues.imageUrl) setCertUrl(defaultValues.imageUrl);
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

  return (
    <>
      <FileUploader Title="Upload Certificate" setUploadUrl={setCertUrl} />
      <SkillsUploader setSkillId={setSkills} skills={skills} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6 rounded-xl bg-gray-800/70 p-6 border border-gray-700 shadow-lg">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Certification Name<span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none text-white px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none text-white px-3 py-2"
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Acquired Date */}
          <div>
            <label
              htmlFor="acquiredAt"
              className="block text-sm font-medium text-white"
            >
              Acquired Date
            </label>
            <input
              {...register("acquiredAt")}
              id="acquiredAt"
              type="date"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none text-white px-3 py-2"
            />
            {errors.acquiredAt && (
              <p className="text-red-400 text-xs mt-1">
                {errors.acquiredAt.message}
              </p>
            )}
          </div>

          {/* Credential URL */}
          <div>
            <label
              htmlFor="credentialUrl"
              className="block text-sm font-medium text-white"
            >
              Credential URL
            </label>
            <input
              {...register("credentialUrl")}
              id="credentialUrl"
              type="url"
              placeholder="https://example.com/cert"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none text-white px-3 py-2"
            />
            {errors.credentialUrl && (
              <p className="text-red-400 text-xs mt-1">
                {errors.credentialUrl.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium transition-all"
            >
              {isEdit ? "Update Certificate" : "Add Certificate"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
