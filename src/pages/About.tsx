import React from 'react';
import about from "../data/about.json";
import HighlightChips from "../sections/HighlightChips";
import PrinciplesGrid from "../sections/PrinciplesGrid";
import StackTiles from "../sections/StackTiles";
import TimelineVertical from "../sections/TimelineVertical";
import Partnerships from "../sections/Partnerships";
import TestimonialsCarousel from "../sections/TestimonialsCarousel";
import CTACluster from "../sections/CTACluster";
import { motion } from "framer-motion";
import { slideUp } from "../styles/animations";

export default function About() {
  const { hero, highlights, principles, stackTiles, timeline, partnerships, testimonials } = about as any;

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* HERO */}
      <section id="story" className="py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1 variants={slideUp} initial="hidden" whileInView="show" className="text-4xl font-bold">
            {hero.headline}
          </motion.h1>
          <motion.p variants={slideUp} initial="hidden" whileInView="show" className="mt-3 text-lg text-gray-300 max-w-3xl">
            {hero.body}
          </motion.p>
          <div className="mt-6 flex gap-3">
            <a className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20" href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
            <a className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20" href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
          </div>
          <HighlightChips items={highlights} />
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">The Principles That Drive My Work</h2>
          <PrinciplesGrid items={principles} />
        </div>
      </section>

      {/* STACK TILES */}
      <section id="stack" className="py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">My Interactive MarTech Stack</h2>
          <StackTiles tiles={stackTiles} />
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">Professional Journey & Impact</h2>
          <TimelineVertical roles={timeline} />
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" className="py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">Ongoing Strategic Partnerships</h2>
          <Partnerships items={partnerships} />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">What Colleagues & Clients Say</h2>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* CTA CLUSTER */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Marketing Technology?</h2>
          <CTACluster />
        </div>
      </section>
    </main>
  );
}