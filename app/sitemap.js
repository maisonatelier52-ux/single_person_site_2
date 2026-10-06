import { site } from "@/data/site";
import { posts } from "@/lib/posts";

export default function sitemap() {
  const pages = [
    { path: "", priority: 1, changeFrequency: "daily", lastModified: posts[0]?.updated || site.profile.lastUpdated },
    { path: "/about", priority: 0.9, changeFrequency: "monthly", lastModified: site.profile.lastUpdated },
    { path: "/news", priority: 0.8, changeFrequency: "daily", lastModified: posts[0]?.updated || site.profile.lastUpdated },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly", lastModified: site.profile.lastUpdated },
    { path: "/editorial-policy", priority: 0.4, changeFrequency: "yearly", lastModified: "2026-10-06" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly", lastModified: "2026-10-01" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly", lastModified: "2026-10-01" },
  ].map(({ path, ...rest }) => ({ url: `${site.url}${path}`, ...rest }));

  const articles = posts.map((p) => ({
    url: `${site.url}/news/${p.slug}`,
    lastModified: p.updated || p.date,
    changeFrequency: "weekly",
    priority: 0.7,
    images: [`${site.url}${p.image}`],
  }));
  return [...pages, ...articles];
}
