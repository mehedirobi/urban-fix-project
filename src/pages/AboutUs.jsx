import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wrench,
  Shield,
  Users,
  Building2,
  CheckCircle,
  Globe,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Wrench,
    title: "Easy Reporting",
    desc: "Submit infrastructure issues with photos, location, and detailed descriptions in seconds.",
  },
  {
    icon: Shield,
    title: "Safe & Verified",
    desc: "Every report and resolution process is monitored to ensure transparency and accountability.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Citizens actively contribute to building cleaner, safer, and smarter cities.",
  },
  {
    icon: Building2,
    title: "City-Wide Coverage",
    desc: "Supporting urban infrastructure maintenance across multiple communities.",
  },
];

const steps = [
  "Citizens submit reports with photos, location, and issue details.",
  "Administrators review and verify the submitted issue.",
  "Maintenance teams are assigned to resolve the problem.",
  "Citizens track progress through real-time updates.",
];

const AboutUs = () => {
  return (
    <div className="bg-base-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-primary badge-lg mb-6">
              About UrbanFix
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Building Better Cities
              <span className="block text-primary">
                Through Technology
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-lg md:text-xl opacity-80">
              UrbanFix empowers citizens and authorities to work together in
              identifying, tracking, and resolving public infrastructure issues
              faster and more transparently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ["10K+", "Issues Reported"],
            ["95%", "Resolution Rate"],
            ["1000+", "Active Citizens"],
            ["64+", "Coverage Areas"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="bg-base-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                {number}
              </h2>
              <p className="mt-3 opacity-70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why People Choose UrbanFix
          </h2>
          <p className="mt-4 opacity-70 max-w-2xl mx-auto">
            Designed to simplify urban issue reporting and ensure transparency
            throughout the resolution process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="
                  bg-base-100
                  border
                  border-base-300
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                "
              >
                <Icon className="w-14 h-14 text-primary mb-5" />

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="opacity-70 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-base-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              How UrbanFix Works
            </h2>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <div className="bg-base-100 rounded-2xl p-5 shadow-sm flex-1">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary text-primary-content rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-5">
              Our Mission
            </h2>

            <p className="leading-relaxed opacity-90">
              To transform urban infrastructure management through
              transparency, efficiency, and citizen engagement,
              making communities cleaner, safer, and better
              connected.
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-5 text-primary">
              Our Vision
            </h2>

            <p className="leading-relaxed opacity-80">
              A future where every urban issue is reported,
              tracked, and resolved seamlessly through
              technology-driven collaboration between citizens
              and local authorities.
            </p>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-base-200 rounded-3xl p-8 text-center">
            <Globe className="w-14 h-14 text-primary mx-auto mb-4" />

            <h3 className="text-3xl font-bold mb-3">
              Expanding Coverage
            </h3>

            <p className="opacity-70">
              Helping communities identify and resolve public
              infrastructure issues more efficiently.
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-8 text-center">
            <Users className="w-14 h-14 text-primary mx-auto mb-4" />

            <h3 className="text-3xl font-bold mb-3">
              Growing Community
            </h3>

            <p className="opacity-70">
              Thousands of citizens participate in creating
              cleaner and safer urban environments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 text-center text-primary-content">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Join The Movement
          </h2>

          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Be part of a smarter city. Report issues, track
            progress, and help improve your community today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/create-issue"
              className="btn btn-neutral rounded-full"
            >
              Report an Issue
            </Link>

            <Link
              to="/all-issues"
              className="btn btn-outline rounded-full"
            >
              Explore Issues
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;