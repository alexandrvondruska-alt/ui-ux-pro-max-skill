"use client";

import { useEffect, useRef } from "react";

/**
 * Two-part custom cursor (dot + lagging ring) that scales up over anything
 * carrying data-cursor="hover" (links, buttons, cards). Desktop-only and
 * a no-op under reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(loop);
    };

    const attachHoverListeners = () => {
      document.querySelectorAll<HTMLElement>("[data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("scale-150", "border-accent"));
        el.addEventListener("mouseleave", () => ring.classList.remove("scale-150", "border-accent"));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    // Elements render after this effect on first paint (client components),
    // so defer the listener attachment one tick.
    const timeout = setTimeout(attachHoverListeners, 50);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/40 transition-[width,height,border-color] duration-200 md:block"
      />
    </>
  );
}
