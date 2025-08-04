"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { projectInputSchema } from "@repo/types";
import type { projectInput } from "@repo/types";

export const ProjectForm = ({
  onSubmit,
}: {
  onSubmit: (data: projectInput) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectInputSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-400"
        >
          Project Name
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
          Description (optional)
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={3}
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
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-400"
        >
          Image URL (optional)
        </label>
        <input
          {...register("imageUrl")}
          id="imageUrl"
          type="url"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
        />
        {errors.imageUrl && (
          <p className="text-red-400 text-xs mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-400"
        >
          Project URL (optional)
        </label>
        <input
          {...register("url")}
          id="url"
          type="url"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
        />
        {errors.url && (
          <p className="text-red-400 text-xs mt-1">{errors.url.message}</p>
        )}
      </div>

      {/* Hidden userId */}
      <input type="hidden" {...register("userId")} />

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
        >
          Add Project
        </button>
      </div>
    </form>
  );
};
