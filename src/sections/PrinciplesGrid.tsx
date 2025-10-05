import React from 'react';
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../styles/animations";

type Item = { title: string; subtitle?: string; copy?: string };
export default function PrinciplesGrid({ items = [] as Item[] }) {
  if (!items?.length) return null;
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((p, i) => (
        <motion.div key={i} variants={slideUp} className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-sm uppercase tracking-wide text-cyan-300">{p.title}</p>
          <h4 className="mt-1 font-semibold">{p.subtitle}</h4>
          <p className="mt-2 text-sm text-gray-300">{p.copy}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}