import Link from "next/link";
import Skyline from "./Skyline";

export default function PageHero({ crumbs = [], label, title, intro, children }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Skyline seed={9} className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink/10" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-8 sm:px-8 lg:px-10 lg:pb-20 lg:pt-10">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === crumbs.length - 1 ? <span aria-current="page" className="text-white">{c.name}</span> : <Link href={c.href} className="hover:text-white">{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {label && <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">{label}</p>}
        <h1 className={`${label ? "mt-5" : "mt-10"} max-w-[1000px] text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-balance`}>{title}</h1>
        {intro && <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-white/70">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
