import React from 'react';
import toolbox from "../data/toolbox.json";

export default function Toolbox() {
  const keys = Object.keys(toolbox).filter(k => k !== "CurrentSetup");
  const current = (toolbox as any)["CurrentSetup"] as string[] | undefined;

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Toolbox</h1>
        {current?.length && (
          <div className="mb-8 rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">My Current Setup</p>
            <div className="flex flex-wrap gap-2">
              {current.map((c,i)=>(<span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10">{c}</span>))}
            </div>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {keys.map((k) => {
            const items = (toolbox as any)[k] as any[];
            return (
              <section key={k} className="rounded-2xl bg_white/0">
                <h2 className="text-xl font-semibold mb-3">{k}</h2>
                <div className="space-y-3">
                  {items.map((t, i) => (
                    <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{t.name}</p>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-white/10">{t.role}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{t.why}</p>
                      {t.link && <a className="text-sm underline text-accentCyan mt-2 inline-block" href={t.link}>Learn more</a>}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}