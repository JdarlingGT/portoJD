import React from 'react';
import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "../styles/animations";

export default function HighlightChips({ items = [] as string[] }) {
  if (!items?.length) return null;
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-4 flex flex-wrap gap-2"
    >
      {items.map((chip, i) => (
        <motion.span key={i} variants={slideUp} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white">
          {chip}
        </motion.span>
      ))}
    </motion.div>
  );
}