import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0B0B0B" };

// ─── Site-wide defaults. Every page file overrides title / description / canonical / openGraph / twitter itself. ───
const siteTitle = `${site.name} | Banker and entrepreneur`;
const ogImage = { url: site.ogImage, width: site.ogImageWidth, height: site.ogImageHeight, alt: `${site.name} official website` };

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: siteTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: ["Julio Herrera Velutini", "Julio Herrera Velutini banker", "Julio Herrera Velutini Britannia Financial Group", "Herrera Velutini family", "Banvelca", "Julio Herrera Velutini news"],
  category: "finance",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "en-GB": "/", "en-AE": "/", "x-default": "/" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} news` }] },
  },
  openGraph: { type: "website", url: "/", siteName: site.name, locale: site.locales.primary, alternateLocale: site.locales.alternates, title: siteTitle, description: site.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: siteTitle, description: site.description, images: [{ url: site.ogImage, alt: ogImage.alt }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
};

// Site-wide structured data (WebSite + Person + the organisations around him). Pages reference these by @id.
const p = site.profile;
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
      about: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: p.name,
      alternateName: [p.fullName, "Julio Martín Herrera Velutini", "JMHV"],
      givenName: "Julio",
      familyName: "Herrera Velutini",
      jobTitle: p.jobTitle,
      description: p.summary,
      url: site.url,
      mainEntityOfPage: { "@id": `${site.url}/about#profilepage` },
      image: { "@type": "ImageObject", url: `${site.url}/images/julio-about.jpg`, width: 960, height: 1200 },
      birthDate: p.birthDate,
      birthPlace: { "@type": "Place", name: p.birthPlace },
      nationality: [{ "@type": "Country", name: "Venezuela" }, { "@type": "Country", name: "Italy" }],
      knowsAbout: ["Banking", "Capital markets", "Private wealth", "International finance", "Family offices", "Cultural philanthropy"],
      worksFor: { "@id": `${site.url}/#britannia` },
      affiliation: [{ "@id": `${site.url}/#britannia` }, { "@id": `${site.url}/#banvelca` }],
      sameAs: [...site.sameAs, ...Object.values(site.socials).filter(Boolean)],
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#britannia`,
      name: "Britannia Financial Group",
      url: "https://www.britannia.com/",
      foundingDate: "2016",
      foundingLocation: { "@type": "Place", name: "London, United Kingdom" },
      founder: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#banvelca`,
      name: "Banvelca",
      description: "Herrera Velutini family office.",
      url: "https://www.banvelca.com/",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
