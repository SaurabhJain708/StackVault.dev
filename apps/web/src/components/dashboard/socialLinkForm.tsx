"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinkInput, socialLinkInputSchema } from "@repo/types";
import { SOCIAL_PLATFORMS, SOCIAL_MEDIA_ICONS } from "@/lib/social-media-icons";
import SocialMediaBadge from "@/lib/socialMediaBadge";

export default function SocialLinkForm({
  onSubmit,
}: {
  onSubmit: (data: socialLinkInput) => void;
}) {
  const [platformQuery, setPlatformQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<socialLinkInput>({
    resolver: zodResolver(socialLinkInputSchema),
  });

  // filter dropdown options based on input
  const filteredPlatforms = SOCIAL_PLATFORMS.filter((p) =>
    p.name.toLowerCase().includes(platformQuery.toLowerCase()),
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
      {/* Platform */}
      <div className="space-y-1 relative">
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
          value={platformQuery}
          onChange={(e) => {
            setPlatformQuery(e.target.value);
            setShowDropdown(true);
            setValue("platform", e.target.value, { shouldValidate: true });
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          placeholder="e.g. LinkedIn"
          className="block w-full rounded-lg bg-gray-800 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Dropdown */}
        {showDropdown && filteredPlatforms.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredPlatforms.map((p) => {
              const Icon = SOCIAL_MEDIA_ICONS[p.name];
              return (
                <li
                  key={p.name}
                  onMouseDown={() => {
                    setPlatformQuery(p.name);
                    setValue("platform", p.name, { shouldValidate: true });
                    setValue("url", p.url, { shouldValidate: true });
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-sm text-gray-200 flex items-center gap-3"
                >
                  {Icon ? (
                    <Icon className="w-4 h-4" />
                  ) : (
                    <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {p.name.charAt(0)}
                    </span>
                  )}
                  <span>{p.name}</span>
                  {p.category && (
                    <span className="ml-auto text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                      {p.category}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {errors.platform && (
          <p className="text-xs text-red-400 mt-1">{errors.platform.message}</p>
        )}
        
        {/* Platform Preview */}
        {platformQuery && SOCIAL_MEDIA_ICONS[platformQuery] && (
          <div className="mt-2">
            <SocialMediaBadge platform={platformQuery} size="small" />
          </div>
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
