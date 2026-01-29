import React from "react";
import { Wrench, ClipboardCheck, UserCheck, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <ClipboardCheck size={50} className="text-primary" />,
      title: "Submit Your Issue",
      desc: "Describe your problem in detail and request a technician.",
    },
    {
      id: 2,
      icon: <UserCheck size={50} className="text-primary" />,
      title: "Get Verified Technician",
      desc: "We assign a skilled & verified professional for your request.",
    },
    {
      id: 3,
      icon: <Wrench size={50} className="text-primary" />,
      title: "Problem Fixed",
      desc: "Our expert arrives on time and resolves the issue efficiently.",
    },
    {
      id: 4,
      icon: <Truck size={50} className="text-primary" />,
      title: "Secure Payment",
      desc: "Complete payment safely after the service is successfully done.",
    },
  ];

  return (
    <section className="py-20 px-5 bg-base-200">
      <h2 className="text-4xl md:text-4xl font-bold text-center mb-16 text-primary">
        How It Works
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="bg-white backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center transform transition-transform duration-300 group-hover:scale-105 min-h-[300px] relative">
              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600">{step.desc}</p>

              {/* Step Badge */}
              <span className="absolute -top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm shadow-md">
                Step {step.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
