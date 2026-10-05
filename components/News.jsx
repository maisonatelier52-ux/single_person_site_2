import Link from "next/link";
import NewsCard from "./NewsCard";

export default function News({ posts, title = "Latest news", viewAll = true }) {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold uppercase tracking-[0.12em]">{title}</h2>
          {viewAll && <Link href="/news" className="text-[10px] font-medium uppercase tracking-[0.12em] underline-offset-4 hover:underline">View all news</Link>}
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (<NewsCard key={p.slug} post={p} />))}
        </ul>
      </div>
    </section>
  );
}
