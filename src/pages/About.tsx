import React from 'react';
import { motion } from 'framer-motion';

// Import data
import aboutData from '../data/about.json';

// Import sections
import HighlightChips from '../sections/HighlightChips';
import PrinciplesGrid from '../sections/PrinciplesGrid';
import StackTiles from '../sections/StackTiles';
import TimelineVertical from '../sections/TimelineVertical';
import Partnerships from '../sections/Partnerships';
import TestimonialsCarousel from '../sections/TestimonialsCarousel';
import CTACluster from '../sections/CTACluster';

// Import UI components
import AnchorTOC from '../components/ui/AnchorTOC';

// Import animation variants
import { fadeIn, staggerContainer } from '../styles/animations';

const About = () => {
  const tocItems = [
    { id: 'story', label: 'My Story' },
    { id: 'principles', label: 'Principles' },
    { id: 'stack', label: 'Stack' },
    { id: 'journey', label: 'Journey' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  return (
    <div className="relative">
      <AnchorTOC items={tocItems} />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-24 md:space-y-32"
      >
        <section id="story" className="scroll-mt-20">
          <motion.div variants={fadeIn} className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{aboutData.hero.title}</h1>
            <p className="text-lg md:text-xl text-slate-300">{aboutData.hero.subtitle}</p>
          </motion.div>
          <motion.div variants={fadeIn} className="mt-8">
            <HighlightChips />
          </motion.div>
        </section>

        <section id="principles" className="scroll-mt-20 container mx-auto px-4">
          <PrinciplesGrid />
        </section>

        <section id="stack" className="scroll-mt-20 container mx-auto px-4">
          <StackTiles />
        </section>

        <section id="journey" className="scroll-mt-20 container mx-auto px-4">
          <TimelineVertical />
        </section>

        <section id="partnerships" className="scroll-mt-20 container mx-auto px-4">
          <Partnerships />
        </section>

        <section id="testimonials" className="scroll-mt-20 container mx-auto px-4">
          <TestimonialsCarousel />
        </section>

        <section id="contact" className="scroll-mt-20 container mx-auto px-4">
          <CTACluster />
        </section>
      </motion.div>
    </div>
  );
};

export default About;