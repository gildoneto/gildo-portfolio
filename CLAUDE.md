@AGENTS.md

## Analytics

This project uses **Vercel Web Analytics** (`@vercel/analytics`) — **not** Google Analytics or Firebase Analytics.

- `<Analytics />` (from `@vercel/analytics/next`) is mounted in `app/layout.tsx`, and Web Analytics is enabled in the Vercel project dashboard.
- It is **cookieless by design** (LGPD/GDPR + privacy), so there is **no consent banner**. Do **not** re-add GA4 / `gtag.js` or any cookie-based tracker without first adding a consent banner. The old GA4 `<Script>` tags were intentionally removed.
- Custom events use `track()` from `@vercel/analytics`. Tracked so far: **`resume_download`** with `{ lang }` payload — fired on successful PDF download in `app/resume/ResumeContent.tsx` (`handleDownload`).
- **Firebase** (`app/lib/firebase.ts`) is used **only for Firestore + Auth**; `getAnalytics()` is intentionally never called. `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` was removed from the codebase (`firebase.ts`, `.env.example`, `.env.local`) because it was unused — **do not reintroduce it**.
