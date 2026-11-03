# Publish LUMIQ from an Android phone

This guide publishes the **static public MVP only**. AI Tutor, Live Voice, accounts and cloud sync remain disabled.

## 1. Put the complete project on GitHub

1. Open GitHub in your browser and sign in to the account that will own the repository.
2. Create a new repository named `lumiq-study-platform`.
3. Keep it private while reviewing the project. Do not upload `.env` files or API keys.
4. Upload the **contents** of this folder, preserving the `src/` and `tests/` folders. The repository root must contain `index.html`, `vercel.json`, `privacy.html`, `terms.html`, `favicon.svg`, `README.md`, and `src/`.
5. Confirm `.env.example` contains placeholders only. Never add real secrets.

## 2. Import into Vercel

1. Open Vercel and sign in to the account that will own the deployment.
2. Choose **Add New → Project**, then import `lumiq-study-platform` from GitHub.
3. Select **Other** as the framework preset.
4. Leave Build Command empty; leave Install Command empty; set Output Directory to `.`.
5. Deploy. No environment variables are needed for this static MVP.

## 3. Verify the public URL

Open the generated `vercel.app` URL on your phone and test:

- Landing page and both legal links
- Onboarding and language selection
- Planner: add and complete a task
- Notes: create, edit, preview and search
- Flashcards: create and review
- Quizzes: create, take and review results
- Focus timer: start, pause, resume and complete a short test session
- Revision planner and invalid exam date rejection
- Export and delete local data
- Light/dark theme and larger text

If a check fails, do not announce the site as ready; report the failing step and fix it first.

## Important

This preview stores study data only in each visitor's browser. It has no account, cloud backup or cross-device sync. Visitors may lose data if browser storage is cleared. Do not promise AI tutoring or voice calls until those integrations are actually configured, tested and enabled.


## Performance verification after deployment

1. Open the deployed URL on a 2 GB RAM Android device in Chrome. Test onboarding, navigation, note editing, flashcards, quizzes, timer and export. Close other tabs first; repeat after a cold browser start.
2. In browser dev tools (or a trusted web performance test service), check the mobile Lighthouse report and confirm no missing assets or console errors.
3. Verify `/src/js/app.js` and `/src/styles.css` response headers include shared-cache policy. Confirm HTML is revalidated after a new deployment.
4. A real concurrent-user test requires a controlled load-testing service and a hosting plan that permits the test. Start small and ramp gradually; do not target 1,000,000 users without written capacity approval from the host and a budget.
