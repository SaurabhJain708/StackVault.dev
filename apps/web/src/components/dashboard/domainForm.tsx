"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { checkDomain } from "@/lib/actions/checkDomain";
import { domainInput } from "@repo/types";
import { useGetDomains } from "@/lib/query/domain";

export default function DomainForm({
  onSubmit,
  isEdit,
}: {
  onSubmit: (domain: domainInput) => void;
  isEdit: boolean;
}) {
  const { data } = useGetDomains();
  const initialDomain = data?.domain || "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<domainInput>({
    defaultValues: { domain: initialDomain },
  });

  const [loading, setLoading] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDomainSubmit = async (data: { domain: string }) => {
    setLoading(true);
    setDomainError(null);
    setSuccess(false);

    try {
      const available = await checkDomain(data.domain);
      if (!available) {
        setDomainError("🚫 Domain already taken. Try another!");
      } else {
        onSubmit(data);
        setSuccess(true);
      }
    } catch (err) {
      setDomainError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleDomainSubmit)}
      className="space-y-6 p-6 rounded-xl bg-gray-800 shadow-md max-w-md mx-auto"
    >
      <div className="space-y-2">
        <label
          htmlFor="domain"
          className="block text-sm font-medium text-gray-300"
        >
          Custom Domain
        </label>
        <div className="flex items-center space-x-2">
          <input
            {...register("domain", { required: "Domain is required" })}
            id="domain"
            type="text"
            placeholder="e.g., saurav"
            className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
          <span className="text-gray-400">.stackvault.dev</span>
        </div>
        {errors.domain && (
          <p className="text-sm text-red-400">{errors?.domain?.message}</p>
        )}
        {domainError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {domainError}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-green-400"
          >
            ✅ Domain applied successfully!
          </motion.p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`rounded-full px-5 py-2 text-sm font-medium text-white shadow-md transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          }`}
        >
          {loading ? "Checking..." : isEdit ? "Update Domain" : "Add Domain"}
        </button>
      </div>
    </form>
  );
}
