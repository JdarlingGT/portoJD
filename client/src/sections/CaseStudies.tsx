import { motion } from "framer-motion";
import data from "../data/caseStudies.json";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Case Studies</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              className="bg-[#181818] rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="h-48 overflow-hidden bg-black/20">
                {item.video ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    poster={item.image} 
                    src={item.video}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{item.subtitle}</p>
                <p className="mt-4 text-accentCyan font-bold">
                  ROI: {item.roi}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
