import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import fm from 'front-matter';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import AnchorTOC from '../components/ui/AnchorTOC';
import { fadeIn } from '../styles/animations';

interface FrontMatter {
  title: string;
  summary: string;
  tags: string[];
}

const DeepDive = () => {
  const { slug } = useParams<{ slug: string }>();
  const [frontMatter, setFrontMatter] = useState<FrontMatter | null>(null);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    if (!slug) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(`/content/deep-dives/${slug}.md`, { cache: 'no-store' });
        const markdown = await res.text();
        
        const content: any = fm(markdown);
        setFrontMatter(content.attributes);

        const rawHtml = await marked.parse(content.body);

        const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');
        const headings = doc.querySelectorAll('h2, h3');
        
        headings.forEach((heading, i) => {
          const text = heading.textContent || '';
          heading.id = `${slugify(text)}-${i}`;
        });

        setHtml(doc.body.innerHTML);

      } catch (error) {
        console.error('Failed to fetch or parse markdown:', error);
        setHtml('<p>Error loading content.</p>');
      }
    };

    fetchContent();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <Breadcrumbs />
      <motion.div variants={fadeIn} initial="hidden" animate="show">
        <Link to="/case-studies" className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Case Studies
        </Link>

        {frontMatter && (
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{frontMatter.title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{frontMatter.summary}</p>
            <div className="flex justify-center gap-2 mt-4">
              {frontMatter.tags.map(tag => (
                <span key={tag} className="bg-white/10 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </header>
        )}

        <div className="flex">
          <article
            className="prose prose-invert max-w-3xl mx-auto lg:mx-0 lg:flex-grow"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <AnchorTOC />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDive;