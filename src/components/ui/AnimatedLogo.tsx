import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ size = 40 }: { size?: number }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke="#00FFFF"
        variants={draw}
        custom={1}
        strokeWidth={4}
        fill="none"
      />
      <motion.line
        x1="30"
        y1="30"
        x2="70"
        y2="70"
        stroke="#FF6F61"
        variants={draw}
        custom={2}
        strokeWidth={4}
      />
      <motion.line
        x1="30"
        y1="70"
        x2="70"
        y2="30"
        stroke="#C0FF33"
        variants={draw}
        custom={3}
        strokeWidth={4}
      />
    </motion.svg>
  );
};

export default AnimatedLogo;