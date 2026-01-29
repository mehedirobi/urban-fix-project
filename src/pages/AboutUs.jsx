import React from "react";
import { Wrench, Shield, Users, Building2, CheckCircle, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-primary">About UrbanFix</h2>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          UrbanFix is your go-to platform for reporting and resolving public infrastructure issues efficiently. From potholes to broken streetlights, we make city maintenance simple, fast, and transparent for every citizen.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Wrench className="w-12 h-12 text-primary mb-4" />,
            title: "Easy Reporting",
            desc: "Citizens can submit issues instantly with photos, location & description. No paperwork, no hassle."
          },
          {
            icon: <Shield className="w-12 h-12 text-primary mb-4" />,
            title: "Safe & Verified",
            desc: "All technicians and staff are background-verified. Each task is monitored to ensure quality & accountability."
          },
          {
            icon: <Users className="w-12 h-12 text-primary mb-4" />,
            title: "Trusted by Thousands",
            desc: "A growing community of citizens rely on UrbanFix daily. Transparency & efficiency keep users confident."
          },
          {
            icon: <Building2 className="w-12 h-12 text-primary mb-4" />,
            title: "City-Wide Coverage",
            desc: "We operate across multiple districts, ensuring timely updates & faster resolutions for every reported issue."
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="text-center space-y-6">
        <h3 className="text-3xl font-bold text-primary">How UrbanFix Works</h3>
        <div className="max-w-3xl mx-auto text-left space-y-4 text-gray-700">
          {[
            "Citizens submit a report with photos, location, and description.",
            "Admin verifies and assigns staff to resolve the issue.",
            "Staff updates progress and marks the task resolved.",
            "Citizens receive real-time updates and can track status anytime."
          ].map((step, idx) => (
            <p key={idx}>
              <CheckCircle className="inline w-5 h-5 text-primary mr-2" />
              {step}
            </p>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="space-y-12 text-center">
        <div>
          <h3 className="text-3xl font-bold text-primary mb-4">Our Mission</h3>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            To make city infrastructure management smarter, faster, and fully transparent. UrbanFix bridges citizens and authorities for a cleaner, safer, and well-maintained city.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-primary mb-4">Our Vision</h3>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            A city where every issue is resolved promptly, citizens are empowered, and urban services run efficiently without delays.
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition">
          <Globe className="w-12 h-12 text-primary mb-3 mx-auto" />
          <h3 className="text-2xl font-bold">64 Districts</h3>
          <p className="text-gray-600">Our services span across multiple districts ensuring wide coverage.</p>
        </div>
        <div className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition">
          <Users className="w-12 h-12 text-primary mb-3 mx-auto" />
          <h3 className="text-2xl font-bold">1000+ Users</h3>
          <p className="text-gray-600">Thousands of citizens trust UrbanFix for reporting and resolving issues efficiently.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
