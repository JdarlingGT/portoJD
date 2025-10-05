import React, { useEffect, useMemo, useRef, useState } from "react";
import { buildSearchIndex, SearchDoc } from "../../lib/search-index";

export default function SearchModal({ open, onClose }:{ open:boolean; onClose:()=>void }) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<SearchDoc[]>([]);
  const [mini, setMini] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const { mini } = await buildSearchIndex();
      setMini(mini);
      setTimeout(()=> inputRef.current?.focus(), 0);
    })();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent){ if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!mini) return;
    const hits = q ? mini.search(q, { prefix: true, fuzzy: 0.2 }) : [];
    setRes(hits.map((h:any)=> h as SearchDoc));
  }, [q, mini]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden">
        <div className="p-3 border-b border-white/10">
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search case studies, projects…"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500" />
        </div>
        <div className="max-h-[60vh] overflow-auto divide-y divide-white/10">
          {res.length === 0 && <div className="p-4 text-gray-400 text-sm">Type to search.</div>}
          {res.map((r, i) => (
            <a key={i} href={(r as any).url} onClick={onClose}
               className="flex items-start gap-3 p-4 hover:bg-white/5">
              <span className="text-[10px] uppercase px-2 py-1 bg-white/10 rounded-full">{(r as any).type}</span>
              <div>
                <div className="font-medium">{(r as any).title}</div>
                {(r as any).summary && <div className="text-sm text-gray-400">{(r as any).summary}</div>}
              </div>
            </a>
          ))}
        </div>
        <div className="p-2 text-right text-xs text-gray-500">Esc to close</div>
      </div>
    </div>
  );
}
