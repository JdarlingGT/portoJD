import Hero from "@/sections/Hero";
import About from "@/sections/About";
import CaseStudies from "@/sections/CaseStudies";
import Reel from "@/sections/Reel";
import WhyICreate from "@/sections/WhyICreate";
import { ContactSection } from "@/components/sections/contact-section";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

export default function Home() {
  const handleMobileCTA = () => {
    analytics.trackCTAClick("mobile-sticky", "Request Portfolio Walk-through");
  };

  return (
    <div className="min-h-screen bg-background text-foreground page-enter">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        data-testid="skip-to-content"
      >
        Skip to main content
      </a>

      <main id="main-content" className="page-enter">
        <Hero />
        <About />
        <CaseStudies />
        <Reel />
        <WhyICreate />
        <ContactSection />
      </main>

      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50 animate-slide-up stagger-5">
        <Button 
          className="w-full shadow-lg hover-lift hover-glow active-press focus-ring" 
          onClick={handleMobileCTA}
          data-testid="button-mobile-sticky-cta"
        >
          Request Portfolio Walk-through
        </Button>
      </div>
    </div>
  );
}
