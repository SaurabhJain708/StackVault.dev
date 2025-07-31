"use client";
import React from "react";
import { easeInOut, motion, easeOut, easeIn } from "framer-motion";

// Main App component for the loading page
const Loading = () => {
  // Variants for the main loading container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: easeIn,
      },
    },
  };

  // Variants for the loading text
  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5] as [number, number, number], // Pulsing effect
      scale: [1, 1.05, 1] as [number, number, number], // Subtle scaling
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  // Variants for the simplified logo animation
  const logoVariants = {
    animate: {
      rotate: 360, // Continuous rotation
      scale: [1, 1.1, 1] as [number, number, number], // Subtle pulse
      transition: {
        rotate: {
          duration: 8, // Slower rotation for subtlety
          ease: "linear" as const,
          repeat: Infinity,
        },
        scale: {
          duration: 1.5,
          repeat: Infinity,
          ease: easeInOut,
        },
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-inter overflow-hidden relative flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Global Background Particles & Grid (Subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 animate-grid-fade">
          <div className="grid-overlay"></div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Simplified Animated SVG Logo */}
        <motion.img
          src="/favicon.ico"
          alt="Loading Logo"
          className="w-24 h-24 mb-8 drop-shadow-lg"
          variants={logoVariants}
          animate="animate"
        />

        <motion.p
          className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
          variants={textVariants}
          animate="animate"
        >
          Loading...
        </motion.p>
      </div>

      {/* Custom CSS for grid overlay */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Inter:wght@300;400;600;700;800;900&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        /* Grid Overlay Animation */
        .grid-overlay {
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to right, #333 1px, transparent 1px),
                            linear-gradient(to bottom, #333 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.3;
          animation: gridPan 60s linear infinite;
        }

        @keyframes gridPan {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -400px -400px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Loading;
