import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import projects from '@/content/projects.json';

export default function DeepDive() {
  const [, params] = useRoute('/deep-dive/:slug');
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const project = projects.find(p => p.slug === params?.slug);

  useEffect(() => {
    if (params?.slug) {
      fetch(`/src/content/deep-dives/${params.slug}.md`)
        .then(res => res.text())
        .then(text => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch(() => {
          setMarkdown('# Deep Dive Not Found\n\nThis case study is coming soon.');
          setLoading(false);
        });
    }
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentCyan mx-auto mb-4"></div>
          <p className="text-gray-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#151515] text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {project && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero */}
            <div className="mb-12">
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src={project.coverImg}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{project.tagline}</p>
              
              {/* KPI Row */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.kpis.map((kpi, idx) => (
                  <div key={idx} className="px-4 py-2 bg-accentCyan/10 text-accentCyan rounded-lg">
                    {kpi}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: markdown.replace(/^---[\s\S]*?---\n/, '') }} />
            </div>
          </motion.div>
        )}

        {!project && (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
            <a href="/case-studies" className="inline-block px-6 py-3 bg-accentCyan text-black rounded-xl hover:bg-accentCyan/90 transition-colors">
              View All Projects
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
