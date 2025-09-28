import { apiRequest } from "./queryClient";

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  sessionId?: string;
}

class Analytics {
  private sessionId: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = true; // In production, you might want to check for consent
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async track(event: string, properties?: Record<string, any>): Promise<void> {
    if (!this.isEnabled) return;

    try {
      await apiRequest("POST", "/api/analytics", {
        event,
        properties: {
          ...properties,
          timestamp: Date.now(),
          url: window.location.href,
          referrer: document.referrer,
        },
        sessionId: this.sessionId,
      });
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }

  // Predefined event methods
  async trackCTAClick(location: string, label: string): Promise<void> {
    return this.track("cta_click", { location, label });
  }

  async trackCaseStudyOpen(slug: string): Promise<void> {
    return this.track("case_open", { slug });
  }

  async trackResumeDownload(): Promise<void> {
    return this.track("resume_download");
  }

  async trackContactSubmit(valid: boolean, source?: string): Promise<void> {
    return this.track("contact_submit", { valid, source });
  }

  async trackPageView(path: string): Promise<void> {
    return this.track("page_view", { path });
  }
}

export const analytics = new Analytics();

// Track page views automatically
if (typeof window !== "undefined") {
  let currentPath = window.location.pathname;
  
  // Track initial page view
  analytics.trackPageView(currentPath);
  
  // Track navigation changes
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      analytics.trackPageView(currentPath);
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}
