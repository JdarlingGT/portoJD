import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import fm from 'front-matter';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { fadeIn } from '../styles/animations';

interface FrontMatter {
  title: string;
  summary: string;
  tags: string[];
}

interface Heading {
  id: string;
  level: number;
  text: string;
}

const DeepDive = () => {
  const { slug } = useParams<{ slug: string }>();
  const [frontMatter, setFrontMatter] = useState<FrontMatter | null>(null);
  const [html, setHtml] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(`/content/deep-dives/${slug}.md`, { cache: 'no-store' });
        const markdown = await res.text();
        
        const content: any = fm(markdown);
        setFrontMatter(content.attributes);

        const parsedHtml = await marked.parse(content.body);
        setHtml(parsedHtml as string);

        // Generate TOC
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = parsedHtml;
        const headingElements = tempDiv.querySelectorAll('h2, h3');
        const tocHeadings: Heading[] = Array.from(headingElements).map((el, i) => {
          const text = el.textContent || '';
          const level = parseInt(el.tagName.substring(1), 10);
          const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + `-${i}`;
          el.id = id;
          return { id, level, text };
        });
        setHeadings(tocHeadings);
        // We need to re-set the html with the new IDs
        setHtml(tempDiv.innerHTML);

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
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 ml-12 sticky top-24 self-start">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4">On this page</h3>
              <ul className="space-y-2">
                {headings.map(h => (
                  <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 1}rem` }}>
                    <a href={`#${h.id}`} className="text-sm text-slate-400 hover:text-slate-100 transition-colors">{h.text}</a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDive;