import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-[#0F0F0F] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="/assets/HBB/Screen recording (2).webm"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent"></div>

      <motion.img
        src="/assets/personal logo and bio pics/jd logo .png"
        alt="JD Logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 left-8 h-12 w-12 filter drop-shadow-lg"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl px-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4">
          I connect <span className="text-accentCyan">creative strategy</span> with{" "}
          <span className="text-accentCoral">technical precision.</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Building interactive systems that turn curiosity into conversion.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#case-studies">
            <Button>View Case Studies</Button>
          </a>
          <a href="/resume.pdf" download>
            <Button variant="secondary">Download Résumé</Button>
          </a>
        </div>
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </motion.div>
    </section>
  );
}
