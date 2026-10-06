# Julio Herrera Velutini official site and blog

A statically rendered Next.js site for the biography, official updates and selected articles of Julio Herrera Velutini.

## Local development

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

For local development, replace the example values in `.env.local` with:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=press@localhost.invalid
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

## Required production configuration

Set these environment variables in the hosting provider before running a production build:

- `NEXT_PUBLIC_SITE_URL`: the one canonical HTTPS origin, without a trailing slash.
- `NEXT_PUBLIC_CONTACT_EMAIL`: the public media/corrections address.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: optional Search Console verification token.

Production builds intentionally fail if the canonical origin or contact email is missing or still uses an example value. Configure permanent redirects so every HTTP, www/non-www or previous-domain variation resolves to the chosen canonical origin.

## Content

- `data/profile.json`: biography, current facts, timeline and About-page sources.
- `data/articles.json`: blog and selected news articles.
- `data/site.js`: canonical origin, publisher identity and verified external profiles.
- `public/images/`: portraits, social images and article images.

Only add verified official social-profile URLs to `site.socials`. Replace any temporary or stylized portrait with an authenticated, licensed image before public launch.

## Routes

- `/`: official homepage.
- `/about`: sourced biography and timeline.
- `/news`: official blog index. The URL is retained for link stability even though the navigation label is “Blog.”
- `/news/[slug]`: one article per URL.
- `/editorial-policy`: authorship, sourcing, image and correction standards.
- `/contact`: media inquiries and corrections.
- `/privacy` and `/terms`: policy pages.
- `/feed.xml`, `/sitemap.xml` and `/robots.txt`: discovery endpoints.

## Editorial and SEO rules

- Use `BlogPosting` for evergreen commentary and `NewsArticle` only for time-sensitive reporting.
- Keep a visible publisher or real named-author byline that matches the structured data.
- Support material claims with primary records or clearly identified reputable sources.
- Change an article's updated date only after a substantive edit.
- Do not create cloned US, UK or UAE pages. Add regional URLs and `hreflang` only when the pages contain genuinely localized content.
- Keep the exact name prominent on Home and About, but write article titles for readers rather than repeating the same keyword formula.
- Use one official domain and consolidate any controlled duplicate domains with permanent redirects.

## Launch checklist

1. Add the real domain, email and verified social URLs.
2. Confirm every biography claim and image license.
3. Run `npm run build` and `npm audit --omit=dev`.
4. Test generated canonicals, sitemap and structured data against the production URL.
5. Verify a DNS-domain property in Google Search Console and submit `/sitemap.xml`.
6. Inspect Home, About, Blog and the strongest articles with URL Inspection.
7. Monitor indexing, Core Web Vitals and query performance by country.
