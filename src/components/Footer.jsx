import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-blue-600 mb-2">UrbanFix</h2>
            <p className="text-sm max-w-xs">
              Your go-to platform to report, track, and resolve city issues. Making our city better, one issue at a time!
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center md:text-left w-full md:w-auto">
            
            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="/about-us" className="hover:text-blue-500 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-blue-500 transition-colors">Careers</a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-blue-500 transition-colors">Blog</a>
                </li>
              </ul>
            </div>

            {/* Contact / Social */}
            <div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <ul className="space-y-1 text-sm flex flex-col gap-1">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-2 hover:text-blue-500 transition-colors"
                  >
                    <FaFacebookF /> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-2 hover:text-blue-400 transition-colors"
                  >
                    <FaTwitter /> Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-2 hover:text-pink-500 transition-colors"
                  >
                    <FaInstagram /> Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-blue-500 transition-colors">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Copyright */}
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} UrbanFix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
