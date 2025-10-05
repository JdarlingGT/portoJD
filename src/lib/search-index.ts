import MiniSearch from "minisearch";

// Types for items we’ll index
export type SearchDoc = {
  id: string;
  type: "case" | "project" | "deep";
  title: string;
  summary?: string;
  url: string;
  tags?: string[];
};

export async function buildSearchIndex(): Promise<{ mini: MiniSearch; docs: SearchDoc[] }> {
  const docs: SearchDoc[] = [];

  // Case studies JSON
  const cs = (await import("../data/caseStudies.json")).default as any[];
  cs.forEach(c => docs.push({
    id: `case:${c.slug}`,
    type: "case",
    title: c.title,
    summary: c.subtitle,
    url: `/deep/${c.slug}`,
    tags: [c.category].filter(Boolean)
  }));

  // Projects JSON
  const projects = (await import("../data/projects.json")).default as any[];
  projects.forEach(p => docs.push({
    id: `project:${p.title}`,
    type: "project",
    title: p.title,
    summary: p.summary,
    url: "/projects",
    tags: p.tech
  }));

  // Deep dive MD front-matter (light parse: title/summary)
  const slugs = ["the-launchpad","the-guardian","the-compass","the-fortress","the-conductor","the-engine-room"];
  for (const slug of slugs) {
    const raw = await fetch(`/content/deep-dives/${slug}.md`).then(r => r.text()).catch(()=>null);
    if (!raw) continue;
    const fm = parseFrontMatter(raw);
    docs.push({
      id: `deep:${slug}`,
      type: "deep",
      title: fm.title || slug,
      summary: fm.summary || "",
      url: `/deep/${slug}`,
      tags: fm.tags || []
    });
  }

  const mini = new MiniSearch({
    fields: ["title","summary","tags"], storeFields: ["title","summary","url","type"]
  });
  mini.addAll(docs);
  return { mini, docs };
}

// same lightweight FM parser used in DeepDive
function parseFrontMatter(src:string){
  if(!src.startsWith("---")) return { };
  const end = src.indexOf("\n---", 3);
  if(end === -1) return { };
  const raw = src.slice(3, end).trim();
  const fm: any = {};
  raw.split("\n").forEach(l => {
    const [k,...rest] = l.split(":");
    fm[k.trim()] = rest.join(":").trim().replace(/^"|"$/g,"");
  });
  if (typeof fm.tags === "string") fm.tags = fm.tags.split(",").map((s:string)=>s.trim());
  return fm;
}
