"use client";
import axios from "axios";
import React, { useState } from "react";

export const FileUploader = ({
  Title,
  setUploadUrl,
}: {
  Title: string;
  setUploadUrl: (url: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/api/private/fileUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!data.url) throw new Error("Upload failed");

      setUploadUrl(data.url); // Cloudinary URL
      setStatus("done");
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-md"
    >
      <label className="block text-sm font-medium text-gray-200">{Title}</label>
      <input
        type="file"
        accept=".pdf,.png,.jpg"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full cursor-pointer rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-white hover:file:bg-blue-500"
      />
      <button
        type="submit"
        disabled={!file || status === "uploading"}
        className={`w-full rounded px-4 py-2 text-sm font-semibold transition ${
          status === "uploading" || !file
            ? "bg-blue-800 text-white cursor-not-allowed opacity-70"
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
      >
        {status === "uploading" ? "Uploading..." : "Upload"}
      </button>
      {status === "done" && (
        <p className="text-sm text-green-400">Upload successful!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Upload failed.</p>
      )}
    </form>
  );
};
