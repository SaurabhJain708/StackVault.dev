"use client";

import { motion } from "framer-motion";
import { HiOutlineBriefcase } from "react-icons/hi";

export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e001b] via-[#1b0033] to-black flex flex-col items-center justify-center px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <HiOutlineBriefcase className="text-6xl text-purple-500 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text mb-4">
          Careers at StackVault
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We&apos;re not hiring *yet*, but we will be soon.
          <br />
          If you&apos;re passionate about web development, design systems, or
          helping others build their personal brand — stay tuned.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Opportunities are coming. Meanwhile, drop a &quot;hi&quot; at{" "}
          <a
            href="mailto:contact.stackvault.dev@gmail.com"
            className="text-purple-400 hover:underline"
          >
            contact.stackvault.dev@gmail.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
