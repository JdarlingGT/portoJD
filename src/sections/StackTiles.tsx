import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, fadeIn } from '../styles/animations';
import aboutData from '../data/about.json';

const StackTiles = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="text-center"
    >
      <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        {aboutData.stack.title}
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {aboutData.stack.categories.map((category, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
          >
            <h4 className="font-bold text-slate-200 text-sm md:text-base mb-2">{category.name}</h4>
            <ul className="text-xs md:text-sm text-slate-400">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeIn} className="mt-8">
        <Link to="/case-studies" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <span>View Case Studies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default StackTiles;