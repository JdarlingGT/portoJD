import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertAnalyticsEventSchema } from "@shared/schema";
import { contactFormRateLimit, analyticsRateLimit } from "./middleware/rate-limit";
import { emailService } from "./services/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", contactFormRateLimit.middleware(), async (req, res) => {
    try {
      // Honeypot check
      if (req.body.website) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid submission" 
        });
      }

      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission({
        ...validatedData,
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
      });

      // Send email notification
      const emailSent = await emailService.sendContactNotification({
        ...validatedData,
        company: validatedData.company || undefined,
        utmSource: validatedData.utmSource || undefined
      });
      
      if (!emailSent) {
        console.error("Failed to send email notification for contact submission:", submission.id);
      }

      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon.",
        submissionId: submission.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof Error && "issues" in error) {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your input and try again.",
          errors: error.issues 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again later." 
      });
    }
  });

  // Analytics event tracking
  app.post("/api/analytics", analyticsRateLimit.middleware(), async (req, res) => {
    try {
      const validatedData = insertAnalyticsEventSchema.parse(req.body);
      
      await storage.createAnalyticsEvent({
        ...validatedData,
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(400).json({ success: false });
    }
  });

  // Resume download tracking
  app.get("/api/resume/download", async (req, res) => {
    try {
      // Track download event
      await storage.createAnalyticsEvent({
        event: "resume_download",
        properties: { 
          source: req.get("Referer") || "direct",
          userAgent: req.get("User-Agent") 
        },
        sessionId: req.get("X-Session-ID"),
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
      });

      // In a real implementation, you would serve the actual PDF file
      // For now, we'll return a success response
      res.json({ 
        success: true, 
        message: "Resume download tracked",
        downloadUrl: "/jacob-darling-resume.pdf" // This would be a real file URL
      });
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ success: false });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
