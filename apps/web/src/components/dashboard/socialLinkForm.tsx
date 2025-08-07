"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinkInput, socialLinkInputSchema } from "@repo/types";

export default function SocialLinkForm({
  onSubmit,
}: {
  onSubmit: (data: socialLinkInput) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<socialLinkInput>({
    resolver: zodResolver(socialLinkInputSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="platform"
          className="block text-sm font-medium text-gray-400"
        >
          Platform
        </label>
        <input
          {...register("platform")}
          id="platform"
          type="text"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
        />
        {errors.platform && (
          <p className="text-red-400 text-xs mt-1">{errors.platform.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-400"
        >
          URL
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

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
        >
          Add Link
        </button>
      </div>
    </form>
  );
}
