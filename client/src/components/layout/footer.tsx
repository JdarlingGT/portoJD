import { Link } from "wouter";
import { IconSet } from '@/components/ui/IconSet';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-accentCyan flex items-center justify-center">
              <span className="text-base font-bold">JD</span>
            </div>
            <span className="font-semibold">Jacob Darling</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jacob Darling. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors"><IconSet name="github" className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors"><IconSet name="linkedin" className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors"><IconSet name="twitter" className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
