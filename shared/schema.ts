import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  utmSource: text("utm_source"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  event: text("event").notNull(),
  properties: json("properties"),
  sessionId: text("session_id"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  message: true,
  utmSource: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  event: true,
  properties: true,
  sessionId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
