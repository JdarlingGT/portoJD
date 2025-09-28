import { useRoute } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { getCaseStudy } from "@/data/case-studies";
import { MetricCard } from "@/components/ui/metric-card";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

export default function CaseStudy() {
  const [match, params] = useRoute("/work/:slug");
  const caseStudy = match ? getCaseStudy(params!.slug) : null;

  useEffect(() => {
    if (caseStudy) {
      analytics.trackCaseStudyOpen(caseStudy.slug);
    }
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
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4" data-testid={`case-study-emoji-${caseStudy.slug}`}>
                  {caseStudy.emoji}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold" data-testid={`case-study-title-${caseStudy.slug}`}>
                    {caseStudy.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-3">
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
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {caseStudy.results.slice(0, 4).map((result, index) => (
                  <MetricCard
                    key={index}
                    value={result.delta || result.value}
                    label={result.metric}
                    data-testid={`case-study-metric-${index}`}
                  />
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
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
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none space-y-8">
              {/* Problem */}
              <section>
                <h2 className="text-2xl font-bold mb-4" data-testid="case-study-problem-heading">The Challenge</h2>
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
                <h2 className="text-2xl font-bold mb-4" data-testid="case-study-approach-heading">The Approach</h2>
                <p className="text-muted-foreground" data-testid="case-study-approach-content">
                  {caseStudy.approach}
                </p>
              </section>

              {/* Results */}
              <section>
                <h2 className="text-2xl font-bold mb-4" data-testid="case-study-results-heading">The Impact</h2>
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

              {/* Tech Stack */}
              <section>
                <h2 className="text-2xl font-bold mb-4" data-testid="case-study-stack-heading">Technology Stack</h2>
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
                  <h2 className="text-2xl font-bold mb-4" data-testid="case-study-learnings-heading">Key Learnings</h2>
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

            {/* CTA */}
            <div className="bg-card border border-border rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4" data-testid="case-study-cta-heading">
                Interested in similar results?
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="case-study-cta-description">
                Let's discuss how I can help architect marketing systems that drive measurable growth for your organization.
              </p>
              <Button 
                size="lg" 
                onClick={handleContactCTA}
                data-testid="button-case-study-cta"
              >
                Book a 15-min portfolio walk-through
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
