import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { analytics } from "@/lib/analytics";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // Honeypot field
  });
  const { toast } = useToast();

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
        toast({
          title: "Message sent!",
          description: result.message,
        });

        // Track successful submission
        analytics.trackContactSubmit(true, utmSource);

        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          website: "",
        });
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

  const handleBookCall = () => {
    analytics.trackCTAClick("contact", "Book Calendar Time");
    // In a real implementation, this would open a calendar booking widget
    toast({
      title: "Calendar integration",
      description: "This would open a calendar booking widget.",
    });
  };

  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="contact-heading">
            Ready to build a smarter marketing system?
          </h2>
          <p className="text-xl text-muted-foreground mb-12" data-testid="contact-description">
            Let's discuss how strategic marketing automation and systems architecture can accelerate your growth.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6" data-testid="contact-form-heading">Get In Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    data-testid="input-company"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    data-testid="textarea-message"
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
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4" data-testid="schedule-call-heading">Schedule a Call</h3>
                <p className="text-muted-foreground mb-4" data-testid="schedule-call-description">
                  Book a 15-minute portfolio walk-through to discuss your marketing technology challenges.
                </p>
                <Button 
                  className="w-full" 
                  onClick={handleBookCall}
                  data-testid="button-book-call"
                >
                  Book Calendar Time
                </Button>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4" data-testid="resume-download-heading">Download Resume</h3>
                <p className="text-muted-foreground mb-4" data-testid="resume-download-description">
                  Get a detailed overview of my experience, skills, and key achievements.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleResumeDownload}
                  data-testid="button-download-resume"
                >
                  Download PDF Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
