"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  PlayCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// Main App component for the landing page
const App = () => {
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.id ?? ``;
  // Refs for sections to trigger animations on scroll
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });

  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });

  const howItWorksRef = useRef(null);
  const isHowItWorksInView = useInView(howItWorksRef, {
    once: true,
    amount: 0.3,
  });

  const templatesRef = useRef(null);
  const isTemplatesInView = useInView(templatesRef, {
    once: true,
    amount: 0.2,
  });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Variants for text animations (staggered reveal)
  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // ✅ Fix here
      },
    },
  };

  // Variants for button animations
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // ✅ Typed tuple
      },
    },
    hover: {
      scale: 1.07,
      boxShadow: "0px 0px 30px rgba(124, 58, 237, 1)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.93 },
  };

  // Variants for feature cards (slide up and fade in with enhanced hover)
  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 40px rgba(124, 58, 237, 0.9)", // Stronger card glow on hover
      borderColor: "rgba(124, 58, 237, 0.9)", // Stronger border glow
      rotateY: 5, // Subtle 3D tilt
      rotateX: 2, // Subtle 3D tilt
      transition: { duration: 0.3 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // ✅ Cast it here
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 25px rgba(236, 72, 153, 0.7)",
      transition: { duration: 0.3 },
    },
  };

  // Feature data for easy mapping
  const features = [
    {
      icon: (
        <SparklesIcon className="w-16 h-16 text-purple-500 mb-4 drop-shadow-lg" />
      ),
      title: "Stunning Templates",
      description:
        "Choose from a curated collection of modern, responsive, and visually striking templates designed to make your work shine.",
    },
    {
      icon: (
        <AdjustmentsHorizontalIcon className="w-16 h-16 text-blue-500 mb-4 drop-shadow-lg" />
      ),
      title: "Effortless Customization",
      description:
        "Our intuitive editor allows you to personalize every aspect of your portfolio without writing a single line of code.",
    },
    {
      icon: (
        <PlayCircleIcon className="w-16 h-16 text-pink-500 mb-4 drop-shadow-lg" />
      ),
      title: "Dynamic Showcases",
      description:
        "Embed projects, code snippets, videos, and interactive demos to bring your portfolio to life.",
    },
    {
      icon: (
        <ChartBarIcon className="w-16 h-16 text-green-500 mb-4 drop-shadow-lg" />
      ),
      title: "Insightful Analytics",
      description:
        "Track visitor engagement and optimize your portfolio’s performance with built-in analytics.",
    },
  ];

  const howItWorksSteps = [
    {
      title: "1. Choose Your Template",
      description:
        "Browse our diverse library of professionally designed templates, each crafted to highlight different skill sets and industries.",
      icon: (
        <svg
          className="w-12 h-12 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2
          2 0 01-2 2z"
          ></path>
        </svg>
      ),
    },
    {
      title: "2. Customize with Ease",
      description:
        "Our intuitive drag-and-drop editor makes it simple to add your content, change colors, fonts, and layouts without any coding.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
      ),
    },
    {
      title: "3. Publish & Share",
      description:
        "Go live with a single click! Share your unique StackVault.dev URL with recruiters, clients, and your network.",
      icon: (
        <svg
          className="w-12 h-12 text-pink-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M12 5l7 7-7 7"
          ></path>
        </svg>
      ),
    },
  ];

  const templatePlaceholders = [
    {
      name: "Nebula",
      color: "from-purple-500 to-indigo-500",
      image: "https://placehold.co/400x250/8B5CF6/FFFFFF?text=Nebula+Template",
    },
    {
      name: "Aurora",
      color: "from-blue-500 to-cyan-500",
      image: "https://placehold.co/400x250/3B82F6/FFFFFF?text=Aurora+Template",
    },
    {
      name: "Quantum",
      color: "from-green-500 to-teal-500",
      image: "https://placehold.co/400x250/10B981/FFFFFF?text=Quantum+Template",
    },
    {
      name: "Vortex",
      color: "from-red-500 to-orange-500",
      image: "https://placehold.co/400x250/EF4444/FFFFFF?text=Vortex+Template",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-inter overflow-hidden relative">
      {/* Global Background Particles (Subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 animate-grid-fade">
          <div className="grid-overlay"></div>
        </div>
      </div>

      {/* Navigation Bar */}
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
          <a href="#features">Features</a>
          <a
            href="#templates"
            className="text-gray-300 hover:text-blue-400 transition-colors text-lg"
          >
            Templates
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-pink-400 transition-colors text-lg"
          >
            Pricing
          </a>
        </div>
        <Link href="/dashboard">
          <button className="px-4 ml-2 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-sm sm:text-base text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md min-w-[100px]">
            {userId ? "Dashboard" : "Sign In"}
          </button>
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 pt-32 text-center overflow-hidden z-10"
      >
        {/* Background Gradients/Shapes - Enhanced */}
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h1
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-center"
            variants={textVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.span
              variants={textVariants}
              className="block text-transparent max-w-full bg-clip-text bg-gradient-to-r from-purple-300 to-blue-400"
            >
              StackVault.dev
            </motion.span>
            <motion.span
              variants={textVariants}
              className="block mt-4 text-gray-100"
            >
              Your Portfolio, Reimagined.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 sm:mb-12 max-w-2xl mx-auto text-center font-light"
            variants={textVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            transition={{ delay: 0.4, ...textVariants.visible.transition }}
          >
            Break free from static resumes. Create dynamic, interactive web
            experiences that truly showcase your skills, projects, and
            personality.
          </motion.p>
          <Link href="/dashboard">
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-700 to-blue-700 text-white font-semibold sm:font-bold text-base sm:text-xl rounded-full shadow-xl hover:shadow-purple-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 sm:hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-75 relative overflow-hidden group mx-auto block"
              variants={buttonVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-800 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Get Started Free</span>
            </motion.button>
          </Link>

          <motion.div
            className="mt-16 sm:mt-20 w-full max-w-3xl mx-auto bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden p-4 relative"
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="block w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="block w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96 bg-gray-700 rounded-md flex items-center justify-center text-gray-400 text-sm sm:text-base md:text-xl font-mono relative overflow-hidden">
              <div
                className="absolute inset-0 bg-repeat bg-[size:20px_20px] opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #4a4a4a 1px, transparent 1px), linear-gradient(to bottom, #4a4a4a 1px, transparent 1px)",
                }}
              ></div>
              <span className="animate-pulse relative z-10">
                {"<YourInteractivePortfolioHere />"}
              </span>
            </div>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ boxShadow: "0 0 50px rgba(124, 58, 237, 0.3) inset" }}
            ></div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2,
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
            <span className="text-xs sm:text-sm">Scroll Down</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-28 px-4 relative z-10 bg-gray-950/50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Unlock Your Potential with StackVault.dev
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-purple-600 transition-all duration-300 ease-in-out flex flex-col items-center text-center relative overflow-hidden group transform-gpu"
                variants={cardVariants}
                initial="hidden"
                animate={isFeaturesInView ? "visible" : "hidden"}
                transition={{
                  delay: index * 0.15 + 0.3,
                  ...cardVariants.visible.transition,
                }} // Staggered delay for cards
                whileHover="hover"
              >
                {/* Card background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 p-4 rounded-full bg-gray-700 group-hover:bg-purple-800 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className="py-28 px-4 bg-gray-950 relative z-10"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Your Journey to an Amazing Portfolio
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-gray-700">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={isHowItWorksInView ? { width: "100%" } : {}}
                transition={{
                  delay: 0.5,
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              ></motion.div>
            </div>
            <div className="hidden md:flex absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 z-20 shadow-lg"></div>
            <div className="hidden md:flex absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 z-20 shadow-lg"></div>

            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center text-center relative z-10"
                variants={stepVariants}
                initial="hidden"
                animate={isHowItWorksInView ? "visible" : "hidden"}
                transition={{
                  delay: index * 0.2 + 0.3,
                  ...stepVariants.visible.transition,
                }}
                whileHover="hover"
              >
                <div className="mb-6 p-4 rounded-full bg-gray-700 border border-purple-600 flex items-center justify-center shadow-md group-hover:bg-purple-700 transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section
        id="templates"
        ref={templatesRef}
        className="py-28 px-4 relative z-10 bg-gray-900/50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/templates">Templates</Link>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {templatePlaceholders.map((template, index) => (
              <motion.div
                key={index}
                className={`bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 overflow-hidden flex flex-col group relative`}
                initial={{ opacity: 0, y: 50 }}
                animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 50px rgba(0, 255, 255, 0.7)",
                  borderColor: "rgba(0, 255, 255, 0.7)",
                }} // Cyan glow
              >
                {/* Image placeholder */}
                <img
                  src={template.image}
                  alt={`${template.name} Template Preview`}
                  className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-600 group-hover:border-cyan-500 transition-colors duration-300"
                />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {template.name}
                </h3>
                <p className="text-gray-400 text-sm flex-grow">
                  A sleek and modern template perfect for showcasing your
                  projects and skills with a futuristic touch.
                </p>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md">
                  Preview
                </button>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="mt-20 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-75 relative overflow-hidden group"
            variants={buttonVariants}
            initial="hidden"
            animate={isTemplatesInView ? "visible" : "hidden"}
            transition={{
              ...structuredClone(buttonVariants.visible.transition),
              delay: 0.8,
            }}
            onClick={() => router.push("/templates")}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">View All Templates</span>
          </motion.button>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-4 bg-gray-950 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-2xl sm:text-3xl italic text-gray-200 mb-8 leading-relaxed font-light"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            &quot;StackVault.dev transformed how I present my work. It&apos;s
            not just a portfolio, it&apos;s an experience that truly gets
            noticed and opens doors!&quot;
          </motion.p>
          <motion.p
            className="text-lg font-semibold text-purple-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            — Alex Chen, Lead Product Designer
          </motion.p>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section ref={ctaRef} className="py-28 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Ready to Elevate Your Professional Presence?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Join StackVault.dev today and build an interactive portfolio that
            truly stands out and opens new opportunities. Your future starts
            now.
          </motion.p>
          <Link href="/login">
            <motion.button
              className="px-12 py-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-2xl rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-pink-600 focus:ring-opacity-75 relative overflow-hidden group"
              variants={buttonVariants}
              initial="hidden"
              animate={isCtaInView ? "visible" : "hidden"}
              whileHover="hover"
              whileTap="tap"
              transition={{
                ...structuredClone(buttonVariants.visible.transition),
                delay: 0.6,
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Build Your Portfolio Now</span>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-950 text-center text-gray-500 text-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <p>
            &copy; {new Date().getFullYear()} StackVault.dev. All rights
            reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-6 text-base">
            <Link
              href="/privacypolicy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/termsofservice"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>

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

export default App;
