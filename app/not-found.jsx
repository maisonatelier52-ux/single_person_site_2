import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">Error 404</p>
        <h1 className="mt-5 text-[clamp(2.5rem,9vw,7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">Page not found</h1>
        <p className="mt-6 max-w-lg text-[15px] text-white/70">That address does not exist. Try the news list or the home page.</p>
        <div className="mt-8 flex flex-wrap gap-8 text-[11px] font-semibold uppercase tracking-[0.14em]">
          <Link href="/news" className="border-b border-white pb-1">Go to news</Link>
          <Link href="/" className="border-b border-white/50 pb-1">Go home</Link>
        </div>
      </div>
    </section>
  );
}
