"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e001b] via-[#1b0033] to-black text-white px-6 py-16 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 text-center"
      >
        About StackVault
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl text-center"
      >
        StackVault.dev is on a mission to make portfolio creation effortless,
        elegant, and empowering — especially for developers and creators in
        emerging markets.
      </motion.p>

      <div className="mt-12 max-w-4xl text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-2">
            🚀 Built for Developers, by Developers
          </h2>
          <p className="text-gray-400">
            StackVault was created by a solo dev who&apos;s been through the
            grind — from late-night LeetCode sessions to job hunt anxiety. This
            tool exists to showcase **your skills, not just your resume**.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-2">
            🧠 Smart Templates, Real Impact
          </h2>
          <p className="text-gray-400">
            Choose from beautifully crafted templates that adapt to your profile
            and your personal brand — not generic PDFs. Whether you&apos;re a
            web dev, AI tinkerer, or blockchain builder, StackVault has your
            back.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-2">
            🌍 Made for World & Beyond
          </h2>
          <p className="text-gray-400">
            Born in India, StackVault is built for the next billion creators.
            Whether you&apos;re a college student, self-taught dev, or career
            switcher — this is your launchpad.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-16"
      >
        <p className="text-sm text-gray-500">
          Built with 💻 + ☕ by{" "}
          <span className="text-purple-400 font-medium">Saurav Jain</span>
        </p>
      </motion.div>
    </div>
  );
}
