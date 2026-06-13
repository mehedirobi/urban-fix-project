import React, { memo } from "react";

const VISION_MISSION_CARDS = [
  {
    emoji: "🌍",
    title: "Cleaner Environment",
    desc: "Report problems like garbage overflow, damaged roads, or water leakage and help keep your city clean and healthy.",
  },
  {
    emoji: "⚡",
    title: "Faster Resolution",
    desc: "Track issue status in real time and get faster responses through a smart digital system designed for efficiency.",
  },
  {
    emoji: "🤝",
    title: "Citizen Empowerment",
    desc: "Every reported issue contributes to a better city — empowering citizens to actively participate in community improvement.",
  },
];

const VisionMission = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Vision & Mission
          </h2>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VISION_MISSION_CARDS.map((card, index) => (
            <article
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md min-h-[320px]
                flex flex-col items-center text-center
                transition-all duration-300
                hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="text-5xl md:text-6xl mb-5">
                {card.emoji}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {card.title}
              </h3>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {card.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(VisionMission);