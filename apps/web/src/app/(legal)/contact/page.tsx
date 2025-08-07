"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e001b] via-[#1b0033] to-black flex flex-col items-center justify-center px-6 py-20 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 text-center"
      >
        Let’s Connect
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl text-center"
      >
        Whether it&apos;s feedback, partnerships, or bug reports — drop us a
        line anytime.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 bg-[#1a002d] border border-purple-800 rounded-xl px-8 py-6 shadow-lg backdrop-blur-md hover:shadow-purple-800/40 transition-shadow"
      >
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-purple-400 text-3xl" />
          <a
            href="mailto:contact.stackvault.dev@gmail.com"
            className="text-lg md:text-xl font-semibold text-purple-300 hover:underline"
          >
            contact.stackvault.dev@gmail.com
          </a>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 text-sm text-gray-500"
      >
        Response time: usually within 24 hours.
      </motion.p>
    </div>
  );
}
