"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A brief page-load curtain: a full-screen panel that counts up then
 * wipes away, so the hero underneath enters on cue rather than popping
 * in with the rest of the DOM. Instantly hidden (no animation) under
 * reduced motion — the element stays mounted so this needs no state,
 * just a direct style write in the effect.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      root.style.display = "none";
      return;
    }

    document.documentElement.classList.add("preloading");
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => document.documentElement.classList.remove("preloading"),
    });

    tl.to(counter, {
      value: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.value));
      },
    })
      .to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.1")
      .set(root, { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex items-end justify-between bg-bg px-6 py-8 md:px-10"
    >
      <span className="font-display text-sm tracking-wide text-muted">Willow &amp; Pine</span>
      <span ref={countRef} className="font-display text-sm tabular-nums text-muted">
        0
      </span>
    </div>
  );
}
