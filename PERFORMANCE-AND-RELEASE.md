# LUMIQ performance and release notes

## What this build improves
- Defers application scripts so HTML parsing is not blocked by JavaScript downloads.
- Preloads the small local stylesheet.
- Debounces Notes search by 120 ms and avoids rebuilding the results list during IME composition (important for Bengali typing).
- Uses system fonts and local assets only; no third-party font, analytics, or image requests.
- Keeps the app local-first: no network call is made for ordinary study tools.
- Adds mobile tap optimizations and light layout/style containment for repeated cards.
- Uses Vercel CDN shared-cache headers for static assets and short revalidation for HTML. Vercel compression is handled by the platform.

## Important limits
- No honest guarantee can be made for every 2 GB phone without testing on actual devices and browsers.
- This static app has not been load-tested at 1,000,000 concurrent visitors. CDN caching can serve static files at scale, but capacity, cache-hit ratio, origin limits, and traffic shape must be measured.
- AI Tutor and Live Voice are not enabled in this build. Their latency and capacity depend on the selected model/provider, region, rate limits, server design, and paid usage. Streaming can show the first token earlier but cannot guarantee ChatGPT-level response time.
- Local browser storage is per-device and is not cloud sync.

## Before launch
1. Import the project root into Vercel as a static site. No build command is required; output directory is `.`.
2. Verify `/`, `/privacy.html`, `/terms.html`, and `/favicon.svg` on the deployed domain.
3. Test on a real 2 GB Android phone in Chrome and on a desktop browser. Check typing in Bengali and English, navigation, notes search, export, and reload persistence.
4. Use Lighthouse or PageSpeed on the deployed URL. Target a mobile LCP under 2.5 s on a representative connection, while recording the test device/network.
5. For a million-concurrent-visitor claim, run a staged load test against the deployed domain (for example with k6 or a reputable load-testing provider), increase traffic gradually, and monitor CDN cache-hit ratio, origin requests, 4xx/5xx, latency percentiles, and bandwidth. Do not launch a sudden test against a production project without checking provider limits.
6. Do not add API keys to HTML, JavaScript, or GitHub. AI features need a server-side backend and secrets stored in Vercel Environment Variables.

## Current release status
Static study tools only. AI Tutor, account login/cloud sync, live voice, support tickets, admin tools, and advertising remain disabled/not configured.
