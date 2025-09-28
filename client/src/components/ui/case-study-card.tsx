import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { analytics } from "@/lib/analytics";
import type { CaseStudy } from "@/data/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

export function CaseStudyCard({ caseStudy, className = "" }: CaseStudyCardProps) {
  const handleReadMore = () => {
    analytics.trackCaseStudyOpen(caseStudy.slug);
  };

  return (
    <div 
      className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow animate-scale-in ${className}`}
      data-testid={`case-study-card-${caseStudy.slug}`}
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3" data-testid={`case-study-emoji-${caseStudy.slug}`}>
          {caseStudy.emoji}
        </div>
        <h3 className="text-xl font-semibold" data-testid={`case-study-title-${caseStudy.slug}`}>
          {caseStudy.title}
        </h3>
      </div>
      
      <p className="text-muted-foreground mb-6" data-testid={`case-study-description-${caseStudy.slug}`}>
        {caseStudy.problem}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {caseStudy.tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="bg-primary/10 text-primary"
            data-testid={`case-study-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      <Link href={`/work/${caseStudy.slug}`}>
        <Button 
          className="w-full" 
          onClick={handleReadMore}
          data-testid={`button-read-case-study-${caseStudy.slug}`}
        >
          Read the Story
        </Button>
      </Link>
    </div>
  );
}
