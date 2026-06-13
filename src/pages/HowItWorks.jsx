import React from "react";
import { motion } from "framer-motion";
import {
  FilePlus2,
  ShieldCheck,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FilePlus2 size={40} />,
      title: "Report an Issue",
      desc: "Submit city problems with photos, location details, and a clear description.",
    },
    {
      id: 2,
      icon: <ShieldCheck size={40} />,
      title: "Verification Process",
      desc: "Authorities review and verify reports to ensure accurate issue handling.",
    },
    {
      id: 3,
      icon: <Clock3 size={40} />,
      title: "Track Progress",
      desc: "Monitor updates and status changes in real-time from your dashboard.",
    },
    {
      id: 4,
      icon: <CheckCircle2 size={40} />,
      title: "Issue Resolved",
      desc: "Receive confirmation once the issue is successfully addressed and completed.",
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="badge badge-primary badge-lg mb-4">
            Simple Process
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            How UrbanFix Works
          </h2>

          <p className="text-lg text-base-content/70">
            A transparent workflow that connects citizens and city
            authorities to solve urban infrastructure issues faster.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="
                relative
                group
                bg-base-200
                border
                border-base-300
                rounded-3xl
                p-8
                hover:shadow-2xl
                hover:border-primary/30
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Step Number */}
              <div
                className="
                  absolute
                  -top-4
                  left-6
                  w-10
                  h-10
                  rounded-full
                  bg-primary
                  text-primary-content
                  flex
                  items-center
                  justify-center
                  font-bold
                  shadow-lg
                "
              >
                {step.id}
              </div>

              {/* Icon */}
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-primary/10
                  text-primary
                  flex
                  items-center
                  justify-center
                  mb-6
                  mt-3
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base-content/70 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="hidden xl:flex justify-center mt-12">
          <div className="w-4/5 h-1 bg-primary/20 rounded-full relative">
            <div className="absolute inset-0 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            mt-20
            rounded-3xl
            bg-gradient-to-r
            from-primary
            to-secondary
            text-white
            p-10
            text-center
          "
        >
          <h3 className="text-3xl font-bold mb-4">
            Help Improve Your City Today
          </h3>

          <p className="max-w-2xl mx-auto text-white/90 mb-6">
            Report infrastructure problems, monitor progress,
            and contribute to building cleaner, safer, and smarter
            communities.
          </p>

          <button className="btn bg-white text-primary border-0 hover:bg-gray-100 rounded-full px-8">
            Report an Issue
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;