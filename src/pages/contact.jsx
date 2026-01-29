import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      Swal.fire({ icon: "error", title: "Please fill all fields!" });
      return;
    }
    // Just demo, backend integration optional
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">Contact Us</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows={5}
          required
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
