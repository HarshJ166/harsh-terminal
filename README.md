# harsh-jajal

Personal site of Harsh Jajal. The career is presented as an append-only event log, with engineering-drawing details.

- Next.js 16 (App Router), Tailwind CSS v4, `motion` for the few animations that need JS
- Content lives in `content/` (`profile.ts`, `log.ts`, `projects.ts`); edit those, not the components
- GitHub contribution calendar is fetched at build time and revalidated daily (`lib/github.ts`)

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build && pnpm start
```

Set `NEXT_PUBLIC_SITE_URL` in production so OG and sitemap URLs point at the real domain.

Fonts: IBM Plex Sans and IBM Plex Sans Condensed (OFL, via next/font/google), Commit Mono (OFL, self-hosted).

## Contact form → Google Sheets

Form submissions (hero panel and Contact section) go to `/api/contact`, which validates them,
filters bots (honeypot plus a per-IP rate limit) and forwards them to a Google Apps Script.
The script appends a row to the **Submissions** tab and emails `work.harsh268@gmail.com`.

One-time setup:

1. Open the sheet, then **Extensions → Apps Script**. Replace `Code.gs` with
   [`scripts/google-sheets-contact.gs`](scripts/google-sheets-contact.gs) and save.
2. **Project Settings (gear) → Script properties → Add**: `SHARED_SECRET` = the value of
   `SHEETS_WEBHOOK_SECRET` in your `.env.local`.
3. Back in the editor, pick the `setup` function and click **Run**. Approve the permission prompt
   (Google shows "unverified app" for personal scripts: Advanced → Go to project). This creates the tab.
4. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and
   copy the URL that ends in `/exec`.
5. Put that URL in `SHEETS_WEBHOOK_URL` in `.env.local`, and add both variables in
   **Vercel → Project → Settings → Environment Variables**. Redeploy.

After editing the script later, use **Deploy → Manage deployments → Edit → New version** so the
`/exec` URL stays the same.

If the variables are missing, the API answers 503 and the form offers a Gmail link instead.
