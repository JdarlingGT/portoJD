import React, { useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavContext } from './NavContext';
import { Button } from '@/components/ui/button';
import { IconSet } from '@/components/ui/IconSet';
import { Link } from 'wouter';

// Main MegaMenu Component
export const MegaMenu: React.FC = () => {
  const navContext = useContext(NavContext);
  if (!navContext) return null; // Or a loading/error state

  const { menuOpen, toggleMenu, greeting, userType } = navContext;

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        toggleMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, toggleMenu]);

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.45, ease: 'easeInOut', staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={menuRef}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 top-[60px] md:top-[80px] z-30 bg-black/50 backdrop-blur-xl"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === menuRef.current) toggleMenu(); }}
        >
          <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="grid h-full grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {/* Left Panel: Identity */}
              <motion.div variants={itemVariants} className="flex flex-col justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src="/assets/personal logo and bio pics/bio pic 1.jpg" 
                    alt="Jacob Darling" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-accentLime">Jacob Darling</h3>
                    <p className="text-muted-foreground text-sm">{greeting}</p>
                  </div>
                </div>

                <div className="group relative flex items-center gap-4 mt-8">
                  <motion.img 
                    src="/assets/personal logo and bio pics/jd logo .png" 
                    alt="JD Logo"
                    className="h-16 w-16 transition-all duration-300"
                    whileHover={{ rotate: 8, filter: 'drop-shadow(0 0 8px #C0FF33)' }}
                  />
                  <div className="absolute left-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="font-semibold">Marketing Architect</p>
                    <p className="text-muted-foreground text-sm">+ Systems Builder</p>
                  </div>
                </div>
              </motion.div>

              {/* Center Panel: Navigation */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <h3 className="text-lg font-semibold text-accentCyan mb-4">Explore</h3>
                <ul className="space-y-3">
                  <li><Link href="/about" className="hover:text-accentCyan transition-colors">About</Link></li>
                  <li><Link href="/work" className="hover:text-accentCyan transition-colors">Case Studies</Link></li>
                  <li><Link href="/toolbox" className="hover:text-accentCyan transition-colors">Stack</Link></li>
                  <li><Link href="/resources" className="hover:text-accentCyan transition-colors">Insights</Link></li>
                </ul>
              </motion.div>

              {/* Right Panel: Engagement */}
              <motion.div variants={itemVariants} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-accentCoral mb-4">Connect</h3>
                  <div className="flex flex-col space-y-3">
                    {userType === 'recruiter' && (
                      <Button variant="outline" className="border-accentCoral text-accentCoral hover:bg-accentCoral hover:text-base">Download Résumé</Button>
                    )}
                    <Button>Book a Call</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-6">
                  <a href="#" className="text-muted-foreground hover:text-white"><IconSet name="github" className="h-6 w-6" /></a>
                  <a href="#" className="text-muted-foreground hover:text-white"><IconSet name="linkedin" className="h-6 w-6" /></a>
                  <a href="#" className="text-muted-foreground hover:text-white"><IconSet name="twitter" className="h-6 w-6" /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
