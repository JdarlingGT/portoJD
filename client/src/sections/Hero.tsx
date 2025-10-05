import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#0F0F0F] to-[#121212] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="/assets/hero-bg.webm"
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
          <Button>View Case Studies</Button>
          <Button variant="secondary">Download Résumé</Button>
        </div>
      </motion.div>
    </section>
  );
}
