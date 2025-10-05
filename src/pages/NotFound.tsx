import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass, Mail, Briefcase } from 'lucide-react';

const NotFound = () => {
  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/about', icon: Briefcase, label: 'About' },
    { href: '/case-studies', icon: Compass, label: 'Case Studies' },
    { href: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-6xl md:text-9xl font-bold text-cyan-400">404</p>
        <h1 className="text-2xl md:text-4xl font-semibold text-white mt-4 mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-8">Sorry, the page you're looking for doesn't exist.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {links.map(link => (
            <Link key={link.href} to={link.href} className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-4 py-2 transition-colors">
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;