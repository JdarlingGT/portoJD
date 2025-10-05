import React from 'react';
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../styles/animations";
import { Link } from "react-router-dom";

type Tile = { title: string; summary: string; slug: string };
export default function StackTiles({ tiles = [] as Tile[] }) {
  if (!tiles?.length) return null;
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tiles.map((t, i) => (
        <motion.div key={i} variants={slideUp}
          className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition">
          <h4 className="font-semibold">{t.title}</h4>
          <p className="mt-1 text-sm text-gray-300">{t.summary}</p>
          <Link to={`/deep/${t.slug}`} className="inline-block mt-3 text-accentCyan underline">
            View Case Study
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}