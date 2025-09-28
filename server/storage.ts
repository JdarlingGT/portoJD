import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type AnalyticsEvent, type InsertAnalyticsEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission & { ipAddress?: string; userAgent?: string }): Promise<ContactSubmission>;
  createAnalyticsEvent(event: InsertAnalyticsEvent & { ipAddress?: string; userAgent?: string }): Promise<AnalyticsEvent>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private analyticsEvents: Map<string, AnalyticsEvent>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.analyticsEvents = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission & { ipAddress?: string; userAgent?: string }): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = {
      ...submission,
      company: submission.company || null,
      utmSource: submission.utmSource || null,
      ipAddress: submission.ipAddress || null,
      userAgent: submission.userAgent || null,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async createAnalyticsEvent(event: InsertAnalyticsEvent & { ipAddress?: string; userAgent?: string }): Promise<AnalyticsEvent> {
    const id = randomUUID();
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      properties: event.properties || null,
      sessionId: event.sessionId || null,
      ipAddress: event.ipAddress || null,
      userAgent: event.userAgent || null,
      id,
      createdAt: new Date(),
    };
    this.analyticsEvents.set(id, analyticsEvent);
    return analyticsEvent;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
