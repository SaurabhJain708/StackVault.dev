"use client";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useState } from "react";

export default function PortfolioLiveMessage({ userId }: { userId: string }) {
  const portfolioLink = `https://www.stackvault.dev/portfolio/${userId}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-10 text-center px-6 py-14 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 rounded-2xl shadow-2xl border border-gray-800">
      {/* Celebration Emoji */}
      <div className="text-7xl animate-bounce animate-pulse-slow">🎉</div>

      {/* Gradient Heading */}
      <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
        Your Portfolio is Live! 🚀
      </h2>

      {/* Catchy Tagline */}
      <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
        Make your mark on the web — share your portfolio, inspire others, and
        let the world discover your skills. 🌍
      </p>

      {/* Release Post */}
      <div className="mt-8 max-w-2xl w-full p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 text-left hover:shadow-purple-500/20 transition-shadow">
        <h3 className="text-2xl font-semibold mb-3 text-white">Release Post</h3>
        <p className="text-gray-300 leading-relaxed">
          Hey everyone! I&apos;m thrilled to share that my new portfolio is now
          live. Dive in to explore my latest projects, skills, and experiences.
          Excited to connect with like-minded professionals and discover new
          opportunities! Check it out here:{" "}
          <a
            href={portfolioLink}
            className="text-blue-400 underline hover:text-blue-300"
          >
            https://www.stackvault.dev
          </a>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-6 mt-6">
        {[
          {
            href: "https://www.linkedin.com",
            icon: <FaLinkedin />,
            bg: "bg-blue-600",
            shadow: "shadow-blue-500/50",
          },
          {
            href: "https://github.com",
            icon: <FaGithub />,
            bg: "bg-gray-800",
            shadow: "shadow-gray-500/50",
          },
          {
            href: "https://twitter.com",
            icon: <FaTwitter />,
            bg: "bg-sky-500",
            shadow: "shadow-sky-400/50",
          },
        ].map(({ href, icon, bg, shadow }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bg} p-4 rounded-full text-white text-3xl shadow-lg hover:scale-110 hover:${shadow} transition-all`}
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Portfolio Link Box */}
      <input
        type="text"
        readOnly
        value={portfolioLink}
        className="mt-4 w-full max-w-md px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white text-center font-mono text-sm select-all focus:ring-2 focus:ring-purple-500"
        onFocus={(e) => e.target.select()}
      />

      {/* Copy Button */}
      <button
        className="mt-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-all"
        onClick={copyToClipboard}
      >
        {copied ? "✅ Copied!" : "📋 Copy Portfolio Link"}
      </button>
    </div>
  );
}
