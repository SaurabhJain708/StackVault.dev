"use client";
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
      setSkillId((prev) => [
        ...prev,
        { id: crypto.randomUUID(), name: skill.trim() },
      ]);
      setStatus("done");
      setSkill("");
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-md mt-3 mb-3"
    >
      <label className="block text-sm font-medium text-gray-200">
        Related Skills
      </label>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.id}
            className="bg-blue-800 text-white text-xs px-2 py-1 rounded-full"
          >
            {s.name}
          </span>
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
          className={`block w-full rounded border px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 ${
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
          className={`w-full rounded px-4 py-2 text-sm font-semibold transition ${
            status === "submitting" || !skill.trim() || isMax
              ? "bg-blue-800 text-white cursor-not-allowed opacity-70"
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

      {status === "done" && (
        <p className="text-sm text-green-400">Skill added!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Failed to add skill.</p>
      )}
    </form>
  );
};
