import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

export default function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(()=> setDone(true), 1800);
    return ()=> clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[999] bg-[#0F0F0F] flex items-center justify-center">
          <AnimatedLogo size={90} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
