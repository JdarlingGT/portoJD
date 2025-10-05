import React, { useState } from "react";

type T = { quote: string; author: string; title?: string; company?: string };
export default function TestimonialsCarousel({ items = [] as T[] }) {
  const [i, setI] = useState(0);
  if (!items?.length) return null;
  const cur = items[i];
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
      <p className="italic text-gray-200">“{cur.quote}”</p>
      <p className="mt-3 font-medium">{cur.author}</p>
      <p className="text-sm text-gray-400">{[cur.title, cur.company].filter(Boolean).join(" — ")}</p>
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
            className={`h-2 w-2 rounded-full ${idx===i ? "bg-accentCyan" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}