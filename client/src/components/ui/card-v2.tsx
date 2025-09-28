import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

interface CardV2Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "featured";
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardV2Props>(
  ({ className, variant = "default", hoverable = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-card bg-surface text-card-foreground",
        "border border-border shadow-card",
        "transition-all duration-med ease-smooth",
        hoverable && [
          "hover:shadow-hover hover:-translate-y-1 hover:scale-[1.01]",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "cursor-pointer"
        ],
        variant === "featured" && "border-primary/20 bg-gradient-to-br from-surface to-primary/5",
        variant === "interactive" && "hover:border-primary/40",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "CardV2";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { compact?: boolean }
>(({ className, compact = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2",
      compact ? "p-4 pb-2" : "p-6 pb-4", 
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardV2Header";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { 
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    gradient?: boolean;
  }
>(({ className, level = "h3", gradient = false, children, ...props }, ref) => {
  const Component = level;
  return (
    <Component
      ref={ref}
      className={cn(
        "font-display font-semibold leading-tight tracking-tight",
        level === "h1" && "text-h1",
        level === "h2" && "text-h2", 
        level === "h3" && "text-lg",
        level === "h4" && "text-base",
        gradient && "gradient-text",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
CardTitle.displayName = "CardV2Title";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground leading-relaxed",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardV2Description";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { compact?: boolean }
>(({ className, compact = false, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      compact ? "px-4 pb-2" : "px-6 pb-4", 
      className
    )} 
    {...props} 
  />
));
CardContent.displayName = "CardV2Content";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { compact?: boolean }
>(({ className, compact = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between border-t border-border/50 bg-muted/20",
      compact ? "px-4 py-3" : "px-6 py-4",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardV2Footer";

// Enhanced card variants for specific use cases
interface ProjectCardProps extends CardV2Props {
  title: string;
  description: string;
  kpis?: Array<{ label: string; value: string; }>;
  tags?: string[];
  readingTime?: string;
  href?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ title, description, kpis, tags, readingTime, href, className, ...props }, ref) => (
    <Card
      ref={ref}
      variant="interactive"
      hoverable
      className={cn("group", className)}
      {...props}
      data-testid="project-card"
    >
      <CardHeader compact>
        <div className="flex items-start justify-between gap-4">
          <CardTitle level="h3" className="group-hover:text-primary transition-colors duration-fast">
            {title}
          </CardTitle>
          {href && (
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-fast" />
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {kpis && kpis.length > 0 && (
        <CardContent compact>
          <div className="flex flex-wrap gap-2">
            {kpis.map((kpi, index) => (
              <div key={index} className="text-xs bg-muted rounded px-2 py-1">
                <span className="text-muted-foreground">{kpi.label}:</span>{" "}
                <span className="font-medium">{kpi.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <CardFooter compact>
        <div className="flex items-center gap-2">
          {tags && tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        {readingTime && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Clock className="h-3 w-3" />
            {readingTime}
          </div>
        )}
      </CardFooter>
    </Card>
  )
);
ProjectCard.displayName = "ProjectCard";

export { 
  Card as CardV2, 
  CardHeader as CardV2Header, 
  CardFooter as CardV2Footer, 
  CardTitle as CardV2Title, 
  CardDescription as CardV2Description, 
  CardContent as CardV2Content,
  ProjectCard
};