import React from "react";
import { Wrench, ShieldCheck, Clock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Fast Service",
      description:
        "Quick response and lightning-fast resolution of your city issues.",
      icon: <Clock size={48} className="mx-auto text-primary" />,
    },
    {
      id: 2,
      title: "Trusted Professionals",
      description:
        "Verified and skilled experts to ensure safe and quality service.",
      icon: <ShieldCheck size={48} className="mx-auto text-primary" />,
    },
    {
      id: 3,
      title: "All-in-One Solution",
      description:
        "Plumbing, electrical, appliance repair — everything in one place.",
      icon: <Wrench size={48} className="mx-auto text-primary" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "We are available day and night to assist you anytime.",
      icon: <Users size={48} className="mx-auto text-primary" />,
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Our Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center min-h-[300px]"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
