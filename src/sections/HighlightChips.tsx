import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { highlights } from '../lib/resume-data';
import { fadeIn, staggerContainer } from '../styles/animations';

const HighlightChips = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto"
    >
      {highlights.map((highlight, index) => (
        <motion.div
          key={index}
          variants={fadeIn}
          className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1.5 text-xs sm:text-sm text-slate-300"
        >
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span>{highlight}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HighlightChips;