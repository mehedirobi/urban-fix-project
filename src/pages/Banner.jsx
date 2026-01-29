import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import bannerImg1 from "../assets/allteam.jpg";
import bannerImg2 from "../assets/working.jpg";
import bannerImg3 from "../assets/waterfixing.jpg";
import bannerImg4 from "../assets/teamwalking.jpg";

const slides = [
  {
    img: bannerImg1,
    title: "Community-Driven City Solutions",
    desc: "Empowering citizens to report and track urban issues together.",
  },
  {
    img: bannerImg2,
    title: "Transparent Issue Tracking",
    desc: "Stay updated with real-time progress and resolutions.",
  },
  {
    img: bannerImg3,
    title: "Faster Problem Resolution",
    desc: "From reporting to fixing — everything in one platform.",
  },
  {
    img: bannerImg4,
    title: "Building Smarter Cities",
    desc: "Collaboration between citizens and authorities made easy.",
  },
];

const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        swipeable
        emulateTouch
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="ml-6 md:ml-14 max-w-xl text-left text-white">
                <h2 className="text-xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base opacity-90 mb-4">
                  {slide.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
