import { motion } from "framer-motion";

export default function AnimatedLogo({ size = 60 }: { size?: number }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.8, ease: "easeInOut" },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      className="cursor-pointer pulse-glow"
    >
      {/* J curve */}
      <motion.path
        d="M30 10 C30 10, 30 80, 60 80"
        stroke="#00FFFF"
        strokeWidth="5"
        strokeLinecap="round"
        variants={pathVariants}
      />
      {/* D curve */}
      <motion.path
        d="M65 10 L65 80 C65 80, 95 80, 95 45 C95 10, 65 10, 65 10 Z"
        stroke="#FF6F61"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        variants={pathVariants}
      />
    </motion.svg>
  );
}
