import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import menuData from '../../data/menu.json';

const MegaMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <nav className="relative" onMouseLeave={() => setIsMenuOpen(false)}>
      <button
        onMouseEnter={() => setIsMenuOpen(true)}
        className="flex items-center space-x-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
      >
        <span>Menu</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full mt-4 -ml-4 w-max bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg"
          >
            <div className="grid grid-cols-5 gap-x-8 p-8">
              {menuData.columns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-3">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">{column.label}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="block text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MegaMenu;