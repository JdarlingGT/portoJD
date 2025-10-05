import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '../styles/animations';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div variants={fadeIn} initial="hidden" animate="show" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let's Build Together</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">Have a project in mind or just want to connect? I'm currently available for new opportunities.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left Side: Pitch & Availability */}
        <motion.div variants={slideUp}>
          <h2 className="text-2xl font-bold mb-4">Why We Should Talk</h2>
          <p className="text-slate-400 mb-6">
            I specialize in bridging the gap between marketing vision and technical execution. If you're looking for a partner who can not only strategize but also build and implement, we might be a great fit. My focus is on creating robust, scalable systems that drive measurable results.
          </p>
          <h3 className="text-xl font-bold mb-3">I can help with:</h3>
          <ul className="list-disc list-inside text-slate-400 space-y-2 mb-6">
            <li>Marketing Automation & CRM Architecture</li>
            <li>Analytics & Attribution Modeling</li>
            <li>Web Performance & Security Hardening</li>
            <li>Custom Tooling & Integrations</li>
          </ul>
          <h3 className="text-xl font-bold mb-3">Schedule a Call</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl aspect-w-1 aspect-h-1">
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400">Calendly Embed Placeholder</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div variants={slideUp}>
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
              <input type="text" id="name" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input type="email" id="email" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
              <textarea id="message" rows={5} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="How can I help?"></textarea>
            </div>
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg px-6 py-3 transition-colors">
              Send Message
            </button>
            <p className="text-xs text-slate-500 text-center">Form placeholder - will be wired to EmailJS or Formspree.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;