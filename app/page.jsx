import Hero from "@/components/Hero";
import QuickLinks from "@/components/QuickLinks";
import Intro from "@/components/Intro";
import Perks from "@/components/Perks";
import News from "@/components/News";
import { posts } from "@/lib/posts";
import { site } from "@/data/site";

const title = "Julio Herrera Velutini | Official Website: Banker and Entrepreneur";
const description = "Official website and blog of Julio Herrera Velutini, with a sourced biography, selected updates and original perspectives on finance, legacy and culture.";
const url = site.url;
const image = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: "Julio Herrera Velutini official website" };

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, locale: site.locale, title, description, images: [image] },
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
      "@id": `${url}/#latest-articles`,
      name: `Latest articles from ${site.name}`,
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
