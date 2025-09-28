import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Calendar, MessageCircle } from "lucide-react";

interface ContactCTAProps {
  className?: string;
  onBookCall?: () => void;
  onSendMessage?: () => void;
}

export function ContactCTA({
  className,
  onBookCall,
  onSendMessage
}: ContactCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed
    const dismissed = localStorage.getItem('contact-cta-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after scrolling down a bit
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('contact-cta-dismissed', 'true');
  };

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-surface border-t border-border shadow-hover",
        "transform transition-transform duration-med ease-smooth",
        isVisible ? "translate-y-0" : "translate-y-full",
        className
      )}
      data-testid="contact-cta-mobile"
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground leading-tight">
              Ready to discuss your project?
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Response within 24h • No sales fluff
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onSendMessage}
              className="h-8 px-3 text-xs"
              data-testid="cta-send-message"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Message
            </Button>

            <Button
              size="sm"
              onClick={onBookCall}
              className="h-8 px-3 text-xs"
              data-testid="cta-book-call"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Book Call
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              data-testid="cta-dismiss"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop version - can be used in hero or other sections
export function ContactCTADesktop({
  className,
  title = "Let's build something exceptional together",
  subtitle = "Book a 15-min walkthrough and see how I can help accelerate your growth",
  onBookCall,
  onSendMessage
}: {
  className?: string;
  title?: string;
  subtitle?: string;
  onBookCall?: () => void;
  onSendMessage?: () => void;
}) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-card p-6",
        className
      )}
      data-testid="contact-cta-desktop"
    >
      <div className="text-center max-w-md mx-auto space-y-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onBookCall}
            className="flex-1 sm:flex-none"
            data-testid="desktop-cta-book-call"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book a Call
          </Button>
          
          <Button
            variant="outline"
            onClick={onSendMessage}
            className="flex-1 sm:flex-none"
            data-testid="desktop-cta-send-message"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Response within 24h • Zero spam • Direct access
        </p>
      </div>
    </div>
  );
}