import React from 'react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-8">
        <section>
          <h1 className="text-3xl font-bold mb-2">Let’s build your growth system</h1>
          <p className="text-gray-300 mb-6">Strategy, implementation, or both—I bridge vision and execution.</p>
          <form className="space-y-4" action="https://formspree.io/f/your-id" method="POST">
            <label className="block">
              <span className="text-sm">Your name</span>
              <input name="name" required className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" />
            </label>
            <label className="block">
              <span className="text-sm">Email</span>
              <input type="email" name="email" required className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" />
            </label>
            <label className="block">
              <span className="text-sm">Message</span>
              <textarea name="message" rows={5} required className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" />
            </label>
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10">Send</button>
          </form>
        </section>
        <aside>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Schedule</p>
            <div className="aspect-video rounded-lg overflow-hidden bg-white/5">
              {/* Replace src with your Calendly embed URL */}
              <iframe title="Calendly" src="" className="w-full h-full" loading="lazy"></iframe>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}