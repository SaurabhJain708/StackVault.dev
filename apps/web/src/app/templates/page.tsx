"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/components/hooks/isMobile";
import { useGetAllTemplates } from "@/lib/query/template";
import { Template } from "@repo/db";
import { useSession } from "next-auth/react";

// Template data with image placeholders for easy management

const Templates = () => {
  const session = useSession();
  const userId = session?.data?.user?.id ?? ``;
  const { data: templatesData } = useGetAllTemplates();
  const templatesRef = useRef(null);
  const isMobile = useIsMobile();

  const isTemplatesInView = useInView(templatesRef, {
    once: true,
    amount: 0.2,
  });

  // Variants for card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 50px rgba(0, 255, 255, 0.7)",
      borderColor: "rgba(0, 255, 255, 0.7)",
      transition: { duration: 0.3 },
    },
  };

  // Function to get the badge and button styling based on status
  const getBadgeAndButtonStyles = (status: string) => {
    switch (status) {
      case "Premium":
        return {
          badge:
            "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold",
          button:
            "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white",
          disabled: false,
        };
      case "Free":
        return {
          badge:
            "bg-gradient-to-r from-green-400 to-green-600 text-white font-bold",
          button: "bg-gray-700 hover:bg-gray-600 text-gray-300",
          disabled: false,
        };
      case "Coming Soon":
        return {
          badge:
            "bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold",
          button: "bg-gray-800 text-gray-500 cursor-not-allowed",
          disabled: true,
        };
      default:
        return {
          badge: "bg-gray-500 text-white font-bold",
          button: "bg-gray-700 text-gray-300",
          disabled: false,
        };
    }
  };

  const shouldAnimate = isMobile || isTemplatesInView;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-inter overflow-hidden relative">
      {/* Global Background Particles (Subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
        <div className="absolute inset-0 z-0 opacity-10 animate-grid-fade">
          <div className="grid-overlay"></div>
        </div>
      </div>

      {/* Navigation Bar (re-used from landing page for consistency) */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md py-4 px-8 flex justify-between items-center border-b border-gray-700 shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          StackVault.dev
        </div>
        <div className="space-x-6 hidden md:flex">
          <Link
            href="/"
            className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
          >
            Home
          </Link>
          <Link
            href="/templates"
            className="text-gray-300 hover:text-blue-400 transition-colors text-lg"
          >
            Templates
          </Link>
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-pink-400 transition-colors text-lg"
          >
            Pricing
          </Link>
        </div>
        <Link
          href="/dashboard"
          className="px-4 items-center ml-2 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-sm sm:text-base text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md min-w-[100px]"
        >
          {userId ? "Dashboard" : "Sign In"}
        </Link>
      </motion.nav>

      {/* Templates Header Section */}
      <section className="py-28 px-4 text-center relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Discover Your Perfect Portfolio
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Choose from a curated collection of templates, each designed to make
          your professional story shine.
        </motion.p>
      </section>

      {/* Templates Grid Section */}
      <section ref={templatesRef} className="pb-28 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {templatesData?.map((template: Template, index: number) => {
              const { badge, button, disabled } = getBadgeAndButtonStyles(
                template.status,
              );
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 overflow-hidden flex flex-col relative group transform-gpu"
                  variants={cardVariants}
                  initial="hidden"
                  animate={shouldAnimate ? "visible" : "hidden"}
                  transition={{
                    delay: index * 0.15 + 0.3,
                    ...cardVariants.visible.transition,
                  }}
                  whileHover="hover"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={template.image}
                      alt={`${template.name} Template Preview`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-600 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-lg ${badge}`}
                    >
                      {template.status}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {template.name}
                  </h3>
                  <p className="text-gray-400 text-sm flex-grow mb-6">
                    {template.description}
                  </p>
                  <Link
                    href={`/preview/${template.id}`}
                    onClick={(e) => disabled && e.preventDefault()}
                  >
                    <motion.button
                      className={`w-full py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-md ${button}`}
                      whileHover={!disabled ? { scale: 1.05 } : {}}
                      whileTap={!disabled ? { scale: 0.95 } : {}}
                    >
                      {disabled ? "Coming Soon" : "Preview"}
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom CSS for blob animation, font, and grid overlay */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
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
    </div>
  );
};

export default Templates;
