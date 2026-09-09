import RevealText from "@/components/RevealText";

const REVIEWS = [
  {
    quote:
      "Exactly like the photos — warm, quiet, and the stove made the whole trip. Elena's directions for check-in were spot on.",
    name: "Tom H.",
    meta: "Stayed 4 nights, December",
  },
  {
    quote:
      "Best location for the holiday market — we walked everywhere. Beds were genuinely comfortable, which is rare.",
    name: "Sara & Jonas",
    meta: "Stayed 6 nights, January",
  },
  {
    quote:
      "Second time booking directly — no fees, fast replies, and the apartment is even better than the listing suggests.",
    name: "Priya N.",
    meta: "Stayed 3 nights, December",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
      <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
        Past guests
      </p>
      <RevealText as="h2" className="max-w-2xl font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[42px]">
        What guests say about staying here.
      </RevealText>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <div key={r.name} className="rounded-2xl border border-border bg-bg-alt p-7">
            <div className="mb-4 text-accent-soft">★★★★★</div>
            <p className="text-[15px] leading-relaxed">{r.quote}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="h-9 w-9 shrink-0 rounded-full bg-[linear-gradient(135deg,#c97b4a,#e8c77a)]" />
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted">{r.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
