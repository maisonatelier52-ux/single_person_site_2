"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Same list as the selectors in globals.css (".js main ..."). Anything matching is revealed as it scrolls into view.
const TARGETS = "h1,h2,h3,p,li,figure,hr,form,dl > div";
const SKIP = "aside *, nav *, [data-motion='off'], [data-motion='off'] *";

export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    window.__motion = true;
    const root = document.documentElement;
    if (!root.classList.contains("js")) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scope = document.querySelectorAll("main, footer");
    const all = [...scope].flatMap((s) => [...s.querySelectorAll(TARGETS)]).filter((el) => !el.matches(SKIP));
    // Elements nested inside another animated element simply ride along with their parent.
    const tops = [];
    const outer = new Set(all);
    all.forEach((el) => {
      let p = el.parentElement, nested = false;
      while (p) { if (outer.has(p)) { nested = true; break; } p = p.parentElement; }
      if (nested) el.setAttribute("data-in", ""); else tops.push(el);
    });

    const finish = (el) => { el.setAttribute("data-in", ""); setTimeout(() => el.setAttribute("data-done", ""), 1400); };
    if (reduce) { tops.forEach(finish); return; }

    const io = new IntersectionObserver((entries) => {
      const hits = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      hits.forEach((e, i) => {
        e.target.style.setProperty("--d", `${Math.min(i, 7) * 90}ms`);
        finish(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    tops.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return null;
}
