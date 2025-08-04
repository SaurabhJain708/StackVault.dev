"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { skillInput, skillInputSchema } from "@repo/types";

export const SkillForm = ({
  onSubmit,
}: {
  onSubmit: (data: skillInput) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<skillInput>({
    resolver: zodResolver(skillInputSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="skillName"
          className="block text-sm font-medium text-gray-400"
        >
          Skill Name
        </label>
        <input
          {...register("name")}
          id="skillName"
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

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
        >
          Add Skill
        </button>
      </div>
    </form>
  );
};
