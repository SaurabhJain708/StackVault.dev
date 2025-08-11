"use client";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useState } from "react";

export default function PortfolioLiveMessage({ userId }: { userId: string }) {
  // Dummy portfolio link - ideally generated or fetched dynamically using userId
  const portfolioLink = `https://www.stackvault.dev/portfolio/${userId}`;

  // For optional user feedback on copy
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8 text-center p-10">
      {/* Celebration Emoji */}
      <div className="text-7xl animate-bounce">🎉</div>

      {/* Gradient Heading */}
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        Your Portfolio is Live! 🚀
      </h2>

      {/* Catchy Tagline */}
      <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
        Make your mark on the web — share your portfolio, inspire others, and
        let the world discover your skills. 🌍
      </p>

      <div className="mt-12 max-w-2xl w-full p-6 bg-gray-900 rounded-lg shadow-lg text-left">
        <h3 className="text-2xl font-semibold mb-3">Release Post</h3>
        <p className="text-gray-300 leading-relaxed">
          Hey everyone! I&apos;m excited to share that my new portfolio is live.
          Check out my latest projects, skills, and experiences. Looking forward
          to connecting with you all and exploring new opportunities! Check it
          out here:{" "}
          <a href={portfolioLink} className="text-blue-400 underline">
            https://www.stackvault.dev
          </a>
        </p>
      </div>
      {/* Social Links */}
      <div className="flex gap-8 mt-6">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-4 rounded-full text-white text-4xl shadow-lg hover:scale-110 hover:shadow-blue-500/50 transition-all"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-4 rounded-full text-white text-4xl shadow-lg hover:scale-110 hover:shadow-gray-500/50 transition-all"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 p-4 rounded-full text-white text-4xl shadow-lg hover:scale-110 hover:shadow-sky-400/50 transition-all"
        >
          <FaTwitter />
        </a>
      </div>

      <input
        type="text"
        readOnly
        value={portfolioLink}
        className="mt-4 w-full max-w-md px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white text-center select-all"
        onFocus={(e) => e.target.select()}
      />
      {/* Copy Link Button */}
      <button
        className="mt-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg hover:scale-105 transition-all"
        onClick={copyToClipboard}
      >
        {copied ? "✅ Copied!" : "📋 Copy Portfolio Link"}
      </button>
    </div>
  );
}
