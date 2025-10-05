import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../lib/resume-data';
import { staggerContainer, fadeIn } from '../styles/animations';

const TimelineVertical = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.h2 
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12"
      >
        Professional Journey
      </motion.h2>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative border-l-2 border-white/10 ml-4 md:ml-0"
      >
        {experience.map((job, index) => (
          <motion.div key={index} variants={fadeIn} className="mb-10 ml-8">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-900 rounded-full -left-3 ring-8 ring-cyan-900/20">
              <svg className="w-2.5 h-2.5 text-cyan-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/>
                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-100">
              {job.role} <span className="text-cyan-400 text-sm font-medium ml-3">@ {job.org}</span>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-slate-500">{job.period}</time>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              {job.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            {job.tech && (
              <div className="flex flex-wrap gap-2 mt-3">
                {job.tech.map((tech, i) => (
                  <span key={i} className="bg-slate-800 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{tech}</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TimelineVertical;