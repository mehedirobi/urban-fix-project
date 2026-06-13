import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return Swal.fire({
        icon: "error",
        title: "Please fill all fields",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you as soon as possible.",
      timer: 2000,
      showConfirmButton: false,
    });

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-center
            rounded-3xl
            bg-gradient-to-r
            from-primary
            to-secondary
            text-white
            p-10
            md:p-16
            mb-16
          "
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Contact UrbanFix
          </h1>

          <p className="max-w-2xl mx-auto text-white/80 text-lg">
            Have questions, suggestions, or need support?
            Our team is ready to help improve your experience.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-base-200 rounded-3xl p-6 text-center">
            <Mail className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Email
            </h3>
            <p className="opacity-70">
              support@urbanfix.com
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-6 text-center">
            <Phone className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Phone
            </h3>
            <p className="opacity-70">
              +8801336458100
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-6 text-center">
            <MapPin className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Location
            </h3>
            <p className="opacity-70">
              Dhaka, Bangladesh
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-6 text-center">
            <Clock className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Response Time
            </h3>
            <p className="opacity-70">
              Within 24 Hours
            </p>
          </div>
        </div>

        {/* Form + Info */}
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              bg-base-200
              rounded-3xl
              p-8
              shadow-sm
            "
          >
            <h2 className="text-3xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <textarea
                name="message"
                rows="6"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              bg-base-200
              rounded-3xl
              p-8
              flex
              flex-col
              justify-center
            "
          >
            <h2 className="text-3xl font-bold mb-6">
              We're Here To Help
            </h2>

            <p className="opacity-70 leading-relaxed mb-6">
              UrbanFix is committed to helping citizens
              report, track, and resolve urban issues more
              efficiently. Whether you need technical support,
              have partnership inquiries, or want to share
              feedback, our team is available to assist you.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">
                  Office Hours
                </h4>
                <p className="opacity-70">
                  Sunday - Thursday, 9:00 AM - 6:00 PM
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Support Email
                </h4>
                <p className="opacity-70">
                  support@urbanfix.com
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Emergency Support
                </h4>
                <p className="opacity-70">
                  Available for critical urban incidents.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;