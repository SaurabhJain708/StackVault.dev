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
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">(
    "idle",
  );

  const handleFileSelect = async (file: File) => {
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
    <div className="space-y-3 rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-md">
      <label className="block text-sm font-medium text-gray-200">{Title}</label>
      <input
        type="file"
        accept=".pdf,.png,.jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="block w-full cursor-pointer rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-white hover:file:bg-blue-500"
      />
      {status === "uploading" && (
        <p className="text-sm text-blue-400">Uploading...</p>
      )}
      {status === "done" && (
        <p className="text-sm text-green-400">Upload successful!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Upload failed.</p>
      )}
    </div>
  );
};
