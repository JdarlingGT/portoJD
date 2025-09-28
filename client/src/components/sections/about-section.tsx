import { TimelineItem } from "@/components/ui/timeline-item";
import { getExperienceByTimeframe } from "@/data/experience";

export function AboutSection() {
  const experienceItems = getExperienceByTimeframe();

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="about-heading">
              My Story: The Architect in the Marketing Room
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
            <p data-testid="about-intro">
              Great marketing ideas often break at the handoff—the critical point where a creative vision meets the complex reality of technical execution. My career has been built to solve this problem.
            </p>
            
            <p data-testid="about-description">
              I'm Jacob Darling, a marketing leader who operates as both a brand strategist and a systems architect. On one side, I direct bold rebrands, craft compelling narratives, and launch creative campaigns. On the other, I design and build the underlying technical infrastructure that makes those campaigns possible and measurable.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-foreground" data-testid="professional-journey-heading">
              Professional Journey
            </h3>
            
            <div className="space-y-8">
              {experienceItems.map((experience, index) => (
                <TimelineItem key={`${experience.company}-${experience.startDate}`} experience={experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
