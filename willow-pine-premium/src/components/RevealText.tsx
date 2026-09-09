"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, registerGsapPlugins } from "@/lib/gsap";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** "load" fires immediately (hero headline); "scroll" waits for viewport entry. */
  trigger?: "load" | "scroll";
  delay?: number;
};

/**
 * Splits its text into lines and reveals each line with a clipped
 * translate-up + slight rotation, staggered — the "cinematic text reveal"
 * seen across premium/Awwwards-style sites. Falls back to plain text
 * under reduced motion.
 */
export default function RevealText({
  children,
  as = "p",
  className = "",
  trigger = "scroll",
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    registerGsapPlugins();
    let split: InstanceType<typeof SplitText> | null = null;
    let st: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        linesClass: "reveal-line-wrap",
      });

      gsap.set(split.lines, { yPercent: 110, rotate: 4 });

      const tween = gsap.to(split.lines, {
        yPercent: 0,
        rotate: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: el, start: "top 85%", once: true }
            : undefined,
      });
      st = tween.scrollTrigger ?? null;
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
      st?.kill();
    };
  }, [trigger, delay]);

  if (as === "h1") return <h1 ref={ref} className={className}>{children}</h1>;
  if (as === "h2") return <h2 ref={ref} className={className}>{children}</h2>;
  if (as === "h3") return <h3 ref={ref} className={className}>{children}</h3>;
  return <p ref={ref} className={className}>{children}</p>;
}
