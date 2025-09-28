import { cn } from "@/lib/utils";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface StatBarItem {
  label: string;
  value: string;
  delta?: string;
  baseline?: string;
  trend?: "up" | "down" | "neutral";
}

interface StatBarProps {
  items: StatBarItem[];
  title?: string;
  description?: string;
  className?: string;
}

export function StatBar({ items, title, description, className }: StatBarProps) {
  return (
    <div className={cn(
      "bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 md:p-8 border border-border/50",
      className
    )}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-h4 font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {title}
            </h3>
          )}
          {description && (
            <p className="text-body text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div key={index} className="text-center" data-testid={`stat-bar-item-${index}`}>
            <div className="relative">
              <div className="text-h3 font-bold text-foreground mb-1">
                {item.value}
                {item.trend === "up" && (
                  <ArrowUpRight className="inline-block h-4 w-4 ml-1 text-green-500" />
                )}
              </div>
              
              {item.delta && (
                <div className={cn(
                  "text-caption font-semibold mb-1",
                  item.delta.includes("+") ? "text-green-600" : 
                  item.delta.includes("-") ? "text-red-600" : 
                  "text-muted-foreground"
                )}>
                  {item.delta}
                </div>
              )}
              
              <div className="text-body text-muted-foreground font-medium">
                {item.label}
              </div>
              
              {item.baseline && (
                <div className="text-caption text-muted-foreground/75 mt-1">
                  from {item.baseline}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}