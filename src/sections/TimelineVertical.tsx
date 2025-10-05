import React from 'react';
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../styles/animations";

type Role = { role: string; org: string; period: string; bullets?: string[] };
export default function TimelineVertical({ roles = [] as Role[] }) {
  if (!roles?.length) return null;
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
      {roles.map((r, i) => (
        <motion.div key={i} variants={slideUp} className="mb-8">
          <div className="w-3 h-3 rounded-full bg-accentCyan absolute -left-[7px] mt-2" />
          <h4 className="font-semibold">{r.role}</h4>
          <p className="text-sm text-gray-300">{r.org}</p>
          <p className="text-xs text-gray-400">{r.period}</p>
          {!!r.bullets?.length && (
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-200">
              {r.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
            </ul>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}