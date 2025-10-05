import { motion } from 'framer-motion';

export default function WhyICreate() {
  return (
    <section id="why-i-create" className="py-24 bg-gradient-to-b from-[#151515] to-[#0F0F0F] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Why I Create
        </motion.h2>
        <motion.div 
          className="aspect-video mb-8 shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <iframe 
            src="https://www.youtube.com/embed/2qKhmvxeUg4"
            title="YouTube video player"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </motion.div>
        <motion.p 
          className="text-lg text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          This is a placeholder for the narrative story. I will add the full content here once you provide it.
        </motion.p>
      </div>
    </section>
  );
}
