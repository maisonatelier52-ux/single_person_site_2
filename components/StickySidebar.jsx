"use client";

import { useEffect, useRef } from "react";

// Sidebar that sticks while the article text scrolls, with no inner scrollbar.
// If the sidebar is taller than the window, its bottom edge sticks instead of its top,
// so every part of it is still reachable and it releases when the article ends.
export default function StickySidebar({ children, className = "", gap = 24 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const top = Math.min(gap, window.innerHeight - el.offsetHeight - gap);
      el.style.top = `${top}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [gap]);

  return (
    <div ref={ref} className={className} style={{ position: "sticky", top: gap }}>
      {children}
    </div>
  );
}
