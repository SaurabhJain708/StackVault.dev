"use client";
import { useCreateSkill, useDeleteSkill } from "@/lib/query/createSkill";
import SkillBadge from "@/lib/skillBadge";
import React, { useState } from "react";
import { PREDEFINED_SKILLS } from "@/lib/predefinedskills";

export const SkillsUploader = ({
  setSkillId,
  skills = [],
}: {
  setSkillId: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  skills?: { id: string; name: string }[];
}) => {
  const { mutateAsync } = useCreateSkill();
  const deleteSkill = useDeleteSkill();

  const [skill, setSkill] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  const [showDropdown, setShowDropdown] = useState(false);

  const isMax = skills.length >= 5;

  const addSkill = async (name: string) => {
    if (!name.trim() || isMax) return;
    setStatus("submitting");
    try {
      const response = await mutateAsync({ name: name.trim() });
      setSkillId((prev) => [...prev, { id: response.id, name: name.trim() }]);
      setStatus("done");
      setSkill("");
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSkill(skill);
  };

  const handleDeleteSkill = (id: string) => {
    deleteSkill.mutate(id);
    setSkillId((prev) => prev.filter((skill) => skill.id !== id));
  };

  const filteredSuggestions = PREDEFINED_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(skill.toLowerCase()) &&
      !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase()),
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-xl mt-6 mb-8"
    >
      <label className="block text-sm font-semibold text-gray-300">
        Related Skills
      </label>

      {/* Current Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <div
            key={s.id}
            className="flex items-center bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm"
          >
            <span>{s.name}</span>
            <button
              type="button"
              onClick={() => handleDeleteSkill(s.id)}
              className="ml-2 hover:text-red-200 transition"
              aria-label={`Remove ${s.name}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Input with dropdown */}
      {!isMax && (
        <div className="relative">
          <input
            type="text"
            value={skill}
            onChange={(e) => {
              e.stopPropagation();
              setSkill(e.target.value);
              setShowDropdown(true);
            }}
            onClick={() => setShowDropdown((prev) => !prev)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
            placeholder="e.g. TypeScript"
            className="block w-full rounded-md border px-4 py-2 text-sm text-gray-100 placeholder-gray-400 bg-gray-800 border-gray-600 focus:ring-blue-500"
          />

          {showDropdown && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-md border border-gray-700 bg-gray-800 shadow-lg">
              {filteredSuggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => {
                    setSkill(s);
                    setTimeout(() => {
                      setShowDropdown(false);
                    }, 100);
                  }}
                  className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-200 hover:bg-blue-600"
                >
                  <SkillBadge name={s} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Submit Button */}
      {!isMax && (
        <button
          type="submit"
          disabled={!skill.trim() || status === "submitting" || isMax}
          className={`w-full rounded-md px-4 py-2 text-sm font-semibold transition duration-200 ${
            status === "submitting" || !skill.trim() || isMax
              ? "bg-blue-800 text-white cursor-not-allowed opacity-60"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {isMax
            ? "Max 5 skills allowed"
            : status === "submitting"
              ? "Submitting..."
              : "Add Skill"}
        </button>
      )}

      {/* Status Messages */}
      {status === "done" && (
        <p className="text-sm text-green-400 font-medium">Skill added!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400 font-medium">Failed to add skill.</p>
      )}
    </form>
  );
};
