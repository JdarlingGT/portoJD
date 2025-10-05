import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-[#0F0F0F] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
          style={{ width: '177.77vh', minWidth: '100%', height: '100vh', minHeight: '56.25vw' }}
          src="https://www.youtube.com/embed/K6kco8-OZO0?autoplay=1&loop=1&mute=1&controls=0&playlist=K6kco8-OZO0&playsinline=1&showinfo=0&rel=0"
          title="Hero Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
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
    </section>
  );
}
