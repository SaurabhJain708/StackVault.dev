"use client";
import { useGetUser } from "@/lib/query/user";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function TemplateSection({
  sectionVariants,
  isInView,
  itemVariants,
}: {
  sectionVariants: Variants;
  isInView: boolean;
  itemVariants: Variants;
}) {
  const { data: user } = useGetUser();
  const templateId = user?.templateId;
  return (
    <motion.div
      id="template"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <h2 className="text-2xl font-bold text-white">Portfolio Template</h2>

      {templateId ? (
        // <motion.div
        //   variants={itemVariants}
        //   className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700"
        // >
        //   <h3 className="text-lg font-semibold text-white">
        //     {template.name}
        //   </h3>
        //   <p className="text-sm text-gray-400">{template.description}</p>
        //   <div className="text-right mt-4">
        //     <Link href="/templates" className="text-sm text-blue-400 hover:underline">
        //       Change Template
        //     </Link>
        //   </div>
        // </motion.div>
        <p></p>
      ) : (
        <Link href="/templates">
          <motion.div
            variants={itemVariants}
            className="cursor-pointer bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-dashed border-gray-600 hover:border-purple-600 transition-colors text-center"
          >
            <div className="text-white font-medium">No template selected</div>
            <p className="text-gray-400 text-sm mt-1">
              Build your dream portfolio — explore templates now!
            </p>
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
}
