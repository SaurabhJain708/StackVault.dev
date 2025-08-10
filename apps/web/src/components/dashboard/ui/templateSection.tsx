"use client";
import { useGetTemplateById } from "@/lib/query/template";
import { useGetUser } from "@/lib/query/user";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

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
  console.log("Template Data:", template);
  console.log("User Template ID:", templateId);

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
          className="bg-gray-900/80 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-600 transition-colors"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 truncate">
            {template?.name || "Unnamed Template"}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3">
            {template?.description || "No description provided."}
          </p>
          <div className="text-right mt-4">
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
