import React from "react";

const WhyChooseUs = () => {
  const items = [
    {
      title: "Certified Technicians",
      desc: "Every technician is verified, skilled, and background-checked.",
    },
    {
      title: "Fast Response",
      desc: "Our team reaches your location faster than traditional services.",
    },
    {
      title: "Transparent Pricing",
      desc: "Clear pricing — no hidden charges or extra fees.",
    },
  ];

  return (
    <section className="py-20 bg-base-200 px-5">
      <h2 className="text-4xl md:text-4xl font-bold text-center mb-16 text-primary">
        Why Choose UrbanFix?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow-md min-h-[280px] flex flex-col justify-start
              border border-transparent hover:border-primary
              hover:shadow-2xl hover:shadow-primary/30
              transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{item.title}</h3>
            <p className="text-gray-700 text-base md:text-lg">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
