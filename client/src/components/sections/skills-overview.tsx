import { Code, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SkillsOverviewSection() {
  const technicalSkills = {
    "Web Performance & Optimization": ["Cloudflare", "LiteSpeed Cache", "WP Rocket", "Core Web Vitals"],
    "Analytics & Tracking": ["Google Tag Manager", "GA4", "Google Ads", "Conversion Tracking"],
    "Programming Languages": ["PHP", "JavaScript", "SQL", "CSS", "HTML"]
  };

  const marketingSkills = {
    "Marketing Automation": ["FluentCRM", "WP Fusion", "Lifecycle Campaigns", "Lead Nurturing"],
    "E-commerce Platforms": ["WooCommerce", "LearnDash", "Gravity Forms", "Conversion Optimization"],
    "Infrastructure & Security": ["WAF Configuration", "Bot Management", "Server Administration", "DevOps"]
  };

  return (
    <section id="skills" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="skills-overview-heading">
              Core Competencies
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="skills-overview-description">
              Full-stack marketing technology expertise spanning strategy, implementation, and optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center" data-testid="technical-skills-heading">
                <Code className="w-6 h-6 mr-2 text-primary" />
                Technical Stack
              </h3>
              
              <div className="space-y-4">
                {Object.entries(technicalSkills).map(([category, skills]) => (
                  <div key={category} data-testid={`technical-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h4 className="font-medium mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          data-testid={`technical-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing Skills */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center" data-testid="marketing-skills-heading">
                <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                Marketing Expertise
              </h3>
              
              <div className="space-y-4">
                {Object.entries(marketingSkills).map(([category, skills]) => (
                  <div key={category} data-testid={`marketing-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h4 className="font-medium mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          data-testid={`marketing-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
