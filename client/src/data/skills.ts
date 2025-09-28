export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "marketing" | "analytics";
  level: 1 | 2 | 3 | 4 | 5;
  evidenceLinks?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "marketing",
    name: "Marketing Automation",
    description: "Strategic campaign design and lifecycle management",
    icon: "📧",
    skills: [
      { name: "FluentCRM", category: "marketing", level: 5 },
      { name: "WP Fusion", category: "marketing", level: 4 },
      { name: "Lifecycle Campaigns", category: "marketing", level: 5 },
      { name: "Lead Nurturing", category: "marketing", level: 5 },
      { name: "Progressive Profiling", category: "marketing", level: 4 },
      { name: "Segmentation Strategy", category: "marketing", level: 5 }
    ]
  },
  {
    id: "analytics",
    name: "Analytics & Tracking",
    description: "Data architecture and attribution modeling",
    icon: "📊",
    skills: [
      { name: "Google Tag Manager", category: "analytics", level: 5 },
      { name: "Google Analytics 4", category: "analytics", level: 5 },
      { name: "Google Ads", category: "analytics", level: 4 },
      { name: "Conversion Tracking", category: "analytics", level: 5 },
      { name: "Attribution Modeling", category: "analytics", level: 4 },
      { name: "Custom Events", category: "analytics", level: 5 }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    description: "User interface design and optimization",
    icon: "🎨",
    skills: [
      { name: "JavaScript", category: "frontend", level: 4 },
      { name: "jQuery", category: "frontend", level: 4 },
      { name: "CSS", category: "frontend", level: 4 },
      { name: "HTML", category: "frontend", level: 5 },
      { name: "Responsive Design", category: "frontend", level: 4 },
      { name: "Core Web Vitals", category: "frontend", level: 4 }
    ]
  },
  {
    id: "backend",
    name: "Backend & Database",
    description: "Server-side development and data management",
    icon: "⚙️",
    skills: [
      { name: "PHP", category: "backend", level: 4 },
      { name: "SQL", category: "backend", level: 4 },
      { name: "WordPress", category: "backend", level: 5 },
      { name: "WP-CLI", category: "backend", level: 4 },
      { name: "Custom Plugins", category: "backend", level: 4 },
      { name: "Database Optimization", category: "backend", level: 4 }
    ]
  },
  {
    id: "devops",
    name: "Infrastructure & Security",
    description: "Performance optimization and security hardening",
    icon: "🛡️",
    skills: [
      { name: "Cloudflare", category: "devops", level: 5 },
      { name: "Apache", category: "devops", level: 4 },
      { name: "PHP-FPM", category: "devops", level: 4 },
      { name: "LiteSpeed Cache", category: "devops", level: 4 },
      { name: "WAF Configuration", category: "devops", level: 4 },
      { name: "Performance Monitoring", category: "devops", level: 4 }
    ]
  }
];

export function getSkillsByCategory(categoryId: string): Skill[] {
  const category = skillCategories.find(cat => cat.id === categoryId);
  return category?.skills || [];
}

export function getAllSkills(): Skill[] {
  return skillCategories.flatMap(category => category.skills);
}
