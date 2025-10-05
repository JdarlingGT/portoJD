import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";

export default function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex items-center justify-center bg-[#0F0F0F] z-[9999]"
        >
          <AnimatedLogo size={120} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
