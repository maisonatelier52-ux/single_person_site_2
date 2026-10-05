import Hero from "@/components/Hero";
import QuickLinks from "@/components/QuickLinks";
import Intro from "@/components/Intro";
import Perks from "@/components/Perks";
import News from "@/components/News";
import { posts } from "@/lib/posts";
import { site } from "@/data/site";

const title = "Julio Herrera Velutini | Official Website: Banker and Entrepreneur";
const description = "Official website of Julio Herrera Velutini, banker and founder of Britannia Financial Group. Biography, family banking legacy, Banvelca and sourced news coverage.";
const url = site.url;
const image = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: "Julio Herrera Velutini official website" };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "en-GB": "/", "en-AE": "/", "x-default": "/" },
  },
  openGraph: { type: "website", url: "/", siteName: site.name, locale: site.locales.primary, alternateLocale: site.locales.alternates, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}/#webpage`,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${url}/#website` },
      about: { "@id": `${url}/#person` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${url}${site.ogImage}`, width: site.ogImageWidth, height: site.ogImageHeight },
      dateModified: site.profile.lastUpdated,
    },
    {
      "@type": "ItemList",
      "@id": `${url}/#latest-news`,
      name: `Latest news about ${site.name}`,
      itemListElement: posts.slice(0, 3).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${url}/news/${p.slug}`, name: p.title })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <QuickLinks />
      <Intro />
      <Perks />
      <News posts={posts.slice(0, 3)} />
    </>
  );
}
