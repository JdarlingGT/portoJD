import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const shortVideos = [
  { id: "gB8szYMVPVs", title: "Fun/Creative" },
  { id: "8L23hHcZ398", title: "Creative Edit" },
  { id: "kN1G4BIXA9k", title: "Energy Reel" },
];

export default function About() {
  const images = [
    "/assets/personal logo and bio pics/bio pic 1.jpg",
    "/assets/personal logo and bio pics/DSC_7429.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 8000); // Cycle every 8 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section id="about" className="relative py-24 bg-[#0F0F0F] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Jacob Darling</h2>
          <p className="text-gray-300 text-lg">
            Marketing strategist. Systems architect. Builder of human-centered automation.
          </p>
          <p className="text-gray-400">
            I fuse creative strategy with analytical precision to craft experiences that convert curiosity into connection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-square rounded-full overflow-hidden shadow-2xl ring-2 ring-accentCyan"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={index}
              src={images[index]}
              alt="Jacob Darling"
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ opacity: { duration: 1.5, ease: "easeInOut" } }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-24">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {shortVideos.map((video, i) => (
            <motion.div 
              key={video.id}
              className="aspect-video bg-[#181818] rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?controls=0&showinfo=0&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full"
                loading="lazy"
              ></iframe>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
