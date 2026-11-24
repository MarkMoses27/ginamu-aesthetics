# Ginamu Aesthetics: treatment content management

## What is implemented in the website
- Both the homepage quick-treatment menu and /treatments use the same server-side treatment content loader.
- The four signature treatment cards use the same prices.
- The approved local treatments.json is a reliable fallback.
- When a Sanity project is configured, published Ginamu treatment entries can override existing records by stable ID, add treatments, or hide them using active=false.
- Public data refreshes about every five minutes; site visitors do not need to sign in.

## What is still required to get a working editing dashboard
1. Create/choose an official **Sanity** project under Ginamu's ownership and select the production dataset.
2. Register sanity/schemaTypes/ginamuTreatment.ts in a Sanity Studio project, deploy the Studio, and add Regina or the responsible editor as a named user with suitable permissions.
3. In Vercel Project Settings > Environment Variables, set:
   - NEXT_PUBLIC_SANITY_PROJECT_ID = your Sanity project ID
   - NEXT_PUBLIC_SANITY_DATASET = production
4. In Sanity project's CORS settings, allow the deployed Studio domain. The public site reads from the Content Lake over HTTPS.
5. Publish or import all approved treatments with stable slug IDs matching src/data/treatments.json.
6. Verify the resulting homepage, full treatment menu, and category pages before relying solely on the CMS. Category-specific pages and the PDF download are not yet sourced from the CMS.
7. Add a content-editing audit/review process, especially for pricing. Do not store API write tokens in public browser code.

## Pricing rules
- Keep the approved price and unit exactly as supplied, including "From", "per nail", "for two", and minutes.
- Do not invent treatment durations.
- Always verify /treatments and the downloadable PDF after publishing a price change.
- Use the original brand colors burgundy (#6e1f2f) and ash (#687377).
- No public unauthenticated admin editing route is provided: it would be unsafe.

## Fallback / operational resilience
If Sanity is not yet connected, its response is unavailable, or its content does not validate, the original approved GitHub price data continues to render. Individual CMS entries override matching IDs; unpublished/draft documents are not included by the public API.
