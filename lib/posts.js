import data from "@/data/articles.json";

export const posts = [...data].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug) => posts.find((p) => p.slug === slug) ?? null;
export const getOthers = (slug, n = 3) => posts.filter((p) => p.slug !== slug).slice(0, n);

export function formatDate(d, short = false) {
  const iso = d.length === 7 ? `${d}-01` : d;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: short ? "short" : "long", day: "numeric", timeZone: "UTC" });
}
export const readingMinutes = (p) => Math.max(1, Math.round(p.content.join(" ").split(/\s+/).length / 200));
