import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export const CursorTrail = () => {
  const { x, y } = useMousePosition();

  const variants = {
    default: {
      x: x - 8,
      y: y - 8,
      backgroundColor: "#00FFFF",
      mixBlendMode: "difference",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-4 w-4 rounded-full pointer-events-none z-[9999]"
      variants={variants}
      animate="default"
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
};
