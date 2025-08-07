"use client";

import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e001b] via-[#1b0033] to-black flex flex-col items-center justify-center px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <FaTools className="text-5xl text-purple-500 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text mb-4">
          Blogs Coming Soon
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We&apos;re crafting high-quality articles, guides, and tips on
          personal branding, portfolio building, and launching your dev journey.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Follow us on LinkedIn to get notified when we launch →
          <a
            href="https://www.linkedin.com/company/108249867"
            className="text-purple-400 hover:underline ml-1"
            target="_blank"
          >
            @stackvault_dev
          </a>
        </p>
      </motion.div>
    </div>
  );
}
