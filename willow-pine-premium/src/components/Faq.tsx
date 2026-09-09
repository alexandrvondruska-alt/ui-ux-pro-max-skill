"use client";

import { useState } from "react";
import RevealText from "@/components/RevealText";

const FAQS = [
  {
    q: "What's the minimum stay over the holidays?",
    a: "3 nights minimum from December 20 through January 5. Outside that window, 2-night stays are welcome.",
  },
  {
    q: "Is check-in flexible?",
    a: "Yes — self check-in via lockbox any time after 3pm. Let us know your arrival window and we'll have everything ready.",
  },
  {
    q: "Are pets allowed?",
    a: "One well-behaved pet is welcome with advance notice — just mention it in your booking request.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Full refund up to 14 days before check-in, 50% refund up to 7 days before. No refund inside 7 days.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-28 md:px-10 md:py-40">
      <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
        Good to know
      </p>
      <RevealText as="h2" className="font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[38px]">
        Frequently asked questions.
      </RevealText>

      <div className="mt-14 border-t border-border">
        {FAQS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[16px] font-medium">{item.q}</span>
                <span
                  className={`shrink-0 font-display text-xl text-accent transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
