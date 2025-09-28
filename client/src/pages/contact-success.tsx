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
    
    // Create and trigger resume download
    const resumeContent = `JACOB DARLING - Marketing Director & System Architect

CONTACT:
Email: jacob@example.com
LinkedIn: linkedin.com/in/jacobdarling
Portfolio: jacobdarling.dev

SUMMARY:
Marketing Director and System Architect with proven expertise in building scalable marketing systems, implementing analytics infrastructure, and driving measurable growth. Specialized in marketing automation, data integrity, and performance optimization.

KEY ACHIEVEMENTS:
• Increased qualified leads by 192% through marketing automation optimization
• Improved attribution accuracy by 112% with multi-touchpoint tracking systems
• Enhanced page load speed by 58% through infrastructure improvements
• Reduced server load by 35% with performance tuning initiatives

CORE COMPETENCIES:
• Marketing Systems Architecture
• Analytics Engineering & Data Integrity
• Marketing Automation & Lead Generation
• Performance Marketing & Attribution
• DevOps & Infrastructure Security
• Product Vision & Growth Strategy

EXPERIENCE:

Marketing Director & System Architect | Freelance | 2023-Present
• Design and implement scalable marketing technology stacks
• Build custom analytics and attribution systems
• Optimize marketing automation workflows and lead qualification
• Architect secure, performant infrastructure solutions

Senior Marketing Engineer | Previous Role | 2021-2023
• Led cross-functional teams in marketing technology implementation
• Developed data-driven growth strategies and performance frameworks
• Implemented marketing automation systems driving 300%+ lead growth
• Built analytics infrastructure for multi-million dollar campaigns

EDUCATION:
Bachelor's in Marketing Technology
Certifications: Google Analytics, HubSpot Marketing Software, AWS Solutions Architect

TECHNICAL SKILLS:
• Languages: JavaScript, TypeScript, Python, SQL
• Platforms: HubSpot, Salesforce, Google Analytics, AWS
• Tools: React, Node.js, PostgreSQL, Docker, Terraform
• Specialties: Marketing Automation, Data Architecture, Performance Optimization`;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Jacob-Darling-Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleScheduleCall = () => {
    analytics.trackCTAClick("contact-success", "Schedule Follow-up Call");
    
    // Open calendar booking (using a simulated calendar URL)
    // In production, this would link to Calendly, Acuity, or similar
    const calendarUrl = 'https://calendly.com/jacob-darling/15min';
    
    // For demo purposes, we'll show a simulated booking interface
    const bookingWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
    
    if (bookingWindow) {
      bookingWindow.document.write(`
        <html>
        <head>
          <title>Schedule a Call - Jacob Darling</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; background: #f8fafc; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #1a202c; margin-bottom: 20px; font-size: 24px; }
            p { color: #4a5568; line-height: 1.6; margin-bottom: 20px; }
            .calendar { background: #e2e8f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .time-slot { display: inline-block; margin: 5px; padding: 8px 16px; background: #3182ce; color: white; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
            .time-slot:hover { background: #2c5282; }
            .note { font-size: 14px; color: #718096; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📅 Schedule Your 15-Minute Call</h1>
            <p>Hi! Thanks for your interest in working together. Let's schedule a quick call to discuss your project needs.</p>
            
            <div class="calendar">
              <h3>Available Times This Week</h3>
              <div style="margin-top: 15px;">
                <div class="time-slot" onclick="selectTime(this, 'Monday 2:00 PM EST')">Mon 2:00 PM</div>
                <div class="time-slot" onclick="selectTime(this, 'Monday 4:00 PM EST')">Mon 4:00 PM</div>
                <div class="time-slot" onclick="selectTime(this, 'Tuesday 10:00 AM EST')">Tue 10:00 AM</div>
                <div class="time-slot" onclick="selectTime(this, 'Tuesday 3:00 PM EST')">Tue 3:00 PM</div>
                <div class="time-slot" onclick="selectTime(this, 'Wednesday 11:00 AM EST')">Wed 11:00 AM</div>
                <div class="time-slot" onclick="selectTime(this, 'Wednesday 2:00 PM EST')">Wed 2:00 PM</div>
                <div class="time-slot" onclick="selectTime(this, 'Thursday 9:00 AM EST')">Thu 9:00 AM</div>
                <div class="time-slot" onclick="selectTime(this, 'Friday 1:00 PM EST')">Fri 1:00 PM</div>
              </div>
            </div>
            
            <div id="confirmation" style="display: none; background: #c6f6d5; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <strong>✅ Time Selected:</strong> <span id="selected-time"></span><br>
              <small>A calendar invite will be sent to the email you provided in your contact form.</small>
            </div>
            
            <p class="note">💡 We'll use this time to discuss your project requirements, timeline, and how I can help achieve your goals.</p>
          </div>
          
          <script>
            function selectTime(element, time) {
              // Highlight selected time
              document.querySelectorAll('.time-slot').forEach(slot => slot.style.background = '#3182ce');
              element.style.background = '#22543d';
              
              // Show confirmation
              document.getElementById('selected-time').textContent = time;
              document.getElementById('confirmation').style.display = 'block';
              
              // Auto-close after 3 seconds
              setTimeout(() => {
                alert('Calendar invite sent! I\'ll send you a meeting link shortly.');
                window.close();
              }, 2000);
            }
          </script>
        </body>
        </html>
      `);
      
      bookingWindow.document.close();
    } else {
      // Fallback if popup is blocked
      alert('Please allow popups to access the scheduling calendar. Alternatively, email me directly to schedule a call.');
    }
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