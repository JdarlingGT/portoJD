import { Badge } from "@/components/ui/badge";
import { formatPeriod } from "@/lib/utils/format";
import type { ExperienceItem } from "@/data/experience";

interface TimelineItemProps {
  experience: ExperienceItem;
  className?: string;
}

export function TimelineItem({ experience, className = "" }: TimelineItemProps) {
  return (
    <div className={`flex items-start space-x-4 ${className}`} data-testid={`timeline-item-${experience.company.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="bg-primary rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h4 className="font-semibold text-foreground" data-testid={`timeline-role-${experience.company.toLowerCase().replace(/\s+/g, '-')}`}>
            {experience.role}
          </h4>
          <span className="text-sm text-muted-foreground" data-testid={`timeline-period-${experience.company.toLowerCase().replace(/\s+/g, '-')}`}>
            {formatPeriod(experience.startDate, experience.endDate)}
            {experience.current && " (Current)"}
          </span>
        </div>
        <p className="text-muted-foreground mb-3" data-testid={`timeline-company-${experience.company.toLowerCase().replace(/\s+/g, '-')}`}>
          {experience.company}
        </p>
        
        <ul className="space-y-2 mb-4">
          {experience.highlights.map((highlight, index) => (
            <li 
              key={index} 
              className="text-muted-foreground text-sm"
              data-testid={`timeline-highlight-${experience.company.toLowerCase().replace(/\s+/g, '-')}-${index}`}
            >
              • {highlight}
            </li>
          ))}
        </ul>
        
        {experience.impactMetrics.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium mb-2">Key Impact:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experience.impactMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="bg-muted/50 rounded-lg p-3"
                  data-testid={`timeline-metric-${experience.company.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                >
                  <div className="font-semibold text-primary">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.metric}</div>
                  <div className="text-xs text-muted-foreground">{metric.context}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {experience.stack.map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="text-xs"
              data-testid={`timeline-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
