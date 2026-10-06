import Image from "next/image";
import Link from "next/link";
import Skyline from "@/components/Skyline";
import BioText from "@/components/BioText";
import { ArrowIcon } from "@/components/icons";
import { site, abs } from "@/data/site";
import { formatDate } from "@/lib/posts";

const p = site.profile;
const metaTitle = "About Julio Herrera Velutini | Banker and Founder";
const metaDescription = "Biography of Julio Herrera Velutini: born in Caracas in 1971, banker, founder of Britannia Financial Group, and custodian of a multigenerational financial legacy.";

const url = abs("/about");
const image = { url: "/images/julio-about.jpg", width: 960, height: 1200, alt: `Portrait of ${p.name}` };

export const metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: { canonical: "/about", languages: { "en-US": "/about", "en-GB": "/about", "en-AE": "/about", "x-default": "/about" } },
  openGraph: { type: "profile", url: "/about", siteName: site.name, locale: site.locales.primary, alternateLocale: site.locales.alternates, title: metaTitle, description: metaDescription, firstName: "Julio", lastName: "Herrera Velutini", gender: "male", images: [image] },
  twitter: { card: "summary_large_image", title: metaTitle, description: metaDescription, images: [{ url: image.url, alt: image.alt }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${url}#profilepage`,
      url,
      name: metaTitle,
      description: metaDescription,
      dateModified: p.lastUpdated,
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${site.url}/#person` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}${image.url}`, width: image.width, height: image.height },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "About", item: url },
      ],
    },
  ],
};

const crumbs = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];
const wrap = "mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10";
const label = "text-[10px] font-medium uppercase tracking-[0.18em]";
const h2 = "font-extrabold uppercase leading-[0.95] tracking-[-0.03em]";

