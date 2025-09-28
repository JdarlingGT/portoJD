import { cn } from "@/lib/utils";

export interface LogoItem {
  id: string;
  name: string;
  src?: string;
  sector?: string;
  redacted?: boolean;
}

interface LogoWallProps {
  logos: LogoItem[];
  title?: string;
  className?: string;
  variant?: "default" | "compact";
}

export function LogoWall({ 
  logos, 
  title = "Trusted by industry leaders",
  className,
  variant = "default" 
}: LogoWallProps) {
  const displayLogos = logos.slice(0, variant === "compact" ? 4 : 6);

  return (
    <div className={cn("space-y-6", className)} data-testid="logo-wall">
      {title && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-medium">
            {title}
          </p>
        </div>
      )}
      
      <div className={cn(
        "flex items-center justify-center gap-8 flex-wrap",
        variant === "compact" && "gap-6"
      )}>
        {displayLogos.map((logo) => (
          <LogoItem
            key={logo.id}
            logo={logo}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

interface LogoItemProps {
  logo: LogoItem;
  variant?: "default" | "compact";
}

function LogoItem({ logo, variant = "default" }: LogoItemProps) {
  const size = variant === "compact" ? "h-8" : "h-10";
  
  if (logo.redacted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center px-4 py-2 bg-muted/50 rounded border border-dashed border-muted-foreground/30 transition-all duration-fast",
          "grayscale hover:grayscale-0",
          size
        )}
        data-testid={`logo-redacted-${logo.id}`}
      >
        <span className="text-xs text-muted-foreground font-medium">
          {logo.sector || "Confidential"}
        </span>
      </div>
    );
  }

  if (logo.src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-fast",
          "grayscale hover:grayscale-0 opacity-60 hover:opacity-100",
          size
        )}
        data-testid={`logo-${logo.id}`}
      >
        <img
          src={logo.src}
          alt={`${logo.name} logo`}
          className={cn("object-contain max-w-full", size)}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback text logo
  return (
    <div
      className={cn(
        "flex items-center justify-center px-3 py-2 text-muted-foreground font-medium text-sm transition-all duration-fast",
        "grayscale hover:grayscale-0 opacity-60 hover:opacity-100",
        size
      )}
      data-testid={`logo-text-${logo.id}`}
    >
      {logo.name}
    </div>
  );
}

// Preset logo collections
export const sampleLogos: LogoItem[] = [
  { id: "tech-saas", name: "TechSaaS Inc", sector: "SaaS", redacted: true },
  { id: "fintech-co", name: "FinTech Co", sector: "FinTech", redacted: true },
  { id: "ecommerce-brand", name: "E-commerce Brand", sector: "E-commerce", redacted: true },
  { id: "enterprise-soft", name: "Enterprise Software", sector: "Enterprise", redacted: true },
  { id: "healthcare-tech", name: "HealthTech", sector: "Healthcare", redacted: true },
  { id: "edtech-startup", name: "EdTech Startup", sector: "Education", redacted: true },
];