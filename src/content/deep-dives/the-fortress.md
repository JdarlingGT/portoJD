---
title: "The Fortress"
summary: "Implementing a defense-in-depth security and performance strategy at the edge."
---

# The Fortress
**Subtitle:** Defense-in-Depth & Edge Performance  
**Tags:** Security • Performance • Caching • WAF

## Key Takeaways
- Layered security: WAF, bot rules, origin hardening
- Edge caching raised hit rate to ~86% and calmed origin load
- CWV improved; conversions up post-stability

## The Spark
Traffic spikes + bot abuse = slow pages and nervous infra.

## The Blueprint
- Cloudflare WAF/Bot rules; rate limiting; geo controls
- Cache rules by route; image optimization; stale-while-revalidate
- DNSSEC + TLS hardening; headers; backup drills
- Error budgets + perf SLOs; alerts via Netdata

## The Impact
- ~86% cache hit rate; fewer origin calls; faster TTFB
- Security incidents down; fewer downtime escalations
- SEO and conversion lift from stability/CWV

## Tech Stack
Cloudflare (WAF/Bot/Cache) • Netdata • Image optimizer • Headers

## Metrics to Watch
Cache hit % • TTFB • Bot mitigations • Error budget burn