// Swap these images for your own in /public/images/values/
const values = [
  { title: "Finance", text: "Long-term approach to global markets and institutional growth.", image: "/images/values/finance.webp" },
  { title: "Culture", text: "Support for cultural heritage and artistic initiatives.", image: "/images/values/culture.webp" },
  { title: "Family", text: "A seventh-generation tradition of banking and stewardship.", image: "/images/values/family.webp" },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1 · Hero */}
      <section className="relative flex flex-col overflow-hidden bg-ink text-white lg:min-h-[560px]">
        <Skyline seed={9} className="absolute inset-x-0 bottom-0 h-[75%] w-full opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className={`${wrap} relative z-10 w-full`}>
          <nav aria-label="Breadcrumb" className={`${label} pt-8 text-white/60`}>
            <ol className="flex items-center gap-2"><li><Link href="/" className="hover:text-white">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="font-semibold text-white">About</li></ol>
          </nav>
          <div className="max-w-[560px] pb-10 pt-12 lg:pb-20 lg:pt-14">
            <p className={`${label} text-white/70`}>About</p>
            <h1 className="mt-5 text-[clamp(3rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">Julio<br />Herrera<br />Velutini</h1>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.3em]">Banker. Entrepreneur. Philanthropist.</p>
            <p className="mt-6 max-w-[500px] text-[14px] leading-[1.7] text-white/75">{p.summary}</p>
            <div className="mt-8 flex items-center gap-5">
              <span aria-hidden="true" className="h-px w-8 bg-white" />
              <a href="#biography" className="border border-white/60 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-ink">View full biography →</a>
            </div>
          </div>
        </div>
        <div className="relative z-0 h-[360px] w-full sm:h-[440px] lg:absolute lg:bottom-0 lg:right-0 lg:h-[92%] lg:w-[52%]">
          <Image src="/story-man.png" alt={`Portrait of ${p.name}`} fill priority sizes="(min-width:1024px) 52vw, 100vw" className="object-contain object-bottom lg:object-right-bottom" />
        </div>
      </section>

      {/* 2 · At a glance */}
      <section aria-label="At a glance" className="border-b border-ink/10 bg-[#EFEDE9]">
        <dl className={`${wrap} grid gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-5`}>
          {p.facts.map((f) => (
            <div key={f.label} className="lg:border-l lg:border-ink/15 lg:px-7 lg:first:border-l-0 lg:first:pl-0">
              <dt className="text-[9px] font-medium uppercase tracking-[0.16em] text-ink/55">{f.label}</dt>
              <dd className="mt-2.5 max-w-[190px] text-[13px] font-bold leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3 · Biography */}
      <section id="biography" aria-labelledby="bio" className="scroll-mt-4 bg-paper">
        <div className={`${wrap} grid items-center gap-10 py-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-16`}>
          <div className="relative aspect-[4/4.4] w-full overflow-hidden bg-ink">
            <Image src="/images/julio-bio.webp" alt={`${p.name} in a dark suit`} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className={`${label} text-ink/60`}>Biography</p>
            <h2 id="bio" className={`${h2} mt-4 text-[clamp(2.2rem,4.6vw,3.75rem)]`}>A global banker<br />and entrepreneur</h2>
            <BioText paragraphs={p.bio} />
          </div>
        </div>
      </section>

      {/* 4 · Timeline */}
      <section id="timeline" aria-labelledby="tl" className="bg-ink text-white">
        <div className={`${wrap} py-14 lg:py-20`}>
          <p className={`${label} text-white/70`}>Key milestones</p>
          <h2 id="tl" className={`${h2} mt-3 text-[clamp(2.4rem,5vw,3.75rem)]`}>Timeline</h2>
          <ol className="relative mt-10 before:absolute before:bottom-5 before:left-[4px] before:top-5 before:w-px before:bg-white/25">
            {p.timeline.map((t) => (
              <li key={t.when + t.what} className="relative pl-10 sm:pl-14">
                <span aria-hidden="true" className="absolute left-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 bg-white" />
                <div className="grid gap-1 border-b border-white/15 py-4 sm:grid-cols-[120px_1fr] sm:items-center sm:gap-8 lg:grid-cols-[130px_1fr]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em]">{t.when}</p>
                  <p className="text-[13px] leading-relaxed text-white/85">
                    {t.slug ? <Link href={`/news/${t.slug}`} className="underline-offset-4 hover:underline">{t.what}</Link> : t.what}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Legacy and values */}
      <section aria-labelledby="legacy" className="bg-paper">
        <div className={`${wrap} grid gap-10 py-14 lg:grid-cols-[340px_1fr] lg:gap-14 lg:py-16`}>
          <div>
            <p className={`${label} text-ink/60`}>Legacy and values</p>
            <h2 id="legacy" className={`${h2} mt-4 text-[clamp(2.2rem,4vw,3.25rem)]`}>Legacy<br />and values</h2>
            <p className="mt-6 text-[13px] leading-[1.75] text-ink/75">{p.bio[3]}</p>
            <Link href="/news" className="mt-8 inline-block bg-ink px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/85">Learn more →</Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="bg-[#F3F1EE]">
                <div className="relative aspect-[1/1] overflow-hidden bg-ink sm:aspect-[4/4.2]">
                  <Image src={v.image} alt="" fill sizes="(min-width:1024px) 22vw, (min-width:640px) 30vw, 100vw" className="object-cover grayscale" />
                </div>
                <div className="px-5 pb-8 pt-5">
                  <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em]">{v.title}</h3>
                  <span aria-hidden="true" className="mt-2 block h-px w-5 bg-ink" />
                  <p className="mt-4 text-[12px] leading-relaxed text-ink/70">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 · Sources */}
      <section id="sources" aria-labelledby="src" className="border-t border-ink/15 bg-paper">
        <div className={`${wrap} grid gap-8 py-14 lg:grid-cols-[340px_1fr] lg:gap-14 lg:py-16`}>
          <div>
            <p className={`${label} text-ink/60`}>References</p>
            <h2 id="src" className={`${h2} mt-4 text-[clamp(2.2rem,4vw,3.25rem)]`}>Sources</h2>
          </div>
          <div>
            <ul className="divide-y divide-ink/15 border-y border-ink/15">
              {p.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 py-4 text-[13px] font-semibold">
                    <span className="underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">{s.name}</span>
                    <ArrowIcon width={16} height={16} className="shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] text-ink/60">Page last updated {formatDate(p.lastUpdated)}. Questions about {p.name}? Use the <Link href="/contact" className="underline underline-offset-4">contact page</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
