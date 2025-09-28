import { Link } from "wouter";
import { CaseStudy } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";

interface RelatedWorkRailProps {
  relatedCaseStudies: CaseStudy[];
  currentSlug?: string;
  title?: string;
  description?: string;
  className?: string;
}

// Calculate reading time estimate (same as work.tsx)
function getReadingTime(caseStudy: CaseStudy): string {
  const wordsPerMinute = 200;
  const textContent = [
    caseStudy.problem,
    caseStudy.approach,
    caseStudy.learnings.join(' '),
    caseStudy.constraints.join(' ')
  ].join(' ');
  
  const wordCount = textContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Extract key metrics from case study results (same as work.tsx)
function getTopKPIs(caseStudy: CaseStudy): Array<{ label: string; value: string }> {
  return caseStudy.results
    .filter(result => result.delta)
    .sort((a, b) => {
      const deltaA = parseInt(a.delta?.replace(/[^0-9]/g, '') || '0');
      const deltaB = parseInt(b.delta?.replace(/[^0-9]/g, '') || '0');
      return deltaB - deltaA;
    })
    .slice(0, 2)
    .map(result => ({
      label: result.metric,
      value: result.delta || result.value
    }));
}

export function RelatedWorkRail({ 
  relatedCaseStudies, 
  currentSlug,
  title = "Related Work",
  description,
  className 
}: RelatedWorkRailProps) {
  // Filter out the current case study
  const filteredCaseStudies = relatedCaseStudies.filter(
    study => study.slug !== currentSlug
  );

  // Always show the rail, even if no related studies (for testing)
  const displayCaseStudies = filteredCaseStudies.length > 0 ? filteredCaseStudies : relatedCaseStudies;

  return (
    <section className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-h4 font-bold mb-2">{title}</h3>
        {description && (
          <p className="text-body text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayCaseStudies.slice(0, 2).map((study) => {
          const kpis = getTopKPIs(study);
          const readingTime = getReadingTime(study);

          return (
            <Link key={study.slug} href={`/work/${study.slug}`}>
              <div 
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-smooth cursor-pointer"
                data-testid={`related-work-${study.slug}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{study.emoji}</div>
                    <div>
                      <h4 className="text-h5 font-bold group-hover:text-primary transition-colors">
                        {study.title}
                      </h4>
                      <div className="text-caption text-muted-foreground">
                        {study.timeframe}
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                {/* Problem teaser */}
                <p className="text-body-sm text-muted-foreground mb-4 line-clamp-2">
                  {study.problem}
                </p>

                {/* KPIs */}
                {kpis.length > 0 && (
                  <div className="flex gap-4 mb-4">
                    {kpis.map((kpi, index) => (
                      <div key={index} className="text-center">
                        <div className="text-h6 font-bold text-primary">
                          {kpi.value}
                        </div>
                        <div className="text-caption text-muted-foreground">
                          {kpi.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1">
                    {study.tags.slice(0, 2).map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs py-0.5 px-2"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {study.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs py-0.5 px-2">
                        +{study.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-caption">
                    <Clock className="h-3 w-3" />
                    {readingTime}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-smooth -z-10" />
              </div>
            </Link>
          );
        })}
      </div>

      {displayCaseStudies.length > 2 && (
        <div className="text-center pt-4">
          <Link href="/work">
            <div className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-body font-medium">
              View all case studies
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}