"use client";
import { useState } from "react";

export default function BioText({ paragraphs }) {
  const [open, setOpen] = useState(false);
  const shown = paragraphs.slice(0, 2);
  const more = paragraphs.slice(2);
  return (
    <div className="mt-7 text-[15px] leading-[1.75] text-ink/75">
      <p>{shown[0]}</p>
      <div aria-hidden="true" className="my-7 flex items-center"><span className="h-px w-5 bg-ink" /><span className="h-px flex-1 bg-ink/25" /></div>
      <p>{shown[1]}</p>
      <div id="bio-more" className={`${open ? "block" : "hidden"} mt-5 space-y-5`}>
        {more.map((t, i) => (<p key={i}>{t}</p>))}
      </div>
      <button type="button" aria-expanded={open} aria-controls="bio-more" onClick={() => setOpen((v) => !v)} className="mt-9 bg-ink px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/85">
        {open ? "Show less ↑" : "Read the full biography →"}
      </button>
    </div>
  );
}
