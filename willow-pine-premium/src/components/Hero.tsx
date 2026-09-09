"use client";

import { useEffect, useRef } from "react";
import { registerGsapPlugins } from "@/lib/gsap";
import RevealText from "@/components/RevealText";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const { gsap } = registerGsapPlugins();
    const ctx = gsap.context(() => {
      // Slow zoom-out on load
      gsap.fromTo(bg, { scale: 1.18 }, { scale: 1, duration: 2.2, ease: "power2.out", delay: 1.1 });
      // Parallax drift as the hero scrolls out
      gsap.to(bg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-[-6%] will-change-transform"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, rgba(201,123,74,0.35), transparent 55%), radial-gradient(90% 70% at 85% 0%, rgba(232,199,122,0.18), transparent 60%), linear-gradient(160deg, #17140f 0%, #0d0b09 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,11,9,0)_40%,rgba(13,11,9,0.9)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 md:px-10 md:pb-24">
        <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent-soft">
          Old Town &middot; Two bedrooms &middot; Open for the holidays
        </p>
        <RevealText
          as="h1"
          trigger="load"
          delay={0.35}
          className="font-display text-[13vw] leading-[0.92] tracking-tight text-fg sm:text-[10vw] md:text-[7.4vw] lg:text-[104px]"
        >
          A quiet apartment for a proper holiday
        </RevealText>
        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            Two bedrooms, a wood-burning stove, and a five-minute walk to the
            old town square. Book directly with the host — no platform fees.
          </p>
          <a
            href="#book"
            data-cursor="hover"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-fg px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-bg transition-transform duration-300 hover:scale-105"
          >
            Check availability
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex">
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-8 w-px bg-fg/30" />
      </div>
    </section>
  );
}
