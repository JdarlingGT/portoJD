import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp } from "lucide-react";

interface StatChipProps {
  icon?: LucideIcon;
  label: string;
  value: string;
  baseline?: string;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "primary";
  className?: string;
}

const variantStyles = {
  default: "bg-muted text-muted-foreground border-border",
  success: "bg-success/10 text-success border-success/20", 
  warning: "bg-warning/10 text-warning border-warning/20",
  primary: "bg-primary/10 text-primary border-primary/20",
};

export function StatChip({ 
  icon: Icon = TrendingUp,
  label, 
  value, 
  baseline, 
  trend = "neutral",
  variant = "default",
  className 
}: StatChipProps) {
  const ariaLabel = baseline 
    ? `${label}: ${value}, baseline: ${baseline}` 
    : `${label}: ${value}`;

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-chip border",
        "transition-all duration-fast ease-smooth",
        "hover:shadow-card",
        variantStyles[variant],
        className
      )}
      aria-label={ariaLabel}
      data-testid={`stat-chip-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <div className="flex flex-col items-start min-w-0">
        <span className="text-xs font-medium opacity-80 leading-none">
          {label}
        </span>
        <span className="text-sm font-semibold leading-none mt-1">
          {value}
        </span>
      </div>
      {baseline && (
        <span className="text-xs opacity-60 ml-auto">
          vs {baseline}
        </span>
      )}
    </div>
  );
}

export function StatChipGroup({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div 
      className={cn("flex flex-wrap gap-3", className)}
      data-testid="stat-chip-group"
    >
      {children}
    </div>
  );
}