import Banner from "./Banner";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import LatestResolvedIssues from "./LatestResolvedIssues";
import WhyChooseUs from "./WhyChooseUs";
import VisionMission from "./VisionMission"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full bg-base-200">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] max-h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="px-4">
          <h1 className="text-4xl md:text-5xl text-primary lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to UrbanFix
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg mb-8">
            Report city issues easily, track progress transparently, and help
            make your city cleaner, safer, and smarter.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/all-issues" className="btn bg-indigo-600 text-white">
              Explore Issues
            </Link>
            <Link to="/create-issue" className="btn bg-indigo-600 text-white">
              Report an Issue
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-white/80 text-xl">
          ↓
        </div>
      </section>

      {/* Banner / Carousel (visual flow) */}
      <section className="px-4 -mt-12">
        <Banner />
      </section>

      {/* Latest Resolved Issues */}
      <section className="py-10 px-4 my-6">
        <LatestResolvedIssues />
      </section>

      {/* Features */}
      <section className="py-10 px-4">
        <Features />
      </section>

      {/* How It Works */}
      <section className="py-10 px-4 my-6">
        <HowItWorks />
      </section>

      {/* Why Choose Us */}
      <section className="py-10 px-4">
        <WhyChooseUs />
      </section>

      {/* Vision & Mission */}
      <section className="py-10 px-4 my-6">
        <VisionMission />
      </section>
    </div>
  );
};

export default Home;
