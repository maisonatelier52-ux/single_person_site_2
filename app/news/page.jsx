import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { posts, formatDate, readingMinutes } from "@/lib/posts";
import { site, abs } from "@/data/site";

const title = `News about ${site.name} | Latest Coverage and Sources`;
const description = `Latest news about ${site.name}: banking, Britannia Financial Group, the Herrera Velutini family legacy and philanthropy. Every article links to its sources.`;
const url = abs("/news");
const image = { url: posts[0].image, width: posts[0].imageWidth, height: posts[0].imageHeight, alt: posts[0].imageAlt };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/news",
    languages: { "en-US": "/news", "en-GB": "/news", "en-AE": "/news", "x-default": "/news" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} news` }] },
  },
  openGraph: { type: "website", url: "/news", siteName: site.name, locale: site.locales.primary, alternateLocale: site.locales.alternates, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
};

const crumbs = [{ name: "Home", href: "/" }, { name: "News", href: "/news" }];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#person` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#list` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}#list`,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/news/${p.slug}`), name: p.title })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
    },
  ],
};

export default function NewsPage() {
  const [lead, ...rest] = posts;
  const tags = [...new Set(posts.flatMap((p) => p.tags))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={crumbs} label="News" title={`News about ${site.name}`} intro="Coverage and public record, newest first. Each article is written from published reporting and links to its sources.">
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics covered">
          {tags.map((t) => (<li key={t} className="border border-white/25 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/80">{t}</li>))}
        </ul>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          {/* Featured */}
          <article className="grid overflow-hidden bg-ink text-white lg:grid-cols-[1.25fr_1fr]">
            <Link href={`/news/${lead.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <Image src={lead.image} alt="" fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/40" />
            </Link>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">Latest · {lead.tags[0]}</p>
              <h2 className="mt-4 text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.01em]"><Link href={`/news/${lead.slug}`}>{lead.title}</Link></h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/70">{lead.description}</p>
              <p className="mt-5 text-[11px] tracking-[0.06em] text-white/55"><time dateTime={lead.date}>{formatDate(lead.date)}</time> · {readingMinutes(lead)} min read</p>
              <Link href={`/news/${lead.slug}`} className="mt-7 inline-block self-start bg-paper px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white">Read article →</Link>
            </div>
          </article>

          <div className="mt-14 flex items-center justify-between border-b border-ink/15 pb-4">
            <h2 className="text-base font-bold uppercase tracking-[0.12em]">All articles</h2>
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink/60">{posts.length} articles</p>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (<NewsCard key={p.slug} post={p} />))}
          </ul>
        </div>
      </section>
    </>
  );
}
