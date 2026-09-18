---
name: waf-and-ddos-protection
description: Use when configuring Web Application Firewalls (Cloudflare/AWS WAF), DDoS mitigation, IP reputation filtering, bot protection, and rate limit rules.
---

# Web Application Firewall (WAF) & DDoS Defense Architecture

WAFs intercept malicious HTTP requests at the DNS/CDN edge before traffic ever touches your origin servers, blocking automated scraping, volumetric DDoS, and common vulnerability exploits.

---

## 1. Multi-Layered Edge Defense Topology

```
[Internet Traffic]
       │
       ▼
[Edge CDN / WAF (Cloudflare / CloudFront)]
 ├── Layer 7 DDoS Mitigation (Volumetric Rate Limiting)
 ├── OWASP Core Ruleset (SQLi, XSS, RCE detection)
 ├── Bot Management (Managed Challenge / Turnstile CAPTCHA)
 └── IP Threat Intelligence & Geoblocking
       │
       ▼ (Clean Sanitized Traffic)
[Origin Load Balancer (Restricted to CDN IP Ranges via mTLS/Secret Header)]
       │
       ▼
[Backend Application Cluster]
```

---

## 2. Origin Shielding Rules

Never expose your origin server's direct IP address to the public internet:
1. **Security Group Restriction**: Configure origin security groups to accept traffic ONLY from Cloudflare or AWS CloudFront IP prefix lists.
2. **Custom Origin Header Verification**:
   ```typescript
   // Origin middleware validation
   export function verifyCdnSecret(req: Request, res: Response, next: NextFunction) {
     const incomingSecret = req.headers['x-custom-origin-secret'];
     if (incomingSecret !== process.env.CDN_ORIGIN_SECRET) {
       return res.status(403).json({ error: 'Direct origin access forbidden' });
     }
     next();
   }
   ```
