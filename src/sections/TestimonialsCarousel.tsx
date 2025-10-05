import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import aboutData from '../data/about.json';

const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);
  const testimonials = aboutData.testimonials;

  const paginate = (newDirection: number) => {
    setIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-3xl mx-auto overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8">What Others Say</h2>
      <AnimatePresence initial={false} custom={index}>
        <motion.div
          key={index}
          custom={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="w-full text-center px-12"
        >
          <p className="text-lg md:text-xl italic text-slate-300 mb-4">"{testimonials[index].quote}"</p>
          <p className="font-bold text-slate-100">{testimonials[index].name}</p>
          <p className="text-sm text-slate-400">{testimonials[index].title}</p>
        </motion.div>
      </AnimatePresence>
      <button onClick={() => paginate(-1)} className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={() => paginate(1)} className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TestimonialsCarousel;