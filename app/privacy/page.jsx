import PageHero from "@/components/PageHero";
import { site, abs } from "@/data/site";
import { formatDate } from "@/lib/posts";

const title = "Privacy Policy | Julio Herrera Velutini";
const description = "How the Julio Herrera Velutini website handles visitor data, email requests and external links.";
const url = abs("/privacy");
const updated = "2026-10-01";
const image = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: `${site.name} official website` };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/privacy", languages: { "en-US": "/privacy", "en-GB": "/privacy", "en-AE": "/privacy", "x-default": "/privacy" } },
  openGraph: { type: "website", url: "/privacy", siteName: site.name, locale: site.locales.primary, alternateLocale: site.locales.alternates, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
};

const crumbs = [{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }];

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
  { h: "What this site collects", p: "The site itself does not set tracking cookies or run advertising scripts. Your hosting provider may keep standard server logs, such as IP address and pages requested, for security and reliability." },
  { h: "Contact and update requests", p: "The contact form and the update sign-up open your own email app with a prepared message. Nothing is sent until you press send in that app. Messages go to the address shown on the contact page and are used only to reply to you or to add you to the updates list." },
  { h: "External links", p: "Articles link to outside news sites and documents. Those sites have their own privacy practices, which this site does not control." },
  { h: "Your choices", p: "To ask what is held about you, or to be removed from the updates list, write to the address on the contact page." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={crumbs} title="Privacy Policy" intro="Plain-language summary of how visitor information is handled." />
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
