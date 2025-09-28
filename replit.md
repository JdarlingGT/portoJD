# Portfolio Marketing Platform

## Overview

This is a professional portfolio and case study showcase platform built for marketing professionals and technical leaders. The application focuses on demonstrating expertise through detailed case studies, technical competencies, and conversion-oriented design. The platform emphasizes performance, accessibility, and user experience to effectively communicate professional value to hiring managers and potential clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming and design tokens
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent, accessible UI elements
- **State Management**: TanStack Query for server state management and caching
- **Theme System**: Light/dark mode support with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: In-memory storage with planned PostgreSQL session store integration
- **API Design**: RESTful endpoints with comprehensive error handling and logging

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for schema management and migrations
- **Schema**: Structured tables for users, contact submissions, and analytics events
- **Validation**: Zod schemas for runtime type validation and data integrity
- **Database Provider**: Neon Database serverless PostgreSQL

### Authentication & Security
- **Rate Limiting**: Custom rate limiting middleware for API endpoints
- **Spam Protection**: Honeypot fields and IP-based rate limiting for contact forms
- **Data Validation**: Server-side validation using Zod schemas
- **Security Headers**: Express middleware for security best practices

### Content Management
- **Static Content**: TypeScript-based data files for case studies, experience, and skills
- **Dynamic Content**: Database-stored contact submissions and analytics events
- **Asset Management**: Optimized image handling with responsive design considerations
- **Performance**: Lazy loading and code splitting for optimal load times

### Design System
- **Typography**: Fluid responsive typography with clamp() functions
- **Color System**: HSL-based color tokens supporting light/dark themes
- **Motion**: Consistent animation timing and easing functions
- **Component Variants**: Class variance authority for component styling patterns
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## External Dependencies

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle Kit**: Database migration and schema management tools

### Email Services
- **SendGrid**: Email delivery service for contact form notifications and communications
- **Console Email Service**: Development fallback for local testing

### UI & Styling
- **Radix UI**: Headless component primitives for accessible UI elements
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Typography with Space Grotesk, Inter, and JetBrains Mono

### Development Tools
- **Vite**: Build tool and development server with HMR support
- **ESBuild**: Fast bundling for production builds
- **TypeScript**: Type safety and developer experience enhancement
- **Replit Plugins**: Development environment integration for runtime error handling

### Analytics & Tracking
- **Custom Analytics**: Privacy-focused event tracking system
- **Session Management**: Client-side session identification for user journey tracking

### Search & Filtering
- **Fuse.js**: Fuzzy search functionality for case studies and content discovery
- **URL State Management**: Query parameter handling for filter persistence