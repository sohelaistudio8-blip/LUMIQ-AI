# LUMIQ · AI Study Platform
*Unlock Your Potential.* (pronounced Loo-mik). Independent from NUSO AI.

## Public MVP status

This is a static, local-first study app intended for a first public preview. It includes onboarding, subjects, planner, Markdown notes, flashcards, quizzes, focus timer, revision planner, resources, progress, settings, export/delete, light/dark themes and partial English/Bengali UI. Data stays in the visitor's browser local storage; it does not sync across devices.

**Not implemented or not connected:** OpenAI AI Tutor, live voice, Supabase accounts/database, cloud sync, support tickets/email, admin dashboard, ads, analytics and payments. The app must not claim these are live. `src/js/integrations.js` deliberately reports these as awaiting setup.

## Deploy to Vercel (static)

1. Upload the complete folder to a GitHub repository (not only `index.html`).
2. In Vercel, import that repository.
3. Framework preset: **Other**. Build command: leave empty. Output directory: `.`. Install command: leave empty.
4. Deploy. Open the generated URL on an Android phone and test onboarding, task creation, notes, flashcards, quizzes, timer, language/theme, export and delete.
5. Add your own custom domain only after the preview works.

`vercel.json` supplies security headers. Microphone access is intentionally disabled because voice is not implemented. No environment variables are required for this static MVP.

## Android publishing guide

See [`DEPLOY-ON-ANDROID.md`](DEPLOY-ON-ANDROID.md) for the phone-only GitHub → Vercel steps.

## Tests

- `node tests/unit.js`
- `node tests/smoke.js`
- `node --check src/js/app.js` (and other JS files)

## Privacy and terms

`privacy.html` and `terms.html` describe the current local-only preview. They are plain-language product notices, not legal advice or a substitute for jurisdiction-specific legal review. Revisit them before adding accounts, AI, voice, analytics, advertising, payments or cloud storage.

## Future integrations (not activated)

OpenAI calls must be server-side; never put an API key in browser JavaScript or commit it. Any account/billing, minors safeguards, provider terms, rate limits, data retention, consent and privacy requirements must be reviewed and approved before activation. Supabase requires per-user Row Level Security and cross-user access tests.


## Performance and scale notes

- The current MVP is a small static site: no framework runtime, no remote fonts, no images in the app shell, and no API/database requests. App data is stored locally in each visitor's browser. This keeps the initial client workload small, but it is not a measured guarantee for every 2 GB device or browser.
- App scripts use `defer` so the HTML parser is not blocked while they download. Vercel response headers allow shared-edge caching of static assets while requiring HTML revalidation. Vercel's platform handles transport compression; verify actual response headers after deployment.
- **One million concurrent visitors is not certified.** Static delivery may scale through the host's CDN, but capacity, quotas, bandwidth, request rates, deployment plan limits and regional behavior must be load-tested against the actual deployed domain. Do not run a million-user test from a personal phone.
- The current local-only MVP does not create a million-user database bottleneck because it does not have a shared database. Once AI, voice, authentication, analytics or cloud sync are enabled, each needs independent quotas, rate limits, queueing/connection pooling, abuse controls and load tests. AI/voice provider limits and cost may become the bottleneck before the website itself.
- Do not advertise “1,000,000 concurrent users supported” until an independent load test has demonstrated the target with acceptable latency and error rates, and the hosting/provider plan is sized for it.
