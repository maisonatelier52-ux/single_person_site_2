import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { MailIcon, ClockIcon, GroupIcon } from "@/components/icons";
import { site, abs } from "@/data/site";

const title = `Contact ${site.name} | Media Inquiries and Corrections`;
const description = "Media inquiries, interview requests and correction requests for Julio Herrera Velutini. Contact the official website team by email.";
const url = abs("/contact");
const image = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: `Contact ${site.name}` };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact", languages: { "en-US": "/contact", "en-GB": "/contact", "en-AE": "/contact", "x-default": "/contact" } },
  openGraph: { type: "website", url: "/contact", siteName: site.name, locale: site.locales.primary, alternateLocale: site.locales.alternates, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
};

const crumbs = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#person` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@type": "ContactPoint", contactType: "media inquiries", email: site.email, availableLanguage: ["English"] },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
    },
  ],
};

export default function ContactPage() {
  const socials = Object.entries(site.socials).filter(([, u]) => u);
  const cards = [
    { Icon: MailIcon, title: "Email", body: <a href={`mailto:${site.email}`} className="break-all underline underline-offset-4">{site.email}</a> },
    { Icon: ClockIcon, title: "Media inquiries", body: "Include your outlet, your deadline and the questions you want answered. Requests that name a specific article should include its web address." },
    { Icon: GroupIcon, title: "Corrections", body: "If something is inaccurate, send the article address and the source that supports the change." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={crumbs} label="Contact" title="Get in touch" intro="For interviews, press questions and corrections to anything published on this site." />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[420px_1fr] lg:gap-16 lg:px-10 lg:py-20">
          <div className="space-y-5">
            {cards.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-5 bg-ink p-6 text-white">
                <Icon width={30} height={30} className="shrink-0" />
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.12em]">{title}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/70">{body}</p>
                </div>
              </div>
            ))}
            {socials.length > 0 && (
              <div id="profiles" className="border border-ink/15 p-6">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.12em]">Official profiles</h2>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                  {socials.map(([k, u]) => (<li key={k}><a href={u} rel="me noopener noreferrer" target="_blank" className="capitalize underline underline-offset-4">{k}</a></li>))}
                </ul>
              </div>
            )}
          </div>
          <ContactForm email={site.email} />
        </div>
      </section>
    </>
  );
}
