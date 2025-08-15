"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { certInput, certInputSchema } from "@repo/types";
import { FileUploader } from "./utils/fileUploader";
import { SkillsUploader } from "./utils/skillUploader";
import { useEffect, useState } from "react";
import { generateDescription } from "@/lib/ai/gemini";
import { toast } from "sonner";
import GenerateWithAiButton from "./ui/generateWithAiButton";

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
    control,
    getValues,
  } = useForm({
    resolver: zodResolver(certInputSchema),
  });

  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [certUrl, setCertUrl] = useState("");

  useEffect(() => {
    if (isEdit && defaultValues) {
      console.log("Default values for edit:", defaultValues); // <--- Add this
      const parsedDefaults = {
        ...defaultValues,
        acquiredAt: defaultValues.acquiredAt
          ? new Date(defaultValues.acquiredAt)
          : undefined,
      };

      reset(parsedDefaults);
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

  const [aiState, setAiState] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  async function writeAboutWithAi(
    data?: certInput,
    existingDescription?: string | null,
  ) {
    setAiState("uploading");
    try {
      const response = await generateDescription(
        `engaging desc for cert ≤200 char: "${data?.name}"${
          data?.acquiredAt ? " acq on " + data.acquiredAt.toDateString() : ""
        }.desc: ${existingDescription || ""}.return text`,
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
      <FileUploader Title="Upload Certificate" setUploadUrl={setCertUrl} />
      <SkillsUploader setSkillId={setSkills} skills={skills} />
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("✅ Form submitted with:", data);
            onSubmit(data);
          },
          (formErrors) => {
            console.error("❌ Form validation failed:", formErrors);
          },
        )}
        className="space-y-6"
      >
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
              maxLength={100}
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
              maxLength={200}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none text-white px-3 py-2"
            />
            <GenerateWithAiButton
              onSubmit={() => {
                const values = getValues() as certInput;
                writeAboutWithAi(values, values.description);
              }}
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Acquired Date */}
          <Controller
            control={control}
            name="acquiredAt"
            render={({ field }) => (
              <div>
                <label
                  htmlFor="acquiredAt"
                  className="block text-sm font-medium text-white"
                >
                  Acquired Date
                </label>
                <input
                  id="acquiredAt"
                  type="date"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                  className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none text-white px-3 py-2"
                />
                {errors.acquiredAt && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.acquiredAt.message}
                  </p>
                )}
              </div>
            )}
          />

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
