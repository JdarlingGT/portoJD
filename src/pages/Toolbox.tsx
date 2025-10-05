import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import toolboxData from '../data/toolbox.json';
import { staggerContainer, fadeIn, slideUp } from '../styles/animations';

const Toolbox = () => {
  const categories = Object.keys(toolboxData).filter(k => k !== 'CurrentSetup');

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div variants={fadeIn} initial="hidden" animate="show" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">My Toolbox</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">The tools and technologies I use to build, measure, and scale.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {categories.map(category => (
          <motion.div key={category} variants={slideUp} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">{category}</h2>
            <ul className="space-y-3">
              {(toolboxData as any)[category].map((tool: any, index: number) => (
                <li key={index} className="flex flex-col">
                  <a href={tool.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-100 hover:text-white transition-colors">{tool.name}</a>
                  <p className="text-sm text-slate-400">{tool.why}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeIn} initial="hidden" animate="show" className="text-center">
        <div className="inline-block bg-cyan-900/50 border border-cyan-700 rounded-xl p-6 max-w-lg">
          <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center justify-center"><Star className="w-5 h-5 mr-2"/> My Current Go-To Stack</h3>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {(toolboxData.CurrentSetup as string[]).map(tool => (
              <span key={tool} className="font-semibold text-slate-200">{tool}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Toolbox;