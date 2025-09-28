import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.5
      }
    );

    // Observe all headings
    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Show TOC when user scrolls past header
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  if (!isVisible || items.length === 0) return null;

  return (
    <div className={cn(
      "fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block",
      className
    )}>
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[200px] max-w-[250px]">
        <div className="flex items-center gap-2 mb-3 text-caption font-semibold text-muted-foreground uppercase tracking-wide">
          <List className="h-3 w-3" />
          Contents
        </div>
        
        <nav>
          <ul className="space-y-1">
            {items.map(({ id, title, level }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    "text-left w-full text-sm py-1 px-2 rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeId === id 
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
                      : "text-muted-foreground",
                    level === 3 && "ml-3 text-xs"
                  )}
                  style={{ 
                    paddingLeft: `${(level - 2) * 12 + 8}px` 
                  }}
                  data-testid={`toc-item-${id}`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}