---
title: "The Fortress — Defense-in-Depth at the Edge"
subtitle: "Cloudflare WAF, DNSSEC, mTLS, and strict headers for calm origins"
icon: "shield"
tags: ["Security", "Infra", "Performance"]
coverImg: "/assets/images/payment-plans-quote-to-order-2-hero.png"
kpi1: "~85k hostile requests blocked/month"
kpi2: "Cache hit ≈86% after tiering"
kpi3: "Zero major incidents post-launch"
---

## Challenge
Bot floods, credential stuffing, and junk scanners were spiking infra costs and degrading Core Web Vitals. Security lived at the origin; the edge was passive.

## Strategy
Move protection **to the edge**, add **cryptographic trust** on the wire, and harden the **browser contract** with strict headers. Keep performance first: block fast, serve faster.

## Build
- **Cloudflare WAF**: managed rules + custom rate limits + Bot Fight Mode  
- **DNSSEC**: signed zone, registrar config validated  
- **Authenticated Origin Pulls / mTLS**: only Cloudflare can talk to origin  
- **Security Headers**: HSTS, CSP, `X-Frame-Options`, `Referrer-Policy`  
- **Tiered Cache**: regional POP hierarchy; cookie-free assets  
- **Observability**: bot analytics, firewall events, cache analytics

## Results
- ~**85k** hostile requests blocked monthly (no more random spikes)  
- **Incident count ↓**; origin stays **cool** during launches  
- **CWV/SEO** tailwind from fewer server stalls and smaller payloads

## Tech Stack
Cloudflare (WAF, DNSSEC, AOP/mTLS, Tiered Cache) • Nginx/Apache • GA4/BigQuery • Netdata
