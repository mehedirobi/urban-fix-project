import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "How do I report an issue?",
    a: "Navigate to the Report Issue page, provide details, upload photos if needed, and submit your report.",
  },
  {
    q: "Can I edit my submitted issue?",
    a: "Yes. You can manage and update your reports from your dashboard under My Issues.",
  },
  {
    q: "How long does it take to resolve an issue?",
    a: "Resolution time depends on the category, location, and priority level of the reported issue.",
  },
  {
    q: "Can I track issue progress?",
    a: "Yes. UrbanFix provides real-time tracking and status updates for all submitted reports.",
  },
  {
    q: "Who should I contact for urgent issues?",
    a: "For critical public safety concerns, contact local emergency services immediately and also submit the issue through UrbanFix.",
  },
];

const supportCards = [
  {
    icon: <MessageSquare size={32} />,
    title: "Live Support",
    desc: "Get assistance from our support team.",
  },
  {
    icon: <Mail size={32} />,
    title: "Email Support",
    desc: "support@urbanfix.com",
  },
  {
    icon: <Phone size={32} />,
    title: "Hotline",
    desc: "+880 1234 567890",
  },
];

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-3xl
            bg-gradient-to-r
            from-primary
            to-secondary
            text-white
            text-center
            p-10
            md:p-16
            mb-16
          "
        >
          <HelpCircle size={60} className="mx-auto mb-5" />

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Help & Support Center
          </h1>

          <p className="max-w-2xl mx-auto text-white/80 text-lg">
            Find answers, get support, and learn how UrbanFix helps
            communities report and resolve urban issues efficiently.
          </p>
        </motion.div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="
                bg-base-200
                rounded-3xl
                p-8
                text-center
                shadow-sm
                hover:shadow-xl
                transition-all
              "
            >
              <div className="text-primary flex justify-center mb-4">
                {card.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">
                {card.title}
              </h3>

              <p className="opacity-70">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>

            <p className="opacity-70 max-w-2xl mx-auto">
              Quick answers to the most common questions from our users.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                className="
                  bg-base-200
                  rounded-2xl
                  overflow-hidden
                  border
                  border-base-300
                "
              >
                <button
                  onClick={() => toggle(index)}
                  className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-5
                    text-left
                    font-semibold
                  "
                >
                  {faq.q}

                  {openIndex === index ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-5 pb-5 opacity-80">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="
            bg-error/10
            border
            border-error/20
            rounded-3xl
            p-8
            mb-16
          "
        >
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <ShieldAlert
              className="text-error shrink-0"
              size={40}
            />

            <div>
              <h3 className="text-2xl font-bold mb-2">
                Emergency Issues
              </h3>

              <p className="opacity-80">
                For immediate public safety threats such as fire,
                severe infrastructure collapse, gas leaks, or
                medical emergencies, contact emergency services
                first before submitting a report through UrbanFix.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div
          className="
            bg-base-200
            rounded-3xl
            p-10
            text-center
          "
        >
          <h2 className="text-3xl font-bold mb-4">
            Still Need Help?
          </h2>

          <p className="opacity-70 max-w-2xl mx-auto mb-6">
            Our support team is available to answer your
            questions and help resolve any issues you face.
          </p>

          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;