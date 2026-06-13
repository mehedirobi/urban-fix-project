import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    href: "https://facebook.com",
    hover: "hover:text-blue-500",
  },
  {
    icon: <FaTwitter />,
    label: "Twitter",
    href: "https://twitter.com",
    hover: "hover:text-blue-400",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://instagram.com",
    hover: "hover:text-pink-500",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 mt-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Branding */}
          <section className="text-center md:text-left max-w-sm">
            <h2 className="text-3xl font-extrabold text-blue-600 mb-2">
              UrbanFix
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Report, track, and resolve city issues efficiently.
              Helping build smarter and cleaner communities.
            </p>
          </section>

          {/* Links */}
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {FOOTER_LINKS.company.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 justify-center md:justify-start transition-colors ${item.hover}`}
                    >
                      {item.icon} {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {FOOTER_LINKS.legal.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </section>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6" />

        {/* Bottom */}
        <div className="text-center text-sm text-gray-400 space-y-1">
          <p>
            © {new Date().getFullYear()} UrbanFix. All rights reserved.
          </p>
          <p>
            Designed and built by <span className="font-semibold">Mehedi</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;