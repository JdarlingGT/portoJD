import { Button } from "@/components/ui/button";
import { StatChip, StatChipGroup } from "@/components/ui/stat-chip";
import { LogoWall, sampleLogos } from "@/components/ui/logo-wall";
import { analytics } from "@/lib/analytics";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";

export function HeroSection() {
  const handlePrimaryCTA = () => {
    analytics.trackCTAClick("hero", "Book a 15-min Walk-through");
  };

  const handleSecondaryCTA = () => {
    analytics.trackCTAClick("hero", "View Case Studies");
    // Navigate to work page since work section doesn't exist on home
    window.location.href = "/work";
  };

  const kpis = [
    {
      icon: TrendingUp,
      label: "Attribution Accuracy",
      value: "+112%",
      baseline: "industry avg",
      variant: "success" as const
    },
    {
      icon: ShieldCheck,
      label: "Support Ticket Reduction",
      value: "70%",
      variant: "primary" as const
    },
    {
      icon: Zap,
      label: "Conversion Lift",
      value: "40%",
      baseline: "before/after",
      variant: "success" as const
    }
  ];

  return (
    <section className="py-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Headline & CTA */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <h1 className="text-display" data-testid="hero-heading">
                <span className="gradient-text">Marketing Systems</span>
                <br />
                <span className="text-foreground">That Scale Revenue</span>
              </h1>
              
              <p className="text-body-lg text-muted-foreground max-w-lg leading-relaxed" data-testid="hero-description">
                I architect integrated marketing ecosystems that blend strategy, automation, and CRM intelligence. The result: predictable growth through measurable, scalable systems.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handlePrimaryCTA}
                  className="hover-lift hover-glow active-press focus-ring"
                  data-testid="button-primary-cta"
                >
                  Book a 15-min Walk-through
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleSecondaryCTA}
                  className="hover-lift focus-ring active-press"
                  data-testid="button-secondary-cta"
                >
                  View Case Studies
                </Button>
              </div>

              {/* Microcopy */}
              <p className="text-sm text-muted-foreground" data-testid="hero-microcopy">
                Response within 24h • No sales fluff • Direct access
              </p>
            </div>
          </div>

          {/* Right: KPIs & Credibility */}
          <div className="space-y-10 animate-slide-in-right stagger-2">
            {/* KPI Trio */}
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                Recent Outcomes
              </h2>
              <StatChipGroup>
                {kpis.map((kpi, index) => (
                  <StatChip
                    key={index}
                    icon={kpi.icon}
                    label={kpi.label}
                    value={kpi.value}
                    baseline={kpi.baseline}
                    variant={kpi.variant}
                  />
                ))}
              </StatChipGroup>
            </div>

            {/* Credibility & Logos */}
            <div className="space-y-6">
              <LogoWall 
                logos={sampleLogos}
                title="Trusted across industries"
                variant="compact"
                className="pt-8 border-t border-border/50"
              />
            </div>

            {/* Mini Case Study Teaser */}
            <div className="bg-gradient-to-br from-surface to-primary/5 border border-primary/20 rounded-card p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-muted-foreground">Latest Success</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>SaaS Attribution System:</strong> Reduced customer acquisition cost by 35% while improving lead quality scoring accuracy by 112%.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => analytics.trackCTAClick("hero", "Mini Case Study")}
                  className="text-primary hover:text-primary/80 p-0 h-auto font-medium text-sm"
                  data-testid="button-mini-case-study"
                >
                  Read 2-min case study →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
