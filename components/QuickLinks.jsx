import Link from "next/link";
import Skyline from "./Skyline";
import { FedoraIcon, CalendarIcon, MailIcon, GroupIcon } from "./icons";

const items = [
  { Icon: FedoraIcon, title: "Biography", text: "Background, career and roles.", cta: "Read about Julio", href: "/about" },
  { Icon: CalendarIcon, title: "Official blog", text: "Selected articles and updates, newest first.", cta: "Read the blog", href: "/news" },
  { Icon: MailIcon, title: "Media inquiries", text: "How journalists and organizations can reach out.", cta: "Contact", href: "/contact" },
  { Icon: GroupIcon, title: "Official profiles", text: "Verified links to his social profiles.", cta: "View profiles", href: "/contact#profiles" },
];

export default function QuickLinks() {
  return (
    <section aria-label="Quick links" className="bg-ink text-white">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text, cta, href }, i) => (
          <li key={title} className="relative min-h-[190px] overflow-hidden border-b border-white/10 sm:min-h-[210px] lg:border-b-0 lg:border-r lg:last:border-r-0 [&:nth-child(odd)]:sm:border-r">
            <Skyline seed={i + 3} className="absolute inset-x-0 bottom-0 h-[45%] w-full opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-transparent" />
            <div className="relative flex gap-4 px-6 py-7 lg:px-8">
              <Icon className="mt-1 shrink-0" width={34} height={34} />
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.1em]">{title}</h3>
                <p className="mt-2 max-w-[200px] text-[12px] leading-relaxed text-white/65">{text}</p>
                <Link href={href} className="mt-4 inline-block text-[10px] font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white">{cta} →</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
