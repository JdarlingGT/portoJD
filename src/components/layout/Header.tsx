import React from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
// import AnimatedLogo from '../ui/AnimatedLogo'; // Assuming this will be created

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              {/* <AnimatedLogo /> */}
              JD
            </Link>
          </div>

          <div className="hidden md:block">
            <MegaMenu />
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <Link
                to="/resume"
                className="rounded-xl px-4 py-2 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Download CV
              </Link>
            </div>
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;