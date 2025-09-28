import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 5) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const key = this.getKey(req);
      const now = Date.now();
      const record = this.store[key];

      if (!record || now > record.resetTime) {
        this.store[key] = {
          count: 1,
          resetTime: now + this.windowMs,
        };
        return next();
      }

      if (record.count >= this.maxRequests) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Please wait before submitting another request.",
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        });
      }

      record.count++;
      next();
    };
  }

  private getKey(req: Request): string {
    return req.ip || req.connection.remoteAddress || "unknown";
  }

  cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

export const contactFormRateLimit = new RateLimiter(15 * 60 * 1000, 3); // 3 requests per 15 minutes
export const analyticsRateLimit = new RateLimiter(5 * 60 * 1000, 50); // 50 events per 5 minutes

// Cleanup expired entries every hour
setInterval(() => {
  contactFormRateLimit.cleanup();
  analyticsRateLimit.cleanup();
}, 60 * 60 * 1000);
