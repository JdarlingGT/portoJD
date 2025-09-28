import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkillCategoryComponent } from "@/components/ui/skill-category";
import { skillCategories } from "@/data/skills";
import { Badge } from "@/components/ui/badge";

export default function Toolbox() {
  const competencies = [
    {
      title: "Web Performance & Optimization",
      description: "I take a full-stack approach to speed, from edge caching and CDN configuration with Cloudflare to server-side tuning of Apache and PHP-FPM. I specialize in WordPress performance, leveraging tools like LiteSpeed Cache and WP Rocket, optimizing databases by removing orphaned data, and refactoring heavy front-end components to achieve superior Core Web Vitals."
    },
    {
      title: "Security & Infrastructure Hardening", 
      description: "I build resilient and secure web environments. This includes deploying and managing Cloudflare's WAF, Bot Management, and Rate-Limiting rules, as well as hardening servers with security headers, configuring DNSSEC, and locking down API keys to mitigate risks and stop common attack vectors."
    },
    {
      title: "Analytics & Conversion Tracking Engineering",
      description: "I architect robust data layers and tracking systems using Google Tag Manager (GTM). My expertise includes cleaning up legacy tags, implementing GA4-native tracking, and writing custom scripts to capture critical engagement and conversion events—from Gravity Forms submissions to e-commerce purchases—ensuring every marketing dollar can be accurately attributed."
    },
    {
      title: "Server Administration & DevOps",
      description: "I am proficient in managing and monitoring server resources, diagnosing performance bottlenecks with tools like htop and Netdata, and performing critical backend operations like PHP upgrades, debugging fatal errors, and optimizing server configurations to ensure stability and scalability."
    }
  ];

  const spotlights = [
    {
      title: "Full-Stack Performance Optimization",
      challenge: "A high-traffic WordPress site was suffering from a bloated database, with over 800KB of unused plugin data loading on every page view.",
      action: "Using WP-CLI and direct SQL queries, I safely removed the orphaned autoloaded options. I then tuned the server, enabling Brotli compression and configuring LiteSpeed Cache for Edge-Side Includes (ESI) to serve personalized content on fully cached pages.",
      result: "The admin dashboard became ~250ms faster, and repeat page views were 30-70% faster due to advanced browser caching rules."
    },
    {
      title: "Advanced Conversion Tracking & Attribution",
      challenge: "Google Ads was optimizing inefficiently because it couldn't distinguish between low-intent actions and actual sales conversions.",
      action: "I re-architected the tracking system in GTM, building a custom PHP hook to create a gravityFormSubmission dataLayer event. I then configured Google Ads to treat only \"Purchase\" and specific high-intent form submissions as Primary conversion actions.",
      result: "This ensured that Google's smart bidding algorithms focused squarely on driving actual sales, dramatically improving ad ROI."
    },
    {
      title: "Infrastructure Security Hardening",
      challenge: "A client's site was vulnerable to common WordPress attack vectors like XML-RPC floods and brute-force login attempts.",
      action: "I deployed a multi-layered defense using Cloudflare, configuring WAF rules to block exploits, enabling \"Super Bot Fight Mode\" which blocks ~85k malicious bot hits per month, and setting up Authenticated Origin Pulls to secure the server.",
      result: "The site's attack surface was drastically reduced, and server load from malicious traffic dropped significantly, improving performance for real users."
    }
  ];

  const technologyStack = {
    "Software & Platform Knowledge": {
      "CDN & Security": ["Cloudflare (WAF, CDN, Rules, Bot Management)", "Netdata"],
      "Analytics & Tag Management": ["Google Tag Manager (GTM)", "Google Analytics 4 (GA4)", "Umami"],
      "Advertising & Conversion": ["Google Ads", "PixelYourSite Pro", "OptinMonster"],
      "Hosting & Server": ["Liquid Web", "GoDaddy", "Apache", "PHP-FPM"],
      "WordPress Core": ["WP-CLI", "Custom MU Plugins", "WP-Cron", "Heartbeat API"]
    },
    "WordPress Plugins": {
      "Caching": ["WP Rocket", "LiteSpeed Cache", "Autoptimize"],
      "CRM": ["FluentCRM"],
      "Forms": ["Gravity Forms", "WP Forms"],
      "LMS": ["LearnDash"],
      "Builder": ["Divi Builder"]
    },
    "Development Tools": ["Git", "VS Code"],
    "Programming, Scripting & Query Languages": ["PHP", "JavaScript", "jQuery", "SQL", "CSS", "HTML"]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="toolbox-page-heading">
                Technical Toolbox
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="toolbox-page-description">
                This page provides the granular, hard-skill validation that technical leads and detail-oriented hiring managers are looking for. It's organized to be easily scannable while telling a story of deep expertise.
              </p>
            </div>

            {/* Core Competencies */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" data-testid="core-competencies-heading">
                Core Competencies
              </h2>
              <div className="space-y-8">
                {competencies.map((competency, index) => (
                  <div 
                    key={competency.title}
                    className="bg-card border border-border rounded-xl p-6"
                    data-testid={`competency-${index}`}
                  >
                    <h3 className="text-xl font-semibold mb-4" data-testid={`competency-title-${index}`}>
                      {competency.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`competency-description-${index}`}>
                      {competency.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Spotlights */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" data-testid="technical-spotlights-heading">
                Technical Spotlights: From Problem to Impact
              </h2>
              <div className="grid md:grid-cols-1 gap-8">
                {spotlights.map((spotlight, index) => (
                  <div 
                    key={spotlight.title}
                    className="bg-card border border-border rounded-xl p-6"
                    data-testid={`spotlight-${index}`}
                  >
                    <h3 className="text-xl font-semibold mb-4" data-testid={`spotlight-title-${index}`}>
                      {spotlight.title}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Challenge:</h4>
                        <p className="text-muted-foreground" data-testid={`spotlight-challenge-${index}`}>
                          {spotlight.challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Action:</h4>
                        <p className="text-muted-foreground" data-testid={`spotlight-action-${index}`}>
                          {spotlight.action}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Result:</h4>
                        <p className="text-muted-foreground" data-testid={`spotlight-result-${index}`}>
                          {spotlight.result}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technology Stack */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" data-testid="technology-stack-heading">
                Technology Stack
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(technologyStack).map(([categoryName, category]) => (
                  <div 
                    key={categoryName}
                    className="bg-card border border-border rounded-xl p-6"
                    data-testid={`tech-category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <h3 className="text-xl font-semibold mb-6" data-testid={`tech-category-title-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
                      {categoryName}
                    </h3>
                    
                    {typeof category === "object" && !Array.isArray(category) ? (
                      <div className="space-y-4">
                        {Object.entries(category).map(([subCategory, tools]) => (
                          <div key={subCategory} data-testid={`tech-subcategory-${subCategory.toLowerCase().replace(/\s+/g, '-')}`}>
                            <h4 className="font-medium mb-2">{subCategory}:</h4>
                            <div className="flex flex-wrap gap-2">
                              {tools.map((tool) => (
                                <Badge 
                                  key={tool} 
                                  variant="secondary"
                                  data-testid={`tech-tool-${tool.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(category as string[]).map((tool) => (
                          <Badge 
                            key={tool} 
                            variant="secondary"
                            data-testid={`tech-tool-${tool.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Skills Grid */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center" data-testid="detailed-skills-heading">
                Detailed Skills Breakdown
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map(category => (
                  <SkillCategoryComponent key={category.id} category={category} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
