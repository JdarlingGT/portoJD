import { motion } from "framer-motion";

const videos = [
  { id: "K6kco8-OZO0", title: "Creative Energy — Intro" },
  { id: "8L23hHcZ398", title: "Behind the Edits" },
  { id: "RfkVYOZR1Ao", title: "Tech Flow Experiment" },
  { id: "gB8szYMVPVs", title: "Momentum in Motion" },
  { id: "4cFQu1b_HZY", title: "Transitions & Light" },
  { id: "2qKhmvxeUg4", title: "Why I Create" },
  { id: "CGUT9tQvj7Y", title: "Behind The Lens" },
  { id: "kN1G4BIXA9k", title: "Energy & Motion Reel" },
  { id: "XyM-MG4Nvqc", title: "Experimental Layer" },
];

export default function Reel() {
  return (
    <section id="reel" className="py-24 bg-gradient-to-b from-[#0F0F0F] to-[#151515] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          🎥 Personal Creative Reel
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((vid, i) => (
            <motion.a
              key={vid.id}
              href={`https://www.youtube.com/watch?v=${vid.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-[#181818] shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <img
                src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                alt={vid.title}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-lg font-semibold text-white tracking-wide">
                  ▶ {vid.title}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
