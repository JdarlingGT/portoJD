import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import data from "../data/caseStudies.json";
import { slideUp, staggerContainer } from "../styles/animations";
import { Link } from "react-router-dom";

const CATS = ["All","Automation","Analytics","E-commerce","Branding"] as const;

export default function CaseStudies() {
  const [q, setQ] = useState(""); 
  const [cat, setCat] = useState<typeof CATS[number]>("All");

  const items = useMemo(() => {
    return (data as any[]).filter(i => {
      const matchCat = cat === "All" || i.category === cat;
      const hay = (i.title + " " + i.subtitle).toLowerCase();
      return matchCat && hay.includes(q.toLowerCase());
    });
  }, [q, cat]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2">Case Studies</h1>
        <p className="text-gray-300 mb-6">Proof, not promises—filter and dive deep.</p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search case studies…" 
                 className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 w-full sm:w-80" />
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button key={c} onClick={()=>setCat(c)}
                className={`px-3 py-1 rounded-full border ${cat===c ? "bg-accentCyan/20 border-accentCyan" : "bg-white/5 border-white/10"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once:true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <motion.article key={i.id} variants={slideUp}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="h-44 overflow-hidden">
                <img loading="lazy" src={i.image} alt={i.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-xs text-accentCyan">{i.category}</div>
                <h3 className="mt-1 font-semibold">{i.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{i.subtitle}</p>
                {i.roi ? <div className="mt-3 text-sm font-semibold text-cyan-300">ROI: {i.roi}%</div> : null}
                <Link to={`/deep/${i.slug}`} className="inline-block mt-4 text-accentCyan underline">Read</Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  );
}