import { CaseStudyCard } from "@/components/ui/case-study-card";
import { getFeaturedCaseStudies } from "@/data/case-studies";

export function FeaturedWorkSection() {
  const featuredCaseStudies = getFeaturedCaseStudies();

  return (
    <section id="work" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="featured-work-heading">
            Project Deep Dives
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="featured-work-description">
            From Spark to System: The stories behind the strategy, architecture, and problem-solving that goes into building scalable, revenue-focused marketing systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
