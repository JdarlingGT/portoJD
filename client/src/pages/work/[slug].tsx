import { useRoute } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { MetricCard } from "@/components/ui/metric-card";
import { StatBar } from "@/components/ui/stat-bar";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { EvidenceGallery } from "@/components/ui/evidence-gallery";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { RelatedWorkRail } from "@/components/ui/related-work-rail";
import { analytics } from "@/lib/analytics";
import { useEffect, useMemo } from "react";

export default function CaseStudy() {
  const [match, params] = useRoute("/work/:slug");
  const caseStudy = match ? getCaseStudy(params!.slug) : null;

  useEffect(() => {
    if (caseStudy) {
      analytics.trackCaseStudyOpen(caseStudy.slug);
    }
  }, [caseStudy]);

  // Generate table of contents
  const tocItems = useMemo(() => {
    if (!caseStudy) return [];
    
    const items = [
      { id: "challenge", title: "The Challenge", level: 2 },
      { id: "approach", title: "The Approach", level: 2 },
      { id: "impact", title: "The Impact", level: 2 },
    ];
    
    if (caseStudy.artifacts.length > 0) {
      items.push({ id: "evidence", title: "Evidence", level: 2 });
    }
    
    items.push(
      { id: "tech-stack", title: "Technology Stack", level: 2 },
      { id: "learnings", title: "Key Learnings", level: 2 }
    );
    
    return items;
  }, [caseStudy]);

  // Get related case studies
  const relatedCaseStudies = useMemo(() => {
    if (!caseStudy) return [];
    
    // First try to get case studies with shared tags
    let related = caseStudies.filter(study => 
      study.slug !== caseStudy.slug && 
      study.tags.some(tag => caseStudy.tags.includes(tag))
    );
    
    // If no shared tags, get other case studies  
    if (related.length === 0) {
      related = caseStudies.filter(study => study.slug !== caseStudy.slug);
    }
    
    return related.slice(0, 3);
  }, [caseStudy]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4" data-testid="case-study-not-found-heading">Case Study Not Found</h1>
              <p className="text-muted-foreground mb-8" data-testid="case-study-not-found-description">
                The case study you're looking for doesn't exist.
              </p>
              <Link href="/work">
                <Button data-testid="button-back-to-work">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleContactCTA = () => {
    analytics.trackCTAClick("case-study", "Book a 15-min portfolio walk-through");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8" data-testid="breadcrumb">
              <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Case Studies
              </Link>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4" data-testid={`case-study-emoji-${caseStudy.slug}`}>
                  {caseStudy.emoji}
                </div>
                <div>
                  <h1 className="text-display font-bold mb-2" data-testid={`case-study-title-${caseStudy.slug}`}>
                    {caseStudy.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" data-testid={`case-study-role-${caseStudy.slug}`}>
                      {caseStudy.role}
                    </Badge>
                    <Badge variant="outline" data-testid={`case-study-timeframe-${caseStudy.slug}`}>
                      {caseStudy.timeframe}
                    </Badge>
                    <Badge variant="outline" data-testid={`case-study-context-${caseStudy.slug}`}>
                      {caseStudy.context}
                    </Badge>
                  </div>
                  <p className="text-body-lg text-muted-foreground max-w-2xl">
                    {caseStudy.problem.split('.')[0]}.
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {caseStudy.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    className="bg-primary/10 text-primary"
                    data-testid={`case-study-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* StatBar with Key Outcomes */}
              <StatBar
                title="Key Outcomes Delivered"
                description="Measurable impact achieved through strategic system architecture and marketing automation."
                items={caseStudy.results.map(result => ({
                  label: result.metric,
                  value: result.value,
                  delta: result.delta,
                  baseline: result.baseline,
                  trend: result.delta?.includes('+') ? 'up' : 'neutral'
                }))}
              />
            </header>

            {/* Table of Contents - Sticky */}
            <TableOfContents items={tocItems} />

            {/* Content */}
            <div className="prose prose-lg max-w-none space-y-12">
              {/* Problem */}
              <section>
                <h2 id="challenge" className="text-h2 font-bold mb-6" data-testid="case-study-problem-heading">The Challenge</h2>
                <p className="text-muted-foreground" data-testid="case-study-problem-content">
                  {caseStudy.problem}
                </p>
                
                {caseStudy.constraints.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Key Constraints:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {caseStudy.constraints.map((constraint, index) => (
                        <li key={index} className="text-muted-foreground" data-testid={`case-study-constraint-${index}`}>
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* Approach */}
              <section>
                <h2 id="approach" className="text-h2 font-bold mb-6" data-testid="case-study-approach-heading">The Approach</h2>
                <p className="text-muted-foreground" data-testid="case-study-approach-content">
                  {caseStudy.approach}
                </p>
              </section>

              {/* Results */}
              <section>
                <h2 id="impact" className="text-h2 font-bold mb-6" data-testid="case-study-results-heading">The Impact</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudy.results.map((result, index) => (
                    <div 
                      key={index} 
                      className="bg-card border border-border rounded-lg p-4"
                      data-testid={`case-study-result-${index}`}
                    >
                      <div className="font-semibold text-primary text-lg">
                        {result.delta || result.value}
                        {result.unit && ` ${result.unit}`}
                      </div>
                      <div className="font-medium">{result.metric}</div>
                      {result.baseline && (
                        <div className="text-sm text-muted-foreground">
                          From {result.baseline} to {result.value}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">{result.period}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Evidence Gallery */}
              {caseStudy.artifacts.length > 0 && (
                <section>
                  <h2 id="evidence" className="text-h2 font-bold mb-6">Evidence & Artifacts</h2>
                  <EvidenceGallery
                    items={caseStudy.artifacts.map((artifact, index) => ({
                      id: `artifact-${index}`,
                      src: artifact.src,
                      alt: artifact.alt,
                      caption: artifact.caption,
                      type: artifact.type === 'document' ? 'image' : artifact.type as any
                    }))}
                    columns={3}
                  />
                </section>
              )}

              {/* Before/After Slider - Sample for demonstration */}
              {caseStudy.slug === 'the-launchpad' && (
                <section className="mb-12">
                  <h2 className="text-h2 font-bold mb-6">Transformation</h2>
                  <BeforeAfterSlider
                    beforeImage={{
                      src: "/case-studies/launchpad-before.png",
                      alt: "Before: Static directory interface",
                      caption: "Original static directory with limited functionality"
                    }}
                    afterImage={{
                      src: "/case-studies/launchpad-after.png", 
                      alt: "After: Dynamic automated system",
                      caption: "New automated lead generation system with smart workflows"
                    }}
                  />
                </section>
              )}

              {/* Tech Stack */}
              <section>
                <h2 id="tech-stack" className="text-h2 font-bold mb-6" data-testid="case-study-stack-heading">Technology Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stack.map(tech => (
                    <Badge 
                      key={tech} 
                      variant="outline"
                      data-testid={`case-study-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Learnings */}
              {caseStudy.learnings.length > 0 && (
                <section>
                  <h2 id="learnings" className="text-h2 font-bold mb-6" data-testid="case-study-learnings-heading">Key Learnings</h2>
                  <ul className="space-y-3">
                    {caseStudy.learnings.map((learning, index) => (
                      <li 
                        key={index} 
                        className="flex items-start space-x-2"
                        data-testid={`case-study-learning-${index}`}
                      >
                        <span className="text-primary font-bold">•</span>
                        <span className="text-muted-foreground">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Related Work Rail */}
            <div className="mt-16 mb-12" data-testid="related-work-rail">
              <RelatedWorkRail 
                relatedCaseStudies={relatedCaseStudies}
                currentSlug={caseStudy.slug}
                title="Related Case Studies"
                description="Explore other projects with similar challenges and outcomes."
              />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-xl p-8 mt-16 text-center shadow-md">
              <h3 className="text-2xl font-bold mb-4" data-testid="case-study-cta-heading">
                Interested in similar results?
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="case-study-cta-description">
                Let's discuss how I can help architect marketing systems that drive measurable growth for your organization.
              </p>
              <Button 
                size="lg" 
                onClick={handleContactCTA}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-case-study-cta"
                asChild
              >
                <a href="/contact">Book a 15-min portfolio walk-through</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
