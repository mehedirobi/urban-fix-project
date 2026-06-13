import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80",
    title: "Report Urban Issues Instantly",
    desc: "Help improve your city by reporting infrastructure and community issues in seconds.",
  },
  {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80",
    title: "Track Progress Transparently",
    desc: "Stay informed with real-time updates from report submission to resolution.",
  },
  {
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80",
    title: "Collaborate for Better Communities",
    desc: "Citizens and authorities working together to create cleaner and safer neighborhoods.",
  },
  {
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80",
    title: "Building Smarter Cities Together",
    desc: "Technology-driven solutions for efficient urban management and maintenance.",
  },
];

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-0 mt-4">
      <div className="overflow-hidden rounded-3xl shadow-2xl">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          transitionTime={700}
          showThumbs={false}
          showStatus={false}
          showIndicators
          swipeable
          emulateTouch
          stopOnHover
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-[550px] md:h-[700px]"
            >
              {/* Background Image */}
              <img
                src={slide.img}
                alt={slide.title}
                loading="lazy"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                  scale-105
                "
              />

              {/* Premium Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-slate-950/90
                  via-slate-900/60
                  to-slate-900/20
                "
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-3xl px-6 md:px-16 text-left text-white">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mb-6
                      px-4
                      py-2
                      rounded-full
                      bg-white/10
                      backdrop-blur-md
                      border
                      border-white/20
                    "
                  >
                    Smart Urban Management
                  </motion.div>

                  {/* Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="
                      text-4xl
                      md:text-6xl
                      font-extrabold
                      leading-tight
                      mb-6
                    "
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="
                      text-lg
                      md:text-xl
                      text-gray-200
                      mb-8
                      max-w-2xl
                    "
                  >
                    {slide.desc}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link
                      to="/create-issue"
                      className="
                        btn
                        btn-primary
                        rounded-full
                        px-8
                        hover:scale-105
                        transition-all
                      "
                    >
                      Report Issue
                    </Link>

                    <Link
                      to="/all-issues"
                      className="
                        btn
                        rounded-full
                        px-8
                        border-white
                        text-white
                        bg-transparent
                        hover:bg-white
                        hover:text-black
                        transition-all
                      "
                    >
                      Explore Issues
                    </Link>
                  </motion.div>

                  {/* Stats */}
                  <div className="mt-12 flex flex-wrap gap-10">
                    <div>
                      <h3 className="text-3xl font-bold">10K+</h3>
                      <p className="text-gray-300">
                        Issues Reported
                      </p>
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold">95%</h3>
                      <p className="text-gray-300">
                        Resolution Rate
                      </p>
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold">50+</h3>
                      <p className="text-gray-300">
                        Communities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;