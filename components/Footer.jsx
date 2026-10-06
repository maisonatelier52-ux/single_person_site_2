import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/data/site";
import { posts } from "@/lib/posts";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const s = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
const icons = {
  linkedin: (<svg {...s}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>),
  x: (<svg {...s}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
  instagram: (<svg {...s} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>),
};
const labels = { linkedin: "LinkedIn", x: "X", instagram: "Instagram" };

export default function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-14 sm:px-8 lg:px-10 lg:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.4fr_1.2fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo light className="!items-start" />
            <p className="mt-5 max-w-[240px] text-[13px] leading-relaxed text-white/60">The official website of {site.name}.</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex items-center gap-5 text-white/70">
                {socials.map(([key, url]) => (
                  <li key={key}><a href={url} aria-label={labels[key]} rel="me noopener" target="_blank" className="transition-colors hover:text-white">{icons[key]}</a></li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em]">Pages</h3>
            <ul className="mt-5 space-y-3 text-[13px] text-white/60">
              {pages.map((l) => (<li key={l.label}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em]">Latest articles</h3>
            <ul className="mt-5 space-y-3 text-[13px] text-white/60">
              {posts.slice(0, 3).map((p) => (<li key={p.slug}><Link href={`/news/${p.slug}`} className="transition-colors hover:text-white"><span className="line-clamp-2">{p.title}</span></Link></li>))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em]">Contact</h3>
            <p className="mt-5 text-[13px] leading-relaxed text-white/60">General and media inquiries:</p>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block break-all text-[13px] underline underline-offset-4 transition-colors hover:text-white/80">{site.email}</a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="/editorial-policy" className="hover:text-white">Editorial Policy</Link></li>
            <li><a href="/feed.xml" className="hover:text-white">RSS</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
