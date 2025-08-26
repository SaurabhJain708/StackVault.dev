import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { QueryProvider } from "@/lib/query/queryProvider";
import { Providers } from "@/lib/providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackVault",
  description: "Your Ultimate Portfolio Management Solution",
};

export default function RootLayout({
  children,
  showFooter = true,
}: Readonly<{
  children: React.ReactNode;
  showFooter?: boolean;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Providers>{children}</Providers>
        </QueryProvider>
        <Toaster richColors position="top-center" closeButton />
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
