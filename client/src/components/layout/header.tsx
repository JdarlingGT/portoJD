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
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">JD</span>
                </div>
                <span className="font-semibold text-lg">Jacob Darling</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-muted-foreground hover:text-foreground transition-colors ${
                    location === item.href ? "text-foreground font-medium" : ""
                  }`}
                  data-testid={`link-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0" data-testid="button-theme-toggle">
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
                className="md:hidden"
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
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-muted-foreground hover:text-foreground transition-colors ${
                    location === item.href ? "text-foreground font-medium" : ""
                  }`}
                  data-testid={`mobile-link-${item.name.toLowerCase()}`}
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
