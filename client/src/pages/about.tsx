import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TimelineItem } from "@/components/ui/timeline-item";
import { getExperienceByTimeframe } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { analytics } from "@/lib/analytics";

export default function About() {
  const experienceItems = getExperienceByTimeframe();

  const handleContactCTA = () => {
    analytics.trackCTAClick("about", "Get In Touch");
  };

  const principles = [
    {
      title: "Systems Thinking",
      description: "Every marketing initiative should be designed as part of a larger ecosystem. I focus on creating interconnected systems that amplify each other's effectiveness rather than isolated campaigns."
    },
    {
      title: "Data-Driven Decisions",
      description: "Intuition guides strategy, but data validates execution. I build robust measurement frameworks that provide actionable insights for continuous optimization and growth."
    },
    {
      title: "Technical Excellence",
      description: "Marketing technology should enhance creativity, not constrain it. I architect scalable, maintainable systems that empower teams to execute ambitious campaigns with confidence."
    },
    {
      title: "Continuous Learning",
      description: "The marketing landscape evolves rapidly. I stay current with emerging technologies, industry best practices, and regulatory changes to maintain competitive advantages."
    }
  ];

  const workingStyle = [
    {
      aspect: "Collaboration",
      description: "I work best in cross-functional environments where I can bridge the gap between creative, technical, and business stakeholders."
    },
    {
      aspect: "Communication",
      description: "I translate complex technical concepts into clear business language and ensure all team members understand system implications."
    },
    {
      aspect: "Problem-Solving",
      description: "I approach challenges methodically, analyzing root causes before implementing solutions, and always document learnings for future reference."
    },
    {
      aspect: "Innovation",
      description: "I balance proven strategies with experimental approaches, always testing new methods while maintaining reliable core systems."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="about-page-heading">
                The Architect in the Marketing Room
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-page-description">
                My story, working philosophy, and the experience that shaped my approach to marketing systems architecture.
              </p>
            </div>

            {/* Main Story */}
            <section className="mb-16">
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p data-testid="story-paragraph-1">
                  Great marketing ideas often break at the handoff—the critical point where a creative vision meets the complex reality of technical execution. My career has been built to solve this problem.
                </p>
                
                <p data-testid="story-paragraph-2">
                  I'm Jacob Darling, a marketing leader who operates as both a brand strategist and a systems architect. On one side, I direct bold rebrands, craft compelling narratives, and launch creative campaigns. On the other, I design and build the underlying technical infrastructure that makes those campaigns possible and measurable.
                </p>

                <p data-testid="story-paragraph-3">
                  This dual expertise didn't happen by accident. Early in my career, I witnessed too many brilliant marketing strategies fail because the technical execution couldn't support the creative vision. I saw campaigns that couldn't track attribution, automation workflows that broke under load, and data systems that provided more confusion than clarity.
                </p>

                <p data-testid="story-paragraph-4">
                  That's when I made a deliberate choice to become fluent in both languages—the creative language of brand strategy and the technical language of system architecture. Today, I bridge these worlds, ensuring that ambitious marketing strategies have the robust technical foundation they need to succeed at scale.
                </p>
              </div>
            </section>

            {/* Core Principles */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8" data-testid="principles-heading">
                Core Principles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {principles.map((principle, index) => (
                  <div 
                    key={principle.title}
                    className="bg-card border border-border rounded-xl p-6"
                    data-testid={`principle-${index}`}
                  >
                    <h3 className="text-xl font-semibold mb-3" data-testid={`principle-title-${index}`}>
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`principle-description-${index}`}>
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Working Style */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8" data-testid="working-style-heading">
                Working Style
              </h2>
              <div className="space-y-6">
                {workingStyle.map((style, index) => (
                  <div 
                    key={style.aspect}
                    className="border-l-4 border-primary pl-6"
                    data-testid={`working-style-${index}`}
                  >
                    <h3 className="text-lg font-semibold mb-2" data-testid={`working-style-title-${index}`}>
                      {style.aspect}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`working-style-description-${index}`}>
                      {style.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Journey */}
            <section className="mb-16">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-foreground" data-testid="professional-journey-heading">
                  Professional Journey
                </h2>
                
                <div className="space-y-8">
                  {experienceItems.map((experience, index) => (
                    <TimelineItem 
                      key={`${experience.company}-${experience.startDate}`} 
                      experience={experience} 
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Certifications & Education */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8" data-testid="certifications-heading">
                Certifications & Continuous Learning
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4" data-testid="certifications-title">
                    Industry Certifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Google Analytics Certified</span>
                      <Badge variant="outline" data-testid="cert-ga">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Google Ads Certified</span>
                      <Badge variant="outline" data-testid="cert-ads">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cloudflare Certified</span>
                      <Badge variant="outline" data-testid="cert-cloudflare">Current</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4" data-testid="learning-title">
                    Continuous Learning Focus
                  </h3>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">• Marketing Attribution Modeling</div>
                    <div className="text-muted-foreground">• Privacy-First Analytics</div>
                    <div className="text-muted-foreground">• Server-Side Tracking</div>
                    <div className="text-muted-foreground">• Marketing Automation Strategy</div>
                    <div className="text-muted-foreground">• Performance Optimization</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4" data-testid="about-cta-heading">
                Ready to work together?
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="about-cta-description">
                I'm always interested in discussing how strategic marketing systems can drive growth for ambitious organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    onClick={handleContactCTA}
                    data-testid="button-about-contact"
                  >
                    Get In Touch
                  </Button>
                </Link>
                <Link href="/work">
                  <Button 
                    variant="outline" 
                    size="lg"
                    data-testid="button-about-work"
                  >
                    View My Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
