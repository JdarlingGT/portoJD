import { motion } from 'framer-motion';
import AnimatedLogo from '../components/ui/AnimatedLogo';

export default function WhyICreate() {
  return (
    <section id="why-i-create" className="relative py-32 bg-[#0F0F0F] text-white overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        src="/assets/Graphic design work/background-loop.mp4" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-[#0F0F0F]"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <AnimatedLogo size={80} />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Why I Create
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          I create because building something that moves people — visually or emotionally — feels like alchemy. It’s the process of turning a spark of an idea into a tangible, interactive experience that connects, resonates, and solves a problem. That transformation is what drives me.
        </motion.p>
      </div>
    </section>
  );
}
