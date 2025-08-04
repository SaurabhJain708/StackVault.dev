import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaRedditAlien,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 text-sm py-10 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10">
          {/* Brand & Description */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
              StackVault.dev
            </h2>
            <p className="max-w-sm text-gray-400">
              Your portfolio, reimagined. Create stunning, interactive web
              experiences that get you noticed.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row text-center md:text-left space-y-6 md:space-y-0 md:space-x-12">
            <div>
              <h3 className="text-white font-semibold mb-3">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-purple-400">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#templates" className="hover:text-purple-400">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-purple-400">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} StackVault.dev. All rights
            reserved.
          </p>
          <div className="flex space-x-5 text-gray-400">
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link
              href="https://reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaRedditAlien className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
