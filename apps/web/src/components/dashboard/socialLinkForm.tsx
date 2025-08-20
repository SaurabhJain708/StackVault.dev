"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinkInput, socialLinkInputSchema } from "@repo/types";
import SocialMediaBadge from "@/lib/SocialMediaBadge";

// common platforms (could move to constants)
const SOCIAL_PLATFORMS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/" },
  { name: "GitHub", url: "https://github.com/" },
  { name: "Twitter", url: "https://twitter.com/" },
  { name: "Instagram", url: "https://instagram.com/" },
  { name: "Facebook", url: "https://facebook.com/" },
  { name: "YouTube", url: "https://youtube.com/" },
  { name: "Hashnode", url: "https://hashnode.com/" },
  { name: "Dev.to", url: "https://dev.to/" },
];

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
          onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
          placeholder="e.g. LinkedIn"
          className="block w-full rounded-lg bg-gray-800 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Dropdown */}
        {showDropdown && filteredPlatforms.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredPlatforms.map((p) => (
              <li
                key={p.name}
                onMouseDown={() => {
                  setPlatformQuery(p.name);
                  setValue("platform", p.name, { shouldValidate: true });
                  setValue("url", p.url, { shouldValidate: true });
                  setTimeout(() => {
                    setShowDropdown(false);
                  }, 100);
                }}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-200 hover:bg-blue-600"
              >
                <SocialMediaBadge name={p.name} />
                <span>{p.name}</span>
              </li>
            ))}
          </ul>
        )}

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
