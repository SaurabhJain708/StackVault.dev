"use client";
import { useGetTemplateById } from "@/lib/query/template";
import { useGetUser } from "@/lib/query/user";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function TemplateSection({
  sectionVariants,
  isInView,
  itemVariants,
  userId,
}: {
  sectionVariants: Variants;
  isInView: boolean;
  itemVariants: Variants;
  userId: string;
}) {
  const { data: user } = useGetUser();
  const templateId = user?.TemplateId;
  const { data: template } = useGetTemplateById(templateId);

  const portfolioLink = `https://www.stackvault.dev/portfolio/${userId}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      id="template"
      className="space-y-6 max-w-4xl mt-16 mx-auto px-4 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <h2
        className="text-2xl text-center font-extrabold tracking-wide
             bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800
             bg-clip-text text-transparent"
      >
        Portfolio Template
      </h2>

      {templateId ? (
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/80 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-600 transition-colors space-y-4"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 truncate">
              {template?.name || "Unnamed Template"}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3">
              {template?.description || "No description provided."}
            </p>
          </div>

          {/* Copy Portfolio Link Section */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-gray-300 text-sm mb-2">
              Share your live portfolio:
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                readOnly
                value={portfolioLink}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white text-sm select-all focus:ring-2 focus:ring-purple-500"
                onFocus={(e) => e.target.select()}
              />
              <button
                onClick={copyToClipboard}
                className="whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-all"
              >
                {copied ? "✅ Copied!" : "📋 Copy Link"}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link
              href="/templates"
              className="inline-block text-sm text-purple-400 font-semibold hover:text-purple-300 underline transition-colors"
            >
              Change Template
            </Link>
          </div>
        </motion.div>
      ) : (
        <Link href="/templates" passHref>
          <motion.div
            variants={itemVariants}
            className="cursor-pointer bg-gray-900/70 p-6 sm:p-8 rounded-2xl shadow-lg border border-dashed border-gray-600 hover:border-purple-600 transition-colors flex flex-col justify-center items-center text-center space-y-2 max-w-full"
          >
            <div className="text-white font-semibold text-lg sm:text-xl tracking-wide">
              No template selected
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs leading-relaxed">
              Build your dream portfolio — explore templates now!
            </p>
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
}
