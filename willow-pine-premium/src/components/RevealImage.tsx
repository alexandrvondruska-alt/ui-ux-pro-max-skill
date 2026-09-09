"use client";

import { useEffect, useRef } from "react";
import { registerGsapPlugins } from "@/lib/gsap";

type RevealImageProps = {
  gradient: string;
  label?: string;
  className?: string;
  /** Extra upward drift applied to the inner layer while scrolling (parallax). */
  parallax?: boolean;
};

/**
 * A placeholder "photo" (CSS gradient, swap for a real <Image> later) that
 * reveals via a clip-path wipe as it scrolls into view, then optionally
 * drifts at a different rate than the page for a subtle parallax feel.
 */
export default function RevealImage({
  gradient,
  label,
  className = "",
  parallax = false,
}: RevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const { gsap } = registerGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        }
      );
      gsap.fromTo(inner, { scale: 1.25 }, {
        scale: 1,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
      });

      if (parallax) {
        gsap.to(inner, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-[-10%] will-change-transform"
        style={{ background: gradient }}
      />
      {label && (
        <span className="absolute bottom-4 left-4 z-10 text-xs font-medium tracking-wide text-fg/90">
          {label}
        </span>
      )}
    </div>
  );
}
