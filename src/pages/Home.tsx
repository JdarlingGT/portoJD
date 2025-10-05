import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Wrench, FileText } from 'lucide-react';
import { staggerContainer, fadeIn, slideUp } from '../styles/animations';
import aboutData from '../data/about.json';

const Home = () => {
  const stats = [
    { value: '8+', label: 'Years Experience' },
    { value: '150+', label: 'Projects Completed' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Core Technologies' },
  ];

  const valueBlocks = [
    {
      icon: Briefcase,
      title: 'About Me',
      description: 'Discover my journey, process, and the principles that drive my work.',
      href: '/about',
    },
    {
      icon: FileText,
      title: 'Case Studies',
      description: 'Explore deep dives into my most impactful projects and technical challenges.',
      href: '/case-studies',
    },
    {
      icon: Wrench,
      title: 'My Toolbox',
      description: 'A look at the technologies, tools, and platforms I use to build solutions.',
      href: '/toolbox',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-24 md:space-y-32"
    >
      {/* Hero Section */}
      <motion.section variants={fadeIn} className="text-center pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Jacob Darling
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
            Marketing Strategist & Systems Architect
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/case-studies"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Value Blocks Section */}
      <motion.section variants={staggerContainer} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueBlocks.map((block, index) => (
            <motion.div key={index} variants={slideUp}>
              <Link to={block.href} className="block bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-white/20 transition-all h-full">
                <block.icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-100 mb-2">{block.title}</h3>
                <p className="text-slate-400 mb-4">{block.description}</p>
                <span className="flex items-center text-sm font-semibold text-cyan-400">Learn more <ArrowRight className="w-4 h-4 ml-1" /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section variants={fadeIn} className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl md:text-5xl font-bold text-cyan-400">{stat.value}</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Social Proof Section */}
      <motion.section variants={fadeIn} className="container mx-auto px-4 max-w-3xl text-center">
        <p className="text-lg md:text-xl italic text-slate-300 mb-4">"{aboutData.testimonials[0].quote}"</p>
        <p className="font-bold text-slate-100">{aboutData.testimonials[0].author}, <span className="text-slate-400">{aboutData.testimonials[0].title}</span></p>
      </motion.section>

    </motion.div>
  );
};

export default Home;