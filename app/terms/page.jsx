import PageHero from "@/components/PageHero";
import { site, abs } from "@/data/site";
import { formatDate } from "@/lib/posts";

const title = "Terms of Use | Julio Herrera Velutini";
const description = "Terms for using the Julio Herrera Velutini website, including how articles are sourced and how to request corrections.";
const url = abs("/terms");
const updated = "2026-10-01";
const image = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: `${site.name} official website` };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", siteName: site.name, locale: site.locale, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
};

const crumbs = [{ name: "Home", href: "/" }, { name: "Terms of Use", href: "/terms" }];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "en",
      dateModified: updated,
      isPartOf: { "@id": `${site.url}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
    },
  ],
};

const sections = [
  { h: "Information only", p: "Content on this site is for general information. It is not legal, financial or investment advice." },
  { h: "Sources and attribution", p: "Articles link to supporting sources. Press releases and affiliated websites are identified by source and are not presented as independent verification. See the Editorial Policy for the full publishing standard." },
  { h: "Corrections", p: "If something is inaccurate, send a correction request through the contact page, with the article address and the source that supports the change." },
  { h: "Third-party content", p: "Linked articles belong to their publishers. This site is not responsible for outside content." },
  { h: "Copyright", p: "Text and design on this site are protected. Short quotations with a link back are welcome." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={crumbs} title="Terms of Use" intro="The rules for using this website." />
      <section className="bg-paper">
        <div className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 lg:py-20">
          {sections.map((s) => (
            <div key={s.h} className="border-b border-ink/10 py-7 first:pt-0">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.12em]">{s.h}</h2>
              <p className="mt-3 text-[16px] leading-[1.8] text-ink/80">{s.p}</p>
            </div>
          ))}
          <p className="mt-8 text-[12px] text-ink/60">Last updated {formatDate(updated)}.</p>
        </div>
      </section>
    </>
  );
}
