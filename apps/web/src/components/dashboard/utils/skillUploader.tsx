"use client";
import { useCreateSkill, useDeleteSkill } from "@/lib/query/createSkill";
import React, { useState } from "react";

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

  const [skill, setSkill] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");

  const isMax = skills.length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill.trim() || isMax) return;

    setStatus("submitting");
    try {
      const response = await mutateAsync({ name: skill.trim() });

      setSkillId((prev) => [...prev, { id: response.id, name: skill.trim() }]);

      setStatus("done");
      setSkill("");
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
    }
  };

  const deleteSkill = useDeleteSkill();

  const handleDeleteSkill = (id: string) => {
    deleteSkill.mutate(id);
    skills.filter((skill) => skill.id !== id);
    setSkillId((prev) => prev.filter((skill) => skill.id !== id));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-xl mt-6 mb-8"
    >
      <label className="block text-sm font-semibold text-gray-300">
        Related Skills
      </label>

      {/* Skill Tags */}
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

      {/* Skill Input */}
      {!isMax && (
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="e.g. TypeScript"
          disabled={isMax}
          className={`block w-full rounded-md border px-4 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
            isMax
              ? "bg-gray-700 border-gray-600 cursor-not-allowed opacity-70"
              : "bg-gray-800 border-gray-600 focus:ring-blue-500"
          }`}
        />
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
