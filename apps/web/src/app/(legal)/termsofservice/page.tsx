"use client";

import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a002a] via-[#2b0050] to-[#0c001a] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-400">
          📄 Terms of Service – StackVault.dev
        </h1>
        <p className="text-sm text-gray-300 mb-8">
          Effective Date: August 7, 2025
        </p>

        <Section title="1. Use of Service">
          You must be at least 13 years old to use StackVault.dev. You agree to
          provide accurate information and use the platform for lawful purposes
          only.
        </Section>

        <Section title="2. Account & Authentication">
          We use Google OAuth for login. You are responsible for maintaining the
          confidentiality of your Google account. If you suspect unauthorized
          activity, contact us immediately.
        </Section>

        <Section title="3. Content Ownership">
          You retain ownership of the content you upload (e.g., templates,
          profile data). By uploading content, you grant us a non-exclusive
          license to display it for platform features.
        </Section>

        <Section title="4. Prohibited Use">
          You agree not to:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Upload harmful, misleading, or illegal content.</li>
            <li>Reverse engineer, exploit, or disrupt the service.</li>
            <li>
              Attempt to gain unauthorized access to other users&apos; data.
            </li>
          </ul>
        </Section>

        <Section title="5. Termination">
          We may suspend or terminate your access if you violate these terms or
          use the service in a harmful manner.
        </Section>

        <Section title="6. Limitation of Liability">
          StackVault.dev is provided &quot;as is&quot; without warranties. We
          are not liable for data loss, damages, or service interruptions.
        </Section>

        <Section title="7. Changes to Terms">
          We may update these terms from time to time. Continued use after
          changes constitutes acceptance.
        </Section>

        <Section title="8. Contact">
          <p>
            Email:{" "}
            <a
              href="mailto:contact.stackvault.dev@gmail.com"
              className="text-purple-300 hover:underline"
            >
              contact.stackvault.dev@gmail.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://stackvault.dev"
              className="text-purple-300 hover:underline"
            >
              https://stackvault.dev
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-purple-300 mb-2">{title}</h2>
    <div className="text-gray-200 leading-relaxed">{children}</div>
  </div>
);

export default TermsOfService;
