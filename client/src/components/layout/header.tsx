import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Monitor 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: "Work", href: "/work" },
    { name: "Toolbox", href: "/toolbox" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const ThemeIcon = theme === "dark" ? Sun : theme === "light" ? Moon : Monitor;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="button-menu-toggle"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-med hover-lift focus-ring active-press px-2 py-1 rounded-md animate-fade-in ${
                    location === item.href ? "text-primary bg-primary/10 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid={`mobile-link-${item.name.toLowerCase()}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
