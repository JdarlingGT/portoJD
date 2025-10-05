import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import caseStudiesData from '../data/caseStudies.json';
import { staggerContainer, fadeIn, slideUp } from '../styles/animations';

const CaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(caseStudiesData.map(cs => cs.category))];

  const filteredStudies = useMemo(() => {
    return caseStudiesData
      .filter(study => 
        selectedCategory === 'All' || study.category === selectedCategory
      )
      .filter(study =>
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <Breadcrumbs />
      <motion.div variants={fadeIn} initial="hidden" animate="show" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Case Studies</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">A selection of projects that showcase my approach to solving complex challenges.</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredStudies.map((study) => (
          <motion.div key={study.id} variants={slideUp}>
            <Link to={`/deep/${study.slug}`} className="block bg-white/5 border border-white/10 rounded-xl overflow-hidden group h-full flex flex-col">
              <div className="relative overflow-hidden">
                <img src={study.image} alt={study.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                {study.roi > 0 && (
                  <div className="absolute top-2 right-2 bg-lime-400/80 text-black text-xs font-bold px-2 py-1 rounded-full">{study.roi}% ROI Lift</div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm font-semibold text-cyan-400 mb-1">{study.category}</p>
                <h3 className="text-xl font-bold text-slate-100 mb-2 flex-grow">{study.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{study.subtitle}</p>
                <span className="flex items-center text-sm font-semibold text-cyan-400 mt-auto group-hover:text-cyan-300 transition-colors">
                  Read Deep Dive <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredStudies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-slate-400">No case studies match your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CaseStudies;