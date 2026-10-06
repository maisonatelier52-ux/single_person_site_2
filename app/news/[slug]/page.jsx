import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Skyline from "@/components/Skyline";
import StickySidebar from "@/components/StickySidebar";
import ReadingProgress from "@/components/ReadingProgress";
import NewsCard from "@/components/NewsCard";
import { ArrowIcon } from "@/components/icons";
import { posts, getPost, getOthers, formatDate, readingMinutes } from "@/lib/posts";
import { site, abs } from "@/data/site";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getPost(slug);
  if (!a) return {};
  const path = `/news/${a.slug}`;
  const title = a.metaTitle || a.title;
  const description = a.metaDescription || a.description;
  const image = { url: a.image, width: a.imageWidth, height: a.imageHeight, alt: a.imageAlt || a.title };
  return {
    title: { absolute: title },
    description,
    authors: [{ name: site.publisherName, url: "/editorial-policy" }],
    alternates: { canonical: path },
    openGraph: {
      type: "article", url: path, siteName: site.name, locale: site.locale,
      title, description, images: [image],
      publishedTime: `${a.date}T00:00:00Z`, modifiedTime: `${a.updated || a.date}T00:00:00Z`, section: a.tags[0], tags: a.tags, authors: [site.publisherName],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

const box = "mx-auto max-w-[1200px] px-5 sm:px-8";
const sideTitle = "text-[12px] font-extrabold uppercase tracking-[0.12em]";

function SideHeading({ children }) {
  return (<><h2 className={sideTitle}>{children}</h2><span aria-hidden="true" className="mt-2 block h-px w-8 bg-ink" /></>);
}

export default async function Article({ params }) {
  const { slug } = await params;
  const a = getPost(slug);
  if (!a) notFound();
  const others = getOthers(a.slug, 3);
  const crumbs = [{ name: "Home", href: "/" }, { name: "News", href: "/news" }, { name: a.title, href: `/news/${a.slug}` }];
  const shareUrl = encodeURIComponent(`${site.url}/news/${a.slug}`);
  const [first, ...rest] = a.content;
  const url = abs(`/news/${a.slug}`);
  const wordCount = a.content.join(" ").split(/\s+/).length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: a.metaTitle || a.title,
        description: a.metaDescription || a.description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#article` },
        primaryImageOfPage: { "@type": "ImageObject", url: abs(a.image), width: a.imageWidth, height: a.imageHeight },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
      },
      {
        "@type": a.contentType || "BlogPosting",
        "@id": `${url}#article`,
        headline: a.title,
        alternativeHeadline: a.metaTitle || undefined,
        description: a.metaDescription || a.description,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image: [{ "@type": "ImageObject", url: abs(a.image), width: a.imageWidth, height: a.imageHeight, caption: a.imageAlt }],
        thumbnailUrl: abs(a.image),
        datePublished: `${a.date}T00:00:00Z`,
        dateModified: `${a.updated || a.date}T00:00:00Z`,
        author: { "@id": `${site.url}/#publisher` },
        publisher: { "@id": `${site.url}/#publisher` },
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#person` },
        mentions: [{ "@id": `${site.url}/#britannia` }, { "@id": `${site.url}/#banvelca` }],
        articleSection: a.tags[0],
        keywords: a.tags.join(", "),
        wordCount,
        timeRequired: `PT${readingMinutes(a)}M`,
        inLanguage: "en",
        isAccessibleForFree: true,
        citation: a.sources.map((src) => ({ "@type": "CreativeWork", name: src.name, url: src.url })),
      },
    ],
  };
  const toc = [["Overview", "#overview"], ["Full story", "#story"], ["Sources", "#sources"], ["Related coverage", "#related"]];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ReadingProgress />

      {/* Title band */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Skyline seed={9} className="absolute inset-x-0 bottom-0 h-[80%] w-full opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className={`${box} relative pb-8 pt-7 lg:pb-10`}>
          <nav aria-label="Breadcrumb" className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/news" className="hover:text-white">News</Link></li><li aria-hidden="true">/</li>
              <li aria-current="page" className="min-w-0 truncate">{a.title}</li>
            </ol>
          </nav>
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.2em]">{a.tags[0]}</p>
          <span aria-hidden="true" className="mt-2 block h-px w-12 bg-white/70" />
          <h1 className="mt-5 max-w-[920px] text-[clamp(1.9rem,4.6vw,3.6rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-balance">{a.title}</h1>
          <p className="mt-6 text-[12px] tracking-[0.04em] text-white/65">
            By <Link href="/editorial-policy" className="underline decoration-white/35 underline-offset-4 hover:decoration-white">{site.publisherName}</Link>
            <span aria-hidden="true" className="mx-2">•</span>
            <time dateTime={a.date}>{formatDate(a.date, true)}</time>
            <span aria-hidden="true" className="mx-2">•</span> {readingMinutes(a)} min read
          </p>
        </div>
      </section>

      {/* Image straddling the dark band */}
      <div className="bg-[linear-gradient(to_bottom,#0B0B0B_50%,#EBE9E5_50%)]">
        <div className={box}>
          <figure className="relative aspect-[16/10] overflow-hidden bg-ink sm:aspect-[2.6/1]">
            <Image src={a.image} alt={a.imageAlt || ""} fill priority sizes="(min-width:1200px) 1136px, 100vw" className="anim-kenburns object-cover object-center grayscale" />
          </figure>
        </div>
      </div>

      {/* Body */}
      <div className="bg-paper">
        <div className={`${box} grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-0 lg:py-14`}>
          <div className="min-w-0 lg:border-r lg:border-ink/15 lg:pr-12">
            <p id="overview" className="scroll-mt-6 font-serif text-[clamp(1.35rem,2.6vw,1.75rem)] leading-[1.35]">{a.description}</p>
            <aside aria-label="Source note" className="mt-6 border-l-2 border-ink bg-white/50 px-5 py-4 text-[12px] leading-relaxed text-ink/70">
              <span className="font-bold uppercase tracking-[0.1em] text-ink">Source note:</span>{" "}
              This article draws on {a.sources.slice(0, 2).map((source, index) => (
                <span key={source.url}>{index > 0 ? " and " : ""}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.name}</a></span>
              ))}. The complete source list appears below.
            </aside>
            <hr className="my-8 border-ink/20" />

            <div id="story" className="scroll-mt-6 space-y-5 text-[15px] leading-[1.8] text-ink/85">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[5rem] first-letter:font-medium first-letter:leading-[0.78]">{first}</p>
              {rest.map((para, i) => (<p key={i}>{para}</p>))}
            </div>

            <section id="sources" aria-labelledby="sources-h" className="mt-12 scroll-mt-6 border-t border-ink/20 pt-6">
              <h2 id="sources-h" className="text-[11px] font-extrabold uppercase tracking-[0.14em]">Sources</h2>
              <ul className="mt-3 divide-y divide-ink/15 border-t border-ink/15">
                {a.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 py-3">
                      <span>
                        <span className="font-serif text-[15px] group-hover:underline">{s.name}</span>
                        {s.note && <span className="mt-0.5 block text-[12px] text-ink/55">{s.note}</span>}
                      </span>
                      <ArrowIcon width={16} height={16} className="mt-1 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
              <span className="text-ink/55">Share</span>
              <a href={`https://x.com/intent/post?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="border-b border-ink pb-0.5">X</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="border-b border-ink pb-0.5">LinkedIn</a>
              <a href={`mailto:?subject=${encodeURIComponent(a.title)}&body=${shareUrl}`} className="border-b border-ink pb-0.5">Email</a>
            </div>
            <p className="mt-8 text-[11px] leading-relaxed text-ink/55">Spotted an error? Send a correction request with the source through the <Link href="/contact" className="underline underline-offset-4">contact page</Link>. Last updated {formatDate(a.updated || a.date)}.</p>
          </div>

          {/* Sidebar */}
          <aside className="lg:pl-12">
            <StickySidebar className="space-y-6">
            <section aria-labelledby="kf">
              <h2 id="kf" className={sideTitle}>Key facts</h2>
              <span aria-hidden="true" className="mt-2 block h-px w-8 bg-ink" />
              <dl className="mt-4 divide-y divide-ink/15 border-t border-ink/15">
                {a.keyFacts.map((k) => (<div key={k} className="py-3 text-[12px] leading-relaxed text-ink/80"><dd>{k}</dd></div>))}
                <div className="grid grid-cols-[80px_1fr] gap-3 py-3 text-[12px]"><dt className="pt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink/55">Date</dt><dd>{formatDate(a.date)}</dd></div>
                <div className="grid grid-cols-[80px_1fr] gap-3 py-3 text-[12px]"><dt className="pt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink/55">Topics</dt><dd>{a.tags.join(", ")}</dd></div>
              </dl>
            </section>

            <section aria-labelledby="ab" className="border-t border-ink/20 pt-6">
              <h2 id="ab" className={sideTitle}>About Julio Herrera Velutini</h2>
              <span aria-hidden="true" className="mt-2 block h-px w-8 bg-ink" />
              <div className="relative mt-4 aspect-[16/7] overflow-hidden bg-[linear-gradient(90deg,#6f6f6f,#b9b9b9)]">
                <Image src="/story-man.webp" alt="" fill sizes="330px" className="object-cover object-top" />
              </div>
              <p className="mt-4 text-[12px] leading-[1.7] text-ink/80">{site.profile.summary}</p>
              <Link href="/about" className="mt-4 inline-block border-b border-ink pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]">Read full biography →</Link>
            </section>

            <nav aria-labelledby="toc" className="border-t border-ink/20 pt-6">
              <h2 id="toc" className={sideTitle}>In this article</h2>
              <ol className="mt-4 divide-y divide-ink/15 border-y border-ink/15 text-[12px]">
                {toc.map(([t, href], i) => (
                  <li key={t}><a href={href} className="grid grid-cols-[28px_1fr] gap-2 py-3 transition-colors hover:text-ink/60"><span className="text-[10px] text-ink/50">{String(i + 1).padStart(2, "0")}</span>{t}</a></li>
                ))}
              </ol>
            </nav>

            </StickySidebar>
          </aside>
        </div>
      </div>

      {/* Related coverage — white background */}
      <section id="related" aria-labelledby="rel" className="scroll-mt-4 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:py-16">
          <div className="flex items-center justify-between">
            <h2 id="rel" className="text-base font-bold uppercase tracking-[0.12em]">Related coverage</h2>
            <Link href="/news" className="text-[10px] font-medium uppercase tracking-[0.12em] underline-offset-4 hover:underline">View all articles</Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (<NewsCard key={p.slug} post={p} />))}
          </ul>
        </div>
      </section>
    </>
  );
}
