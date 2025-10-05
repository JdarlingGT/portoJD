import React from 'react';

type Partner = { client: string; type?: string; results?: string[] };
export default function Partnerships({ items = [] as Partner[] }) {
  if (!items?.length) return null;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p, i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <h4 className="font-semibold">{p.client}</h4>
          <p className="text-xs text-gray-400">{p.type}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-200 space-y-1">
            {p.results?.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}