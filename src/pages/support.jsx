import React, { useState } from "react";

const faqs = [
  { q: "How do I report an issue?", a: "Go to the 'All Issues' page and click 'Report Issue'." },
  { q: "Can I edit my submitted issue?", a: "Yes, you can edit issues from your dashboard under 'My Issues'." },
  { q: "How long does it take to resolve an issue?", a: "It depends on the priority and type of issue. High priority issues are handled first." },
  { q: "Who can I contact for urgent problems?", a: "Use the 'Contact' page or reach out to city support directly." },
];

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">Help & Support</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-xl p-4 shadow-sm cursor-pointer" onClick={() => toggle(i)}>
            <h3 className="font-semibold text-lg flex justify-between items-center">
              {faq.q}
              <span>{openIndex === i ? "-" : "+"}</span>
            </h3>
            {openIndex === i && <p className="mt-2 text-gray-600">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
