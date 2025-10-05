import React from 'react';
import Breadcrumbs from "../components/ui/Breadcrumbs";
import data from "../data/projects.json";

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2">Technical Projects</h1>
        <p className="text-gray-300 mb-6">Dashboards, assistants, and performance tooling.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {(data as any[]).map((p, i) => (
            <article key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech?.map((t:string,idx:number)=>(<span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/10">{t}</span>))}
              </div>
              <div className="mt-3 flex gap-3 text-sm">
                {p.links?.demo && <a className="underline text-accentCyan" href={p.links.demo}>Demo</a>}
                {p.links?.repo && <a className="underline text-accentCyan" href={p.links.repo}>Repo</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}