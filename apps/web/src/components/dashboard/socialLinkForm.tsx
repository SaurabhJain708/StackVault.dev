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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Platform */}
      <div className="space-y-1">
        <label
          htmlFor="platform"
          className="block text-sm font-medium text-gray-300"
        >
          Platform
        </label>
        <input
          {...register("platform")}
          id="platform"
          type="text"
          placeholder="e.g. LinkedIn"
          className="block w-full rounded-lg bg-gray-800 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.platform && (
          <p className="text-xs text-red-400 mt-1">{errors.platform.message}</p>
        )}
      </div>

      {/* URL */}
      <div className="space-y-1">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-300"
        >
          URL
        </label>
        <input
          {...register("url")}
          id="url"
          type="url"
          placeholder="https://example.com"
          className="block w-full rounded-lg bg-gray-800 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.url && (
          <p className="text-xs text-red-400 mt-1">{errors.url.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Add Link
        </button>
      </div>
    </form>
  );
}
