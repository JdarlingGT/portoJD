import { Link } from "wouter";
import { Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">JD</span>
              </div>
              <span className="font-semibold">Jacob Darling</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm mb-2">
                © 2024 Jacob Darling. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a 
              href="https://linkedin.com/in/jacobdarling" 
              className="text-muted-foreground hover:text-primary transition-colors" 
              aria-label="LinkedIn"
              data-testid="link-linkedin"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/jacobdarling" 
              className="text-muted-foreground hover:text-primary transition-colors" 
              aria-label="GitHub"
              data-testid="link-github"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
