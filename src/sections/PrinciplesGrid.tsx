import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '../styles/animations';
import aboutData from '../data/about.json';

const PrinciplesGrid = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
    >
      {aboutData.principles.map((principle, index) => (
        <motion.div
          key={index}
          variants={slideUp}
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-slate-100 mb-2">{principle.title}</h3>
          <p className="text-slate-400">{principle.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PrinciplesGrid;