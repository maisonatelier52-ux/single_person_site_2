"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/data/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="relative z-50 w-full">
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] sm:px-8 lg:px-10">
          <p>Official website of {site.name}</p>
          <a href={`mailto:${site.email}`} className="hidden transition-opacity hover:opacity-70 sm:block">{site.email}</a>
        </div>
      </div>

      <div className="border-b border-ink/10 bg-paper">
        <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-10">
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.12em]">
              {nav.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all hover:after:w-full">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="-ml-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] w-6 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>

          <Logo className="absolute left-1/2 -translate-x-1/2" />

          <Link href="/contact" className="hidden border border-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper sm:inline-block">
            Contact
          </Link>
          <span className="w-10 sm:hidden" aria-hidden="true" />
        </div>

        {open && (
          <div id="mobile-menu" className="absolute inset-x-0 top-full border-t border-ink/10 bg-paper shadow-lg lg:hidden">
            <nav aria-label="Mobile" className="mx-auto max-w-[1440px] px-5 pb-4 pt-2 sm:px-8">
              <ul className="divide-y divide-ink/10">
                {[...nav, { label: "Contact", href: "/contact" }].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} onClick={close} className="block py-4 text-sm font-semibold uppercase tracking-[0.14em]">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
