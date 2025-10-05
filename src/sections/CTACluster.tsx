import React from 'react';

export default function CTACluster() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <a href="/case-studies" className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10">Explore Case Studies</a>
      <a href="/toolbox" className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10">See My Toolbox</a>
      <a href="/contact" className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10">Schedule a Call</a>
    </div>
  );
}