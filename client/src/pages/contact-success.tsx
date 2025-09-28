import { useEffect, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowRight, Download, Calendar } from "lucide-react";
import { Link } from "wouter";
import { caseStudies } from "@/data/case-studies";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Get recommended case studies based on common engagement patterns
function getRecommendedCaseStudies() {
  return caseStudies
    .filter(study => ['marketing-automation', 'analytics-engineering', 'data-integrity'].some(tag => 
      study.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')).includes(tag)
    ))
    .slice(0, 2);
}

// Calculate reading time (same as work page)
function getReadingTime(problem: string, approach: string, learnings: string[]): string {
  const wordsPerMinute = 200;
  const textContent = [problem, approach, learnings.join(' ')].join(' ');
  const wordCount = textContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default function ContactSuccess() {
  const recommendedCaseStudies = useMemo(() => getRecommendedCaseStudies(), []);

  useEffect(() => {
    // Track successful contact page view
    analytics.track('contact_success_view', {
      recommended_studies: recommendedCaseStudies.map(study => study.slug)
    });
  }, [recommendedCaseStudies]);

  const handleResumeDownload = () => {
    analytics.trackResumeDownload();
  };

  const handleScheduleCall = () => {
    analytics.trackCTAClick("contact-success", "Schedule Follow-up Call");
  };

  const nextSteps = [
    {
      icon: CheckCircle,
      title: "Message Received",
      description: "Your message has been successfully sent and logged.",
      status: "complete"
    },
    {
      icon: Clock, 
      title: "Review & Response",
      description: "I'll review your inquiry and respond within 24 hours.",
      status: "next"
    },
    {
      icon: Calendar,
      title: "Discovery Call",
      description: "We'll schedule a call to discuss your project in detail.",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-display font-bold mb-4" data-testid="contact-success-heading">
                Message Sent Successfully!
              </h1>
              
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-success-description">
                Thank you for reaching out. I've received your message and will respond within 24 hours with next steps tailored to your project needs.
              </p>
            </div>

            {/* Next Steps Timeline */}
            <section className="mb-16">
              <h2 className="text-h3 font-bold text-center mb-8">What Happens Next</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {nextSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <Card 
                      key={index} 
                      className={
                        step.status === "complete" ? "relative border-green-200 bg-green-50/50" :
                        step.status === "next" ? "relative border-primary bg-primary/5" : 
                        "relative"
                      }
                      data-testid={`next-step-${index}`}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className={
                          step.status === "complete" ? "inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 bg-green-100 text-green-600" :
                          step.status === "next" ? "inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 bg-primary/10 text-primary" :
                          "inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 bg-muted text-muted-foreground"
                        }>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-h5">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 text-center">
                        <p className="text-body-sm text-muted-foreground">
                          {step.description}
                        </p>
                        
                        {step.status === "complete" && (
                          <Badge variant="secondary" className="mt-3 bg-green-100 text-green-700">
                            Complete
                          </Badge>
                        )}
                        
                        {step.status === "next" && (
                          <Badge className="mt-3">
                            In Progress
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Schedule Call */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary" />
                      Speed Up the Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-sm text-muted-foreground mb-4">
                      Skip the email back-and-forth and book a 15-minute call to discuss your project directly.
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={handleScheduleCall}
                      data-testid="button-schedule-followup-call"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Follow-up Call
                    </Button>
                  </CardContent>
                </Card>

                {/* Resume Download */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Download className="w-5 h-5 mr-2 text-primary" />
                      Learn More About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-sm text-muted-foreground mb-4">
                      Download my detailed resume to review my experience and technical capabilities.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleResumeDownload}
                      data-testid="button-download-resume-success"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Recommended Case Studies */}
            {recommendedCaseStudies.length > 0 && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-h3 font-bold mb-3">While You Wait</h2>
                  <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                    Explore these relevant case studies to see how I've solved similar challenges for other clients.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {recommendedCaseStudies.map((study) => {
                    const readingTime = getReadingTime(study.problem, study.approach, study.learnings);
                    const topResult = study.results[0];
                    
                    return (
                      <Link key={study.slug} href={`/work/${study.slug}`}>
                        <Card 
                          className="group h-full hover:border-primary/50 hover:shadow-lg transition-all duration-smooth cursor-pointer"
                          data-testid={`recommended-case-study-${study.slug}`}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{study.emoji}</div>
                                <div>
                                  <CardTitle className="group-hover:text-primary transition-colors text-h5">
                                    {study.title}
                                  </CardTitle>
                                  <div className="text-caption text-muted-foreground">
                                    {study.timeframe}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>

                            {/* Key Result */}
                            {topResult && (
                              <div className="bg-primary/5 rounded-lg p-3 mb-3">
                                <div className="text-h6 font-bold text-primary">
                                  {topResult.delta || topResult.value}
                                </div>
                                <div className="text-caption text-muted-foreground">
                                  {topResult.metric}
                                </div>
                              </div>
                            )}
                          </CardHeader>

                          <CardContent>
                            {/* Problem Preview */}
                            <p className="text-body-sm text-muted-foreground mb-4 line-clamp-2">
                              {study.problem}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-border/50">
                              <div className="flex flex-wrap gap-1">
                                {study.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {study.tags.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{study.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1 text-caption text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {readingTime}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

                <div className="text-center">
                  <Link href="/work">
                    <Button variant="outline" data-testid="button-view-all-case-studies">
                      View All Case Studies
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}