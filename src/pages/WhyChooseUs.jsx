import React, { memo } from "react";

const WHY_ITEMS = [
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

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-base-200 px-5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Why Choose UrbanFix?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {WHY_ITEMS.map((item, index) => (
            <article
              key={index}
              className="p-8 bg-white rounded-2xl shadow-md min-h-[280px]
                flex flex-col justify-start
                border border-transparent
                transition-all duration-300
                hover:border-primary
                hover:shadow-2xl hover:shadow-primary/20
                hover:-translate-y-2"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(WhyChooseUs);