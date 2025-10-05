import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, slideUp } from '../styles/animations';
import aboutData from '../data/about.json';

const Partnerships = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="text-center"
    >
      <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        Key Partnerships & Roles
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {aboutData.partnerships.map((partner, index) => (
          <motion.div
            key={index}
            variants={slideUp}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left"
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-1">{partner.name}</h3>
            <p className="text-sm font-semibold text-slate-300 mb-3">{partner.role}</p>
            <p className="text-slate-400">{partner.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Partnerships;