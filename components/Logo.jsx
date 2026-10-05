import Link from "next/link";
import { site } from "@/data/site";

export default function Logo({ light = false, className = "", sub = "julio herrera velutini" }) {
  return (
    <Link href="/" aria-label={`${site.name} – home`} className={`inline-flex flex-col items-center leading-none ${light ? "text-white" : "text-ink"} ${className}`}>
      <span className="text-[34px] font-extrabold tracking-[0.12em] pl-[0.12em] sm:text-[40px]">{site.shortName}</span>
      <span className="mt-1.5 text-[7px] font-medium uppercase tracking-[0.42em] pl-[0.42em]">{sub}</span>
    </Link>
  );
}
