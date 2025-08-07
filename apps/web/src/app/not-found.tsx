"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a002a] via-[#24004a] to-black flex flex-col items-center justify-center text-white px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-[10rem] font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold text-purple-200"
      >
        You&apos;ve reached the edge of the universe.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-gray-400 max-w-md text-center"
      >
        The page you were looking for doesn&apos;t exist, or might&apos;ve been
        removed during a wormhole cleanup.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          href="/"
          className="mt-8 inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-md font-medium text-white shadow-md hover:shadow-purple-800"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
