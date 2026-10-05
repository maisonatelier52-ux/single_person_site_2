"use client";
import { useState } from "react";

export default function ContactForm({ email }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${f.get("topic")}: ${f.get("name")}`;
    const body = `${f.get("message")}\n\nFrom: ${f.get("name")} <${f.get("email")}>`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = "mt-2 w-full border border-ink/25 bg-white/60 px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink/40 focus:border-ink focus:bg-white";
  const label = "block text-[11px] font-semibold uppercase tracking-[0.12em]";

  return (
    <form onSubmit={onSubmit} className="space-y-6 border border-ink/15 bg-paper p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>Your name<input name="name" required autoComplete="name" className={field} /></label>
        <label className={label}>Your email<input name="email" type="email" required autoComplete="email" className={field} /></label>
      </div>
      <label className={label}>Topic
        <select name="topic" defaultValue="Media inquiry" className={field}>
          <option>Media inquiry</option><option>Correction request</option><option>Business inquiry</option><option>Other</option>
        </select>
      </label>
      <label className={label}>Message<textarea name="message" required rows={6} className={field} /></label>
      <button type="submit" className="bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/85">Open email draft →</button>
      {sent && <p role="status" className="text-[13px] text-ink/70">Your email app should open with the message filled in. If it did not, write to {email}.</p>}
    </form>
  );
}
