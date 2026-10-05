"use client";

import { useEffect, useRef } from "react";

// Thin progress bar at the top of the window showing how far through the article you are.
export default function ReadingProgress({ targetId = "story" }) {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const t = document.getElementById(targetId);
      if (!t || !bar.current) return;
      const r = t.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.3 - r.top) / Math.max(total, 1)));
      bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [targetId]);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-white mix-blend-difference" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
