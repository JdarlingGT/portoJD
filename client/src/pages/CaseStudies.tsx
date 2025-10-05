import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import projects from '@/content/projects.json';

export default function CaseStudies() {
  const [filter, setFilter] = useState<string>('All');
  
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#151515] text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Systems That Sell</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Marketing automation, analytics engineering, and infrastructure projects that drive measurable growth.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tag
                  ? 'bg-accentCyan text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-[#181818] rounded-2xl overflow-hidden hover:ring-2 hover:ring-accentCyan transition-all"
            >
              <Link href={`/deep-dive/${project.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.coverImg}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accentCyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.tagline}</p>
                  
                  {/* KPI Chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.kpis.slice(0, 3).map((kpi, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accentCyan/10 text-accentCyan text-xs rounded-full"
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
