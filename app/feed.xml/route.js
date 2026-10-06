import { posts } from "@/lib/posts";
import { site, abs } from "@/data/site";

export const dynamic = "force-static";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = posts.map((a) => `<item>
<title>${esc(a.title)}</title>
<link>${abs(`/news/${a.slug}`)}</link>
<guid isPermaLink="true">${abs(`/news/${a.slug}`)}</guid>
<pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>
<description>${esc(a.description)}</description>
</item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)} official blog</title>
<link>${abs("/news")}</link>
<description>${esc(site.description)}</description>
<language>en</language>
<atom:link href="${abs("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
