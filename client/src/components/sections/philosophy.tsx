import { Archive, MessageCircle, BarChart3 } from "lucide-react";

export function PhilosophySection() {
  const approaches = [
    {
      icon: Archive,
      title: "Build for the System",
      description: "I design holistic full-funnel marketing ecosystems that ensure scalability and a seamless customer experience."
    },
    {
      icon: MessageCircle,
      title: "Translate Complexity",
      description: "I act as the bridge between creative vision and the MarTech stack, ensuring technical and strategic alignment across teams."
    },
    {
      icon: BarChart3,
      title: "Measure & Automate",
      description: "I implement robust analytics and attribution models to track KPIs, then automate workflows to drive efficiency and data-driven growth."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-slide-up" data-testid="philosophy-heading">
            My Approach: Architecting for Growth
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {approaches.map((approach, index) => {
              const IconComponent = approach.icon;
              return (
                <div key={approach.title} className={`text-center animate-scale-in stagger-${index + 1} hover-lift`} data-testid={`philosophy-item-${index}`}>
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover-glow transition-all duration-med ease-smooth">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" data-testid={`philosophy-title-${index}`}>
                    {approach.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`philosophy-description-${index}`}>
                    {approach.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
