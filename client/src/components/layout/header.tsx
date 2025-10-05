import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavContext } from './NavContext';
import { motion } from 'framer-motion';

export function Header() {
  const navContext = useContext(NavContext);
  if (!navContext) throw new Error('Header must be used within a NavProvider');
  const { menuOpen, toggleMenu } = navContext;

  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (menuOpen) {
      toggleMenu();
    }
  }, [location]);

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/work" },
    { name: "Stack", href: "/toolbox" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  const ThemeIcon = theme === "dark" ? Sun : theme === "light" ? Moon : Monitor;

    return (
    <>
      <motion.header
        className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        animate={{ height: isScrolled ? '60px' : '80px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <Link href="/" className="flex items-center space-x-2 hover-lift focus-ring active-press transition-all duration-med" data-testid="link-home">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center hover-glow transition-all duration-med">
                  <span className="text-primary-foreground font-bold text-sm">JD</span>
                </div>
                <span className="font-semibold text-lg">Jacob Darling</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 animate-slide-in-right stagger-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-med hover-lift focus-ring active-press px-2 py-1 rounded-md ${
                    location === item.href ? "text-primary bg-primary/10 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid={`link-${item.name.toLowerCase()}`}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4 animate-slide-in-right stagger-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0 hover-glow focus-ring active-press" data-testid="button-theme-toggle">
                    <ThemeIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")} data-testid="theme-light">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} data-testid="theme-dark">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} data-testid="theme-system">
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                className="md:hidden hover-glow focus-ring active-press"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                data-testid="button-menu-toggle"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
        </div>
      </motion.header>

      {/* The MegaMenu component will be rendered here, controlled by the menuOpen state from NavContext */}
    </>
  );
}
