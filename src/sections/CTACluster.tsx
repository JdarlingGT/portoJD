import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeIn } from '../styles/animations';
import aboutData from '../data/about.json';

const CTACluster = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="text-center py-16"
    >
      <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {aboutData.cta.title}
      </motion.h2>
      <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
        {aboutData.cta.links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold rounded-lg px-6 py-3"
          >
            {link.label}
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CTACluster;