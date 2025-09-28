export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  stack: string[];
  impactMetrics: {
    metric: string;
    value: string;
    context: string;
  }[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Graston Technique®",
    role: "Marketing Director & System Architect",
    startDate: "2023-01",
    current: true,
    highlights: [
      "Led complete digital transformation of healthcare training platform serving 20,000+ providers",
      "Architected scalable marketing automation ecosystem integrating brand strategy with technical infrastructure",
      "Directed cross-functional team implementing data-driven growth strategies",
      "Managed multi-channel campaigns across email, social, and paid advertising platforms"
    ],
    stack: [
      "WordPress",
      "FluentCRM",
      "Google Analytics 4",
      "Google Tag Manager",
      "Cloudflare",
      "PHP",
      "JavaScript"
    ],
    impactMetrics: [
      {
        metric: "Lead Generation",
        value: "+192% increase",
        context: "Qualified monthly leads from automation"
      },
      {
        metric: "Provider Engagement",
        value: "+191% increase",
        context: "Active platform participation rates"
      },
      {
        metric: "Campaign Efficiency",
        value: "40% faster",
        context: "Marketing campaign production timelines"
      }
    ]
  },
  {
    company: "Ultimate Technologies Group",
    role: "Interim Director of Marketing",
    startDate: "2023-01",
    endDate: "2023-06",
    current: false,
    highlights: [
      "Stabilized marketing operations during critical leadership transition period",
      "Streamlined lead generation workflows and CRM processes",
      "Implemented new marketing automation efficiencies",
      "Maintained campaign momentum while optimizing team productivity"
    ],
    stack: [
      "HubSpot",
      "Salesforce",
      "Google Ads",
      "LinkedIn Ads",
      "Marketing Automation"
    ],
    impactMetrics: [
      {
        metric: "Campaign Production",
        value: "40% improvement",
        context: "Timeline efficiency during transition"
      },
      {
        metric: "Lead Quality",
        value: "Maintained 95%+",
        context: "Quality scores throughout transition"
      }
    ]
  },
  {
    company: "Riley Bennett Egloff, LLP",
    role: "Marketing Manager → Administrator",
    startDate: "2015-03",
    endDate: "2023-01",
    current: false,
    highlights: [
      "Directed firm-wide marketing strategy, content development, and business development programs",
      "Managed complete digital rebrand and website redesign project",
      "Implemented technical SEO overhaul resulting in significant organic growth",
      "Developed integrated marketing campaigns across multiple service lines",
      "Advanced from Marketing Manager to Marketing Administrator recognizing strategic leadership"
    ],
    stack: [
      "WordPress",
      "SEO Tools",
      "Content Management",
      "Brand Strategy",
      "Digital Marketing"
    ],
    impactMetrics: [
      {
        metric: "Client Inquiries",
        value: "+35% increase",
        context: "Qualified leads from digital rebrand"
      },
      {
        metric: "Organic Traffic",
        value: "Significant growth",
        context: "From technical SEO implementation"
      },
      {
        metric: "Brand Recognition",
        value: "Market leader",
        context: "Regional legal services positioning"
      }
    ]
  }
];

export function getCurrentRole(): ExperienceItem | undefined {
  return experience.find(item => item.current);
}

export function getExperienceByTimeframe(): ExperienceItem[] {
  return experience.sort((a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);
    return bDate.getTime() - aDate.getTime();
  });
}
