import { ShieldIcon, StarIcon, GlobeIcon, CalendarIcon, MailIcon } from "./icons";

const perks = [
  { Icon: ShieldIcon, title: "Verified facts", text: "Only information that can be verified." },
  { Icon: StarIcon, title: "Reviewed content", text: "Every article is approved before publishing." },
  { Icon: GlobeIcon, title: "Sources linked", text: "News links back to the original source." },
  { Icon: CalendarIcon, title: "Regular updates", text: "New articles are added on a steady schedule." },
  { Icon: MailIcon, title: "Press inquiries", text: "Media can reach out through the contact page." },
];

export default function Perks() {
  return (
    <section aria-label="Editorial standards" className="border-b border-ink/10 bg-paper">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-5 lg:px-10">
        {perks.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4 lg:border-l lg:border-ink/15 lg:px-6 lg:first:border-l-0 lg:first:pl-0">
            <Icon width={30} height={30} className="shrink-0" />
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.08em]">{title}</h3>
              <p className="mt-1.5 max-w-[170px] text-[11px] leading-snug text-ink/70">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
