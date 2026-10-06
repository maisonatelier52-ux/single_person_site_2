import Image from "next/image";
import Link from "next/link";
import { formatDate, readingMinutes } from "@/lib/posts";

export default function NewsCard({ post, priority = false }) {
  return (
    <li className="group flex flex-col bg-[#171717] text-white transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-22px_rgba(0,0,0,.7)]">
      <Link href={`/news/${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden bg-[#0d0d0d]">
        <Image src={post.image} alt="" fill priority={priority} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover object-top grayscale transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute left-4 top-4 text-[9px] font-medium uppercase tracking-[0.14em]">{post.tags[0]}</span>
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <p className="text-[11px] tracking-[0.06em] text-white/55">
          <time dateTime={post.date}>{formatDate(post.date, true)}</time> · {readingMinutes(post)} min read
        </p>
        <h3 className="mt-3 text-[14px] font-bold uppercase leading-snug tracking-[0.06em]"><Link href={`/news/${post.slug}`}>{post.title}</Link></h3>
        <p className="mt-3 text-[12px] leading-relaxed text-white/65">{post.description}</p>
        <Link href={`/news/${post.slug}`} className="mt-6 inline-block self-start border-b border-white/70 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-white">Read article →</Link>
      </div>
    </li>
  );
}
