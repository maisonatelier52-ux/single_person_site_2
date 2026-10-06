import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(90deg,#8e8e8e_0%,#a9a9a9_45%,#c4c4c4_100%)]">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-12 sm:px-8 lg:min-h-[520px] lg:justify-center lg:px-10 lg:py-16">
        <div className="relative z-10 max-w-[460px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em]">About</p>
          <h2 className="mt-6 text-[clamp(2.75rem,6.2vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
            Julio<br />Herrera<br />Velutini.
          </h2>
          <p className="mt-6 max-w-[340px] text-[13px] leading-relaxed">{site.profile.summary}</p>
          <Link href="/about" className="mt-8 inline-block bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/85">
            Read the full biography
          </Link>
        </div>
        <div className="relative mt-8 flex h-[340px] items-end justify-center sm:h-[420px] lg:absolute lg:inset-y-0 lg:right-[4%] lg:mt-0 lg:h-full lg:w-[55%] lg:justify-end">
          <Image src="/story-man.webp" alt="Portrait-style illustration representing Julio Herrera Velutini" width={1228} height={1281} className="h-full w-auto max-w-none object-contain object-bottom" />
        </div>
      </div>
    </section>
  );
}
