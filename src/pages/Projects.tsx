import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import projectsData from '../data/projects.json';
import { staggerContainer, fadeIn, slideUp } from '../styles/animations';

const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <Breadcrumbs />
      <motion.div variants={fadeIn} initial="hidden" animate="show" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Side Projects & Experiments</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">A few things I've built to explore new technologies and solve interesting problems.</p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            variants={slideUp}
            className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
            <p className="text-slate-400 mb-4 flex-grow">{project.summary}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map(tech => (
                <span key={tech} className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{tech}</span>
              ))}
            </div>

            <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-white/10">
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-slate-300 hover:text-cyan-400 transition-colors">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-slate-300 hover:text-cyan-400 transition-colors">
                <Github className="w-4 h-4 mr-2" />
                Repo
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;