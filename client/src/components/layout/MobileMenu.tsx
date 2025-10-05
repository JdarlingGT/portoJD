import { motion, AnimatePresence } from "framer-motion";
import { useContext } from 'react';
import { NavContext } from "./NavContext";

export default function MobileMenu() {
  const navContext = useContext(NavContext);
  if (!navContext) throw new Error('MobileMenu must be used within a NavProvider');
  const { menuOpen, toggleMenu } = navContext;

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 22, stiffness: 150 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col p-8 text-white md:hidden"
        >
          <button
            className="self-end text-3xl text-gray-400 hover:text-white"
            onClick={toggleMenu}
          >
            ×
          </button>
          <nav className="mt-12 flex flex-col gap-6 text-2xl font-medium">
            {["About", "Case Studies", "Stack", "Resources", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                onClick={toggleMenu}
                className="hover:text-accentCyan transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
