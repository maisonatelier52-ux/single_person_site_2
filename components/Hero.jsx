import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div className="relative mx-auto flex min-h-[640px] max-w-[1440px] flex-col justify-between px-5 pb-10 pt-8 sm:min-h-[700px] sm:px-8 lg:min-h-[calc(100vh-8rem)] lg:px-10 lg:pb-14 lg:pt-12">
        {/* Tagline */}
        <div data-motion="off" className="anim-fade-up relative z-20">
          <p className="text-[11px] font-medium uppercase leading-[1.7] tracking-[0.16em] sm:text-[13px]">
            Julio Herrera<br />Velutini<br />Official website
          </p>
          <span className="mt-3 block h-px w-7 bg-ink" />
        </div>

        {/* Wordmark */}
        <h1
          data-motion="off" className="relative z-0 my-6 flex select-none justify-between text-[clamp(6.5rem,28.5vw,27rem)] font-extrabold leading-[0.76] tracking-[-0.04em] text-ink"
        >
          <span className="sr-only">Julio Herrera Velutini</span>
          {"JMHV".split("").map((l, i) => (<span key={i} aria-hidden="true" className="anim-letter" style={{ animationDelay: `${i * 140 + 150}ms` }}>{l}</span>))}
        </h1>

        {/* Smoke */}
        <div aria-hidden="true" className="anim-smoke pointer-events-none absolute bottom-0 left-1/2 z-[5] h-[34%] w-[80%] -translate-x-1/2 opacity-70 blur-2xl [background:radial-gradient(40%_50%_at_30%_65%,rgba(70,70,70,.45),transparent),radial-gradient(38%_55%_at_68%_55%,rgba(70,70,70,.5),transparent)]" />

        {/* Man */}
        <Image
          src="/hero-man.webp"
          alt=""
          width={1100}
          height={1700}
          priority
          className="anim-float pointer-events-none absolute bottom-0 left-1/2 z-10 h-[78%] w-auto max-w-none -translate-x-1/2 select-none object-contain [mask-image:linear-gradient(to_bottom,#000_78%,transparent)] sm:h-[88%] lg:h-[96%]"
        />

        {/* Bottom row */}
        <div className="relative z-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/news" className="bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/85">
              Read the blog
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2.5 border-b border-ink pb-1.5 text-[11px] font-medium uppercase tracking-[0.12em]">
              About Julio <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="text-[13px] font-medium uppercase leading-[1.8] tracking-[0.16em]">
            Official site<br />2026
            <span className="mt-2 block h-px w-7 bg-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}
