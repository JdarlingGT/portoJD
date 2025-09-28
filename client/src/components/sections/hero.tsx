import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { analytics } from "@/lib/analytics";

export function HeroSection() {
  const handlePrimaryCTA = () => {
    analytics.trackCTAClick("hero", "Request Portfolio Walk-through");
  };

  const handleSecondaryCTA = () => {
    analytics.trackCTAClick("hero", "View Case Studies");
    // Smooth scroll to work section
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" data-testid="hero-heading">
            <span className="gradient-text">Marketing Strategist</span>
            <br />
            <span className="text-foreground">& Systems Architect</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
            I design and build integrated marketing ecosystems. By blending brand strategy with marketing automation and CRM architecture, I create scalable systems that drive measurable revenue growth.
          </p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
            <MetricCard value="70%" label="Reduced Support Tickets" />
            <MetricCard value="40%" label="E-commerce Conversion Lift" />
            <MetricCard value="35%" label="Qualified Leads Increase" />
            <MetricCard value="85k" label="Monthly Bot Blocks" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handlePrimaryCTA}
              data-testid="button-primary-cta"
            >
              Request Portfolio Walk-through
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleSecondaryCTA}
              data-testid="button-secondary-cta"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
