import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function AnimatedLogo({ size = 60 }: { size?: number }) {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5 + i * 0.2, ease: "easeInOut" },
    }),
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center justify-center cursor-pointer pulse-glow"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
        className="drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
      >
        {/* J Path */}
        <motion.path
          d="M30 10 C30 10, 30 80, 60 80"
          stroke="#00FFFF"
          strokeWidth="5"
          strokeLinecap="round"
          variants={pathVariants}
          custom={0}
        />
        {/* D Path */}
        <motion.path
          d="M65 10 L65 80 C65 80, 95 80, 95 45 C95 10, 65 10, 65 10 Z"
          stroke="#FF6F61"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          variants={pathVariants}
          custom={1}
        />
      </motion.svg>

      {/* Morphing Name Reveal */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 10 : -10,
          color: hovered ? "#00FFFF" : "#FFFFFF",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute left-full pl-3 font-bold tracking-wide text-lg"
      >
        Jacob Darling
      </motion.span>
    </motion.div>
  );
}
