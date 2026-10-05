# Julio Herrera Velutini – official website (Next.js + Tailwind CSS)

```bash
npm install
cp .env.example .env.local   # set your real domain and contact email
npm run dev                  # http://localhost:3000
```

## Content
- `data/profile.json` – biography, facts, timeline, sources (About page + home)
- `data/articles.json` – all news articles (shown on `/news` and `/news/[slug]`)
- `data/site.js` – site settings, official social profile URLs (hidden until filled)
- `public/images/news/` – article images

## Routes
`/` · `/about` · `/news` · `/news/[slug]` · `/contact` · `/privacy` · `/terms` · `/feed.xml` · `/sitemap.xml` · `/robots.txt`

## SEO (all inside the page files)
Each `page.jsx` exports its own `metadata` (title, description, canonical, hreflang for en-US / en-GB / en-AE, openGraph, twitter) and renders its own JSON-LD `<script>`. There are no separate JSON-LD / OpenGraph / Twitter components.
- `app/layout.jsx` – site-wide defaults + WebSite, Person, Britannia Financial Group and Banvelca JSON-LD (pages link to these by `@id`)
- `app/sitemap.js`, `app/robots.js`, `app/feed.xml/route.js`, `public/llms.txt`

### Before launch
1. Set `NEXT_PUBLIC_SITE_URL` to the real domain (the placeholder `www.example.com` must not go live).
2. Fill `socials` in `data/site.js` with real official profiles; check the `sameAs` Wikipedia URL exists.
3. Add the site in Google Search Console, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, submit `/sitemap.xml`.
4. Publish new articles regularly (add to `data/articles.json` with `imageWidth` / `imageHeight`).
