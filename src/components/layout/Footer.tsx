import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/jdarlingGT' },
    { icon: Linkedin, href: 'https://linkedin.com/in/jacobdarling' },
    { icon: Mail, href: 'mailto:hoosierdarling@gmail.com' },
  ];

  return (
    <footer className="bg-transparent py-8 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Jacob Darling. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;