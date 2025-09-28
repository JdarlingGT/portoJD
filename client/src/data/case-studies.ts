export interface CaseStudy {
  slug: string;
  title: string;
  emoji: string;
  role: string;
  timeframe: string;
  context: string;
  problem: string;
  constraints: string[];
  approach: string;
  results: {
    metric: string;
    baseline?: string;
    value: string;
    delta?: string;
    unit?: string;
    period: string;
  }[];
  stack: string[];
  artifacts: {
    src: string;
    type: "image" | "video" | "document";
    caption: string;
    alt: string;
  }[];
  learnings: string[];
  confidential: boolean;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "the-launchpad",
    title: "The Launchpad",
    emoji: "🚀",
    role: "Marketing Director & System Architect",
    timeframe: "2023-2024",
    context: "Graston Technique® - Healthcare Training Platform",
    problem: "A static directory of healthcare providers was underperforming as a lead generation tool. The existing system had no automation, poor user experience, and limited conversion tracking.",
    constraints: [
      "Legacy WordPress infrastructure",
      "Limited development resources",
      "Compliance requirements for healthcare data",
      "Tight timeline for implementation"
    ],
    approach: "I designed and implemented a comprehensive marketing automation system that transformed the static directory into an intelligent lead generation engine. This included automated email sequences, progressive profiling, and integrated CRM workflows.",
    results: [
      {
        metric: "Qualified Leads",
        baseline: "12 per month",
        value: "35 per month",
        delta: "+192%",
        period: "6 months post-launch"
      },
      {
        metric: "Provider Engagement",
        baseline: "23%",
        value: "67%",
        delta: "+191%",
        period: "3 months"
      },
      {
        metric: "Conversion Rate",
        baseline: "1.2%",
        value: "4.8%",
        delta: "+300%",
        period: "90 days"
      }
    ],
    stack: [
      "WordPress",
      "FluentCRM",
      "Custom PHP",
      "Google Analytics 4",
      "Google Tag Manager",
      "Gravity Forms"
    ],
    artifacts: [
      {
        src: "/case-studies/launchpad-automation-flow.png",
        type: "image",
        caption: "Marketing automation workflow diagram showing lead nurturing sequences",
        alt: "Flowchart showing automated email sequences and decision points for lead nurturing"
      },
      {
        src: "/case-studies/launchpad-dashboard.png",
        type: "image",
        caption: "Analytics dashboard showing conversion metrics and engagement rates",
        alt: "Screenshot of analytics dashboard with charts showing lead conversion rates and engagement metrics"
      }
    ],
    learnings: [
      "Progressive profiling significantly improved data quality while maintaining user experience",
      "Automated lead scoring helped prioritize follow-up efforts and improved sales efficiency",
      "Integration challenges taught me the importance of robust error handling in CRM workflows"
    ],
    confidential: false,
    tags: ["Marketing Automation", "Product Vision", "Revenue Growth"]
  },
  {
    slug: "the-compass",
    title: "The Compass",
    emoji: "🧭",
    role: "Analytics Engineering Lead",
    timeframe: "2023",
    context: "Multi-platform e-commerce optimization",
    problem: "Marketing attribution was broken across multiple touchpoints, making it impossible to optimize ad spend or measure true ROI. Legacy tracking setup was capturing incomplete data and providing misleading insights.",
    constraints: [
      "Multiple advertising platforms (Google, Facebook, LinkedIn)",
      "Complex customer journey spanning months",
      "Legacy analytics implementation with data gaps",
      "Need for real-time optimization"
    ],
    approach: "I architected a comprehensive data layer and attribution model using Google Tag Manager, implementing server-side tracking, custom conversion events, and advanced audience segmentation to provide accurate attribution data.",
    results: [
      {
        metric: "Attribution Accuracy",
        baseline: "43%",
        value: "91%",
        delta: "+112%",
        period: "Post-implementation"
      },
      {
        metric: "Ad Spend Efficiency",
        baseline: "$12.50",
        value: "$7.80",
        delta: "-38%",
        unit: "Cost per conversion",
        period: "3 months"
      },
      {
        metric: "Marketing ROI Visibility",
        baseline: "Limited",
        value: "Complete",
        period: "Ongoing"
      }
    ],
    stack: [
      "Google Tag Manager",
      "Google Analytics 4",
      "Google Ads",
      "Facebook Pixel",
      "Custom JavaScript",
      "PHP Webhooks"
    ],
    artifacts: [
      {
        src: "/case-studies/compass-attribution-model.png",
        type: "image",
        caption: "Multi-touch attribution model showing customer journey mapping",
        alt: "Diagram showing customer touchpoints across multiple channels with attribution weights"
      },
      {
        src: "/case-studies/compass-data-flow.png",
        type: "image",
        caption: "Data architecture diagram showing tracking implementation",
        alt: "Technical diagram of data flow from user interactions to analytics platforms"
      }
    ],
    learnings: [
      "Server-side tracking is essential for accurate attribution in privacy-focused environments",
      "Custom event naming conventions are crucial for long-term data consistency",
      "Attribution modeling requires balancing accuracy with actionable insights"
    ],
    confidential: false,
    tags: ["Analytics Engineering", "Data Integrity", "Performance Marketing"]
  },
  {
    slug: "the-fortress",
    title: "The Fortress",
    emoji: "🛡️",
    role: "Infrastructure Security Lead",
    timeframe: "2023-2024",
    context: "High-traffic healthcare platform security hardening",
    problem: "The platform was experiencing significant bot traffic, performance degradation, and security vulnerabilities that threatened both user experience and business operations.",
    constraints: [
      "High-traffic WordPress environment",
      "Strict healthcare compliance requirements",
      "24/7 uptime requirements",
      "Limited maintenance windows"
    ],
    approach: "I implemented a multi-layered security and performance optimization strategy using Cloudflare's enterprise features, server-side optimizations, and proactive monitoring to create a robust defense system.",
    results: [
      {
        metric: "Malicious Bot Blocks",
        value: "85,000",
        unit: "per month",
        period: "Ongoing"
      },
      {
        metric: "Page Load Speed",
        baseline: "4.3s",
        value: "1.8s",
        delta: "-58%",
        period: "Post-optimization"
      },
      {
        metric: "Server Load Reduction",
        baseline: "100%",
        value: "65%",
        delta: "-35%",
        period: "Average reduction"
      },
      {
        metric: "Security Score",
        baseline: "B+",
        value: "A+",
        period: "Security headers audit"
      }
    ],
    stack: [
      "Cloudflare WAF",
      "LiteSpeed Cache",
      "Apache optimizations",
      "PHP-FPM tuning",
      "Custom security headers",
      "Netdata monitoring"
    ],
    artifacts: [
      {
        src: "/case-studies/fortress-security-layers.png",
        type: "image",
        caption: "Multi-layer security architecture showing defense mechanisms",
        alt: "Diagram showing security layers from CDN to application level with threat mitigation strategies"
      },
      {
        src: "/case-studies/fortress-performance-metrics.png",
        type: "image",
        caption: "Performance monitoring dashboard showing Core Web Vitals improvements",
        alt: "Performance metrics dashboard showing before and after page speed optimization results"
      }
    ],
    learnings: [
      "Layered security approaches are more effective than single-point solutions",
      "Performance and security optimizations often complement each other",
      "Monitoring and alerting are crucial for maintaining security posture"
    ],
    confidential: false,
    tags: ["Infrastructure Security", "Performance Tuning", "DevOps"]
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.slice(0, 3);
}
