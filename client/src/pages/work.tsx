import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { caseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Work() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = Array.from(new Set(caseStudies.flatMap(study => study.tags)));

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredCaseStudies = selectedTags.length === 0
    ? caseStudies
    : caseStudies.filter(study =>
        selectedTags.some(tag => study.tags.includes(tag))
      );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="work-page-heading">
                Case Studies & Project Deep Dives
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="work-page-description">
                Detailed breakdowns of marketing systems architecture, strategic implementation, and measurable impact across diverse projects and challenges.
              </p>
            </div>

            {/* Filter Tags */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4" data-testid="filter-heading">Filter by Focus Area:</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90"
                    onClick={() => toggleTag(tag)}
                    data-testid={`filter-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tag}
                  </Badge>
                ))}
                {selectedTags.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedTags([])}
                    data-testid="filter-clear-all"
                  >
                    Clear All
                  </Badge>
                )}
              </div>
            </div>

            {/* Case Studies Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map(caseStudy => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>

            {filteredCaseStudies.length === 0 && (
              <div className="text-center py-12" data-testid="no-results">
                <p className="text-muted-foreground">No case studies match the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
