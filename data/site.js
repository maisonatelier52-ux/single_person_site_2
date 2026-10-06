import profile from "./profile.json";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && (!configuredUrl || /example\.com|your-domain\.com/i.test(configuredUrl))) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be set to the real canonical production origin.");
}

if (isProduction && (!configuredEmail || /example\.com|your-domain\.com/i.test(configuredEmail))) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must be set to the real public contact address.");
}

const siteUrl = (configuredUrl || "http://localhost:3000").replace(/\/$/, "");
const contactEmail = configuredEmail || "press@localhost.invalid";

export const site = {
  name: profile.name,
  shortName: "JMHV",
  publisherName: "Julio Herrera Velutini Official Site",
  url: siteUrl,
  description: "Official site and blog of Julio Herrera Velutini, with a sourced biography, selected updates and original perspectives.",
  email: contactEmail,
  socials: { linkedin: "", x: "", instagram: "" }, // official profile URLs; empty ones are hidden
  sameAs: ["https://en.wikipedia.org/wiki/Julio_Herrera_Velutini"],
  ogImage: "/images/julio-hero.jpg",
  ogImageWidth: 1600,
  ogImageHeight: 1000,
  locale: "en_US",
  portrait: "/story-man.webp",
  profile,
};
export const abs = (p = "/") => `${site.url}${p === "/" ? "" : p}`;
