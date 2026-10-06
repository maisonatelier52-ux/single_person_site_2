import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site, abs } from "@/data/site";
import { formatDate } from "@/lib/posts";

const title = `Editorial Policy | ${site.name}`;
const description = `Authorship, sourcing, corrections and publishing standards for the official ${site.name} blog.`;
const url = abs("/editorial-policy");
const updated = "2026-10-06";
const image = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: `${site.name} official website` };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: { type: "website", url: "/editorial-policy", siteName: site.name, locale: site.locale, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
};

const crumbs = [{ name: "Home", href: "/" }, { name: "Editorial Policy", href: "/editorial-policy" }];

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
      about: { "@id": `${site.url}/#publisher` },
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
  {
    heading: "Purpose and scope",
    body: "This is the official website and blog of Julio Herrera Velutini. It publishes a curated selection of biography, commentary and updates; it is not an independent newsroom or a comprehensive record of every external publication.",
  },
  {
    heading: "Authorship and review",
    body: `Articles are published by ${site.publisherName}. Every article must be reviewed for factual accuracy, sourcing, spelling and clear attribution before publication. A named contributor may be added when an individual author is responsible for a piece.`,
  },
  {
    heading: "Sources",
    body: "Material factual claims should be supported by primary records or clearly identified, reputable published sources. Press releases and affiliated websites are labelled by source and are not presented as independent verification.",
  },
  {
    heading: "Dates and updates",
    body: "Publication dates reflect when an article first appeared. The updated date changes only after a substantive correction, clarification or addition, not simply to make an article appear new.",
  },
  {
    heading: "Images",
    body: "Images must be licensed for publication and accurately identify the people, places and events described. Illustrations or edited imagery should be labelled when their nature may not be obvious.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={crumbs} label="Trust and transparency" title="Editorial Policy" intro="How the official blog handles authorship, sourcing, updates and corrections." />
      <section className="bg-paper">
        <div className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 lg:py-20">
          {sections.map((section) => (
            <div key={section.heading} className="border-b border-ink/10 py-7 first:pt-0">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.12em]">{section.heading}</h2>
              <p className="mt-3 text-[16px] leading-[1.8] text-ink/80">{section.body}</p>
            </div>
          ))}
          <div className="mt-9 border border-ink/15 bg-white/50 p-6">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.12em]">Corrections</h2>
            <p className="mt-3 text-[16px] leading-[1.8] text-ink/80">Send the article URL, the statement that should be reviewed and a supporting source through the <Link href="/contact" className="underline underline-offset-4">contact page</Link>. Material corrections should be reflected in the article and its updated date.</p>
          </div>
          <p className="mt-8 text-[12px] text-ink/60">Last updated {formatDate(updated)}.</p>
        </div>
      </section>
    </>
  );
}
