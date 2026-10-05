import profile from "./profile.json";

// ─── Site-wide settings. Set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_CONTACT_EMAIL in .env.local ───
export const site = {
  name: profile.name,
  shortName: "JMHV",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, ""),
  description: "Official site of Julio Herrera Velutini, banker and entrepreneur: biography, family legacy and sourced news coverage.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "press@example.com",
  socials: { linkedin: "", x: "", instagram: "" }, // official profile URLs; empty ones are hidden
  sameAs: ["https://en.wikipedia.org/wiki/Julio_Herrera_Velutini"],
  ogImage: "/images/logo-og.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  locales: { primary: "en_US", alternates: ["en_GB", "en_AE"] }, // audiences: US, UK, UAE
  portrait: "/story-man.png",
  profile,
};
export const abs = (p = "/") => `${site.url}${p === "/" ? "" : p}`;
