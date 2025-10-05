import React, { useEffect, useState } from "react";

export default function AnchorTOC() {
  const [ids, setIds] = useState<{id:string; text:string}[]>([]);
  useEffect(() => {
    // Give content a moment to render before scanning for headings
    const timer = setTimeout(() => {
      const headings = Array.from(document.querySelectorAll("main h2, main h3"))
        .filter(el => el.id)
        .map(el => ({ id: el.id, text: (el as HTMLElement).innerText }));
      setIds(headings as any);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!ids.length) return null;

  return (
    <aside className="hidden lg:block sticky top-24 text-sm text-gray-300">
      <p className="uppercase tracking-wide text-gray-400 mb-2">On this page</p>
      <ul className="space-y-1">
        {ids.map(h => (
          <li key={h.id}><a href={`#${h.id}`} className="hover:text-accentCyan">{h.text}</a></li>
        ))}
      </ul>
    </aside>
  );
}