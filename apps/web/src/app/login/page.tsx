"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

// Main App component for the login page
const Login = () => {
  const loginRef = useRef(null);
  const isInView = useInView(loginRef, { once: true, amount: 0.5 });

  // Refs for the 3D cube logo interaction
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoContainer = logoContainerRef.current;
    const cube = cubeRef.current;

    if (!logoContainer || !cube) return;

    // Store initial animation state
    const initialAnimation = cube.style.animation;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = logoContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation based on mouse position
      const rotateX = ((y - centerY) / centerY) * -15; // Max rotation
      const rotateY = ((x - centerX) / centerX) * 15; // Max rotation

      // Pause CSS animation and apply interactive transform
      cube.style.animation = "none";
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      // Resume CSS animation when mouse leaves
      cube.style.animation = initialAnimation; // Reapply the original animation
      cube.style.transform = ""; // Clear inline transform to let animation take over
    };

    logoContainer.addEventListener("mousemove", handleMouseMove);
    logoContainer.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      logoContainer.removeEventListener("mousemove", handleMouseMove);
      logoContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Variants for main container entrance
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 80 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.15, // Stagger animations for children elements
      },
    },
  };

  // Variants for individual elements within the container
  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Variants for the Google button
  const googleButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.6, // Delay after text appears
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    hover: {
      scale: 1.07,
      boxShadow: "0px 0px 35px rgba(66, 133, 244, 1)", // More intense Google blue glow
      backgroundColor: "#f0f0f0", // Slightly lighter on hover
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.93 },
  };

  // Function to handle Google login (to be implemented)
  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-inter overflow-hidden relative flex flex-col items-center justify-center">
      {/* Global Background Particles & Grid (Subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 animate-grid-fade">
          <div className="grid-overlay"></div>
        </div>
      </div>

      {/* Background Gradients/Shapes - Consistent with Landing Page */}
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

      {/* Main Login Container */}
      <motion.div
        ref={loginRef}
        className="relative z-10 bg-gray-800/70 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-700 max-w-md w-full text-center flex flex-col items-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          boxShadow: "0px 0px 60px rgba(124, 58, 237, 0.4)", // Subtle glow on card hover
          borderColor: "rgba(124, 58, 237, 0.6)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Inner glow effect on the card */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ boxShadow: "inset 0 0 50px rgba(124, 58, 237, 0.1)" }}
        ></div>

        {/* Heading and Sub-text */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-3 leading-tight">
            Welcome Back!
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl font-light">
            Sign in to access your powerful portfolio dashboard.
          </p>
        </motion.div>

        {/* 3D Cube Logo Integration */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-12"
        >
          {" "}
          {/* Adjusted margin-bottom */}
          <div className="logo-scene" ref={logoContainerRef}>
            <div className="logo-cube" ref={cubeRef}>
              <div className="cube-face face-front">
                <span className="letter">S</span>
              </div>
              <div className="cube-face face-right">
                <span className="letter">V</span>
              </div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white tracking-wide uppercase text-glow mt-6 mb-2">
            {" "}
            {/* Adjusted font size here */}
            StackVault
          </h1>
          <p className="text-indigo-300 text-lg tracking-[0.3em] mt-2 opacity-80 uppercase">
            .dev
          </p>
        </motion.div>

        <motion.button
          className="w-full flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 group relative overflow-hidden"
          variants={googleButtonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          whileTap="tap"
          onClick={handleGoogleLogin}
        >
          {/* Button inner glow on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          {/* Google Icon SVG */}
          <FcGoogle className="w-6 h-6 mr-3 relative z-10" />

          <span className="relative z-10">Login with Google</span>
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-gray-400 text-sm"
        >
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Sign Up
          </a>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm z-10">
        <p>
          &copy; {new Date().getFullYear()} StackVault.dev. All rights reserved.
        </p>
      </footer>

      {/* Custom CSS for blob animation, grid, and 3D cube */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Inter:wght@300;400;600;700;800;900&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        /* Blob Animations (from landing page) */
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

        /* Grid Overlay Animation (from landing page) */
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

        /* 3D Cube Logo Specific Styles */
        .font-orbitron {
            font-family: 'Orbitron', sans-serif;
        }
        .logo-scene {
            perspective: 1200px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 160px; /* Adjusted size for better fit in login card */
            height: 160px; /* Adjusted size for better fit in login card */
            margin-bottom: 10px; /* Space below the cube */
        }
        .logo-cube {
            width: 100px; /* Adjusted size */
            height: 100px; /* Adjusted size */
            position: relative;
            transform-style: preserve-3d;
            transform: rotateX(-20deg) rotateY(-30deg);
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            animation: rotate-cube 25s linear infinite;
        }
        @keyframes rotate-cube {
            from { transform: rotateX(-20deg) rotateY(-30deg); }
            to { transform: rotateX(-20deg) rotateY(330deg); }
        }
        .cube-face {
            position: absolute;
            width: 100px; /* Adjusted size */
            height: 100px; /* Adjusted size */
            /* Glassmorphism effect */
            background: rgba(124, 58, 237, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(196, 181, 253, 0.3);
            box-shadow: inset 0 0 20px rgba(167, 139, 250, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden; /* Ensure content doesn't bleed out */
        }
        /* Positioning the faces of the cube */
        .face-front  { transform: rotateY(0deg) translateZ(50px); } /* Adjusted translateZ */
        .face-right  { transform: rotateY(90deg) translateZ(50px); } /* Adjusted translateZ */
        .face-back   { transform: rotateY(180deg) translateZ(50px); } /* Adjusted translateZ */
        .face-left   { transform: rotateY(-90deg) translateZ(50px); } /* Adjusted translateZ */
        .face-top    { transform: rotateX(90deg) translateZ(50px); } /* Adjusted translateZ */
        .face-bottom { transform: rotateX(-90deg) translateZ(50px); } /* Adjusted translateZ */

        /* Styling for the letters - Clean and Sharp */
        .letter {
            font-family: 'Orbitron', sans-serif;
            font-size: 60px; /* Adjusted font size */
            font-weight: 900;
            color: #f5f3ff;
            /* A subtle glow to make it pop */
            text-shadow: 0 0 10px rgba(233, 213, 255, 0.7), 0 0 20px rgba(139, 92, 246, 0.5);
            transition: text-shadow 0.3s ease;
        }
        .logo-scene:hover .letter {
             text-shadow: 0 0 15px #fff, 0 0 25px rgba(167, 139, 250, 0.8);
        }

        .text-glow {
            text-shadow: 0 0 10px rgba(196, 181, 253, 0.3), 0 0 20px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Login;
