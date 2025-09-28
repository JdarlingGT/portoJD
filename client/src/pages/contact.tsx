import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEmbed } from "@/components/ui/calendar-embed";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { analytics } from "@/lib/analytics";
import { useLocation } from "wouter";
import { Linkedin, Github, Calendar, Download, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // Honeypot field
  });
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Capture UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direct';

      const response = await apiRequest("POST", "/api/contact", {
        ...formData,
        utmSource,
      });

      const result = await response.json();

      if (result.success) {
        // Track successful submission
        analytics.trackContactSubmit(true, utmSource);

        // Redirect to success page instead of showing toast
        navigate('/contact/success');
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });

      // Track failed submission
      analytics.trackContactSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = async () => {
    try {
      analytics.trackResumeDownload();
      
      const response = await apiRequest("GET", "/api/resume/download");
      const result = await response.json();
      
      if (result.success) {
        // In a real implementation, this would trigger a file download
        toast({
          title: "Resume download tracked",
          description: "Resume download would begin now.",
        });
      }
    } catch (error) {
      console.error("Resume download error:", error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    }
  };


  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Best for detailed project discussions",
      action: "Use the form below",
      primary: true
    },
    {
      icon: Calendar,
      title: "Video Call",
      description: "15-minute portfolio walk-through",
      action: "Book calendar time",
      primary: false
    },
    {
      icon: Phone,
      title: "Phone",
      description: "For urgent inquiries",
      action: "Available upon request",
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-display font-bold mb-6" data-testid="contact-page-heading">
                Let's Build Something Great Together
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="contact-page-description">
                Ready to discuss how strategic marketing automation and systems architecture can accelerate your growth? I'd love to hear about your challenges and explore how we can solve them together.
              </p>
              
              {/* Value Proposition Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-h4 font-bold text-primary">24hr</div>
                  <div className="text-caption text-muted-foreground">Response Time</div>
                </div>
                <div>
                  <div className="text-h4 font-bold text-primary">15min</div>
                  <div className="text-caption text-muted-foreground">Discovery Call</div>
                </div>
                <div>
                  <div className="text-h4 font-bold text-primary">100%</div>
                  <div className="text-caption text-muted-foreground">No Sales Pressure</div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card 
                    key={method.title} 
                    className={method.primary ? "border-primary" : ""}
                    data-testid={`contact-method-${index}`}
                  >
                    <CardHeader className="text-center">
                      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle data-testid={`contact-method-title-${index}`}>{method.title}</CardTitle>
                      <CardDescription data-testid={`contact-method-description-${index}`}>
                        {method.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground" data-testid={`contact-method-action-${index}`}>
                        {method.action}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form - Takes 3 columns */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="contact-form-title">Send a Message</CardTitle>
                    <CardDescription data-testid="contact-form-subtitle">
                      Tell me about your project, challenges, or questions. I typically respond within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            data-testid="input-contact-name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            data-testid="input-contact-email"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Company / Organization</Label>
                        <Input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          data-testid="input-contact-company"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          placeholder="Tell me about your project, challenges, timeline, and what you're hoping to achieve..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          data-testid="textarea-contact-message"
                        />
                      </div>
                      
                      {/* Honeypot field */}
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                        data-testid="button-submit-contact-form"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Calendar Embed */}
                <CalendarEmbed 
                  title="Schedule a Call"
                  description="Book a 15-minute portfolio walk-through to discuss your marketing technology challenges."
                />

                {/* Resume Download */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center" data-testid="resume-card-title">
                      <Download className="w-5 h-5 mr-2 text-primary" />
                      Resume & Portfolio
                    </CardTitle>
                    <CardDescription data-testid="resume-card-description">
                      Download a detailed overview of my experience, technical skills, and key achievements across marketing systems architecture.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={handleResumeDownload}
                      data-testid="button-download-resume-contact"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Resume
                    </Button>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="response-time-title">Response Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email inquiries:</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Project discussions:</span>
                      <span className="font-medium">Same day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Urgent matters:</span>
                      <span className="font-medium">Within 4 hours</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="connect-title">Connect Online</CardTitle>
                    <CardDescription data-testid="connect-description">
                      Follow my work and connect on professional platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <a 
                        href="https://linkedin.com/in/jacobdarling" 
                        className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                        aria-label="LinkedIn"
                        data-testid="link-contact-linkedin"
                      >
                        <Linkedin className="w-6 h-6 text-primary" />
                      </a>
                      <a 
                        href="https://github.com/jacobdarling" 
                        className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                        aria-label="GitHub"
                        data-testid="link-contact-github"
                      >
                        <Github className="w-6 h-6 text-primary" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12" data-testid="faq-heading">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-6">
                  <div data-testid="faq-item-0">
                    <h3 className="font-semibold mb-2">What types of projects do you work on?</h3>
                    <p className="text-muted-foreground text-sm">
                      I specialize in marketing systems architecture, automation implementation, analytics engineering, and performance optimization for growing businesses.
                    </p>
                  </div>
                  
                  <div data-testid="faq-item-1">
                    <h3 className="font-semibold mb-2">Do you work with remote teams?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, I work effectively with distributed teams and have experience managing projects across different time zones and collaboration styles.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div data-testid="faq-item-2">
                    <h3 className="font-semibold mb-2">What's your typical project timeline?</h3>
                    <p className="text-muted-foreground text-sm">
                      Project timelines vary based on scope, but most marketing automation implementations take 4-8 weeks, while full system architectures can take 3-6 months.
                    </p>
                  </div>
                  
                  <div data-testid="faq-item-3">
                    <h3 className="font-semibold mb-2">Do you provide ongoing support?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, I offer various support arrangements from monthly optimization reviews to full-service ongoing management depending on your needs.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
