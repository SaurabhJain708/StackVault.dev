"use client";

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a001f] via-[#220033] to-black text-white px-6 md:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-purple-400">
          📄 Privacy Policy – StackVault.dev
        </h1>
        <p className="text-sm text-gray-400">Effective Date: August 7, 2025</p>

        <p>
          StackVault.dev is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and share your information when
          you use our website (
          <Link className="underline text-purple-300" href="/" target="_blank">
            https://stackvault.dev
          </Link>
          ) and associated services.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email, and profile
              picture from Google OAuth.
            </li>
            <li>
              <strong>User-Submitted Content:</strong> Templates, portfolio
              data, and inputs you submit.
            </li>
            <li>
              <strong>Usage Data:</strong> Analytics like page views, clicks,
              time on site.
            </li>
            <li>
              <strong>Log Data:</strong> IP, browser type, device info,
              timestamps.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Authenticate via Google OAuth.</li>
            <li>Enable features like template generation and previews.</li>
            <li>Improve UX through analytics.</li>
            <li>Communicate updates and security notices (if opted-in).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            3. Sharing of Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>We never sell your data.</li>
            <li>
              Shared with providers like Vercel, Cloudinary, Neon, for hosting
              and analytics.
            </li>
            <li>May be disclosed to comply with laws or defend our rights.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            4. Data Security
          </h2>
          <p>
            We apply standard security practices but cannot guarantee absolute
            security. In the event of a breach, users will be notified in
            accordance with the law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            5. Your Rights
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Request data deletion via email.</li>
            <li>Revoke access via Google Account settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            6. Third-Party Services
          </h2>
          <p>
            We use third-party tools like Google OAuth, Vercel, and Cloudinary.
            Review Google&apos;s policy here:{" "}
            <a
              href="https://policies.google.com/privacy"
              className="underline text-purple-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">
            7. Children&apos;s Privacy
          </h2>
          <p>
            StackVault.dev is not intended for children under 13. We do not
            knowingly collect their data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-300">8. Contact</h2>
          <p>
            Email:{" "}
            <a
              href="mailto:contact.stackvault.dev@gmail.com"
              className="underline text-purple-300"
            >
              contact.stackvault.dev@gmail.com
            </a>
            <br />
            Website:{" "}
            <Link
              href="/"
              className="underline text-purple-300"
              target="_blank"
            >
              https://stackvault.dev
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
