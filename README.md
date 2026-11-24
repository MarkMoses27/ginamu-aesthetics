# Ginamu Aesthetics

Premium aesthetics and wellbeing website for Ginamu Aesthetics, Westlands, Nairobi.

## Service-first upgrade (November 2026)
- Homepage now places a fast, mobile-friendly treatment and price menu immediately after the hero.
- Category tabs (massage, spa rituals, facials, nails, lashes/brows, waxing) and name search.
- Each treatment has a prefilled WhatsApp enquiry CTA.
- The full /treatments menu and signature treatment prices share one server-side content loader.
- Carefully timed GSAP section entrances, lightweight CSS row reveals and reduced-motion support.
- Ginamu burgundy (#6e1f2f), ash (#687377), and cream remain unchanged.

## CMS readiness
See docs/CMS-SETUP.md and sanity/schemaTypes/ginamuTreatment.ts. The website has a Sanity-compatible read layer with a fallback to the approved local price list. **A Sanity project and authenticated Studio must be connected before Regina can edit content in a dashboard.** Category pages and the downloadable PDF are not yet CMS-synced.

## Stack
Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis, Sanity-ready data integration.
