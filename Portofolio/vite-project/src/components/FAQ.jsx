import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const faqs = [
  {
    q: "What kind of projects do you work on?",
    a: "I primarily build custom web applications, business websites, internal tools, dashboards, and AI-powered solutions. I also help improve existing products through performance optimization and security reviews."
  },
  {
    q: "Do you only work with businesses?",
    a: "No. I work with startups, founders, agencies, and individuals. Whether you're launching your first idea or improving an existing product, I'm happy to discuss how I can help."
  },
  {
    q: "Can you improve an existing website?",
    a: "Absolutely. I can optimize performance, enhance security, fix bugs, modernize the user experience, or add new features without rebuilding everything from scratch."
  },
  {
    q: "How do you approach security?",
    a: "Security is built into the development process from day one. I follow industry best practices, identify potential vulnerabilities early, and prioritize building reliable, trustworthy applications."
  },
  {
    q: "What technologies do you use?",
    a: "I work across modern web technologies including React, Next.js, Node.js, Laravel, PostgreSQL, MySQL, Tailwind CSS, Docker, and AI APIs. The technology stack is always chosen based on the project's requirements."
  },
  {
    q: "How do we get started?",
    a: "It starts with a conversation. We'll discuss your goals, define the scope, choose the right approach, and create a clear plan before any development begins."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2>FAQs</h2>
          <p>Everything you might want to know before we start building together.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <motion.div 
                  className="faq-icon"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="faq-answer-wrapper"
                  >
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
