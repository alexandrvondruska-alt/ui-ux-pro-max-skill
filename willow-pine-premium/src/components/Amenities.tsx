import RevealText from "@/components/RevealText";

const AMENITIES = [
  "Fast WiFi",
  "Wood-burning stove",
  "Free private parking",
  "Full kitchen",
  "Washer & dryer",
  "Smart TV",
  "Heated floors",
  "Self check-in lockbox",
];

export default function Amenities() {
  return (
    <section id="amenities" className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
      <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
        What&rsquo;s included
      </p>
      <RevealText as="h2" className="max-w-2xl font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[42px]">
        Everything you need for a proper stay.
      </RevealText>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-0 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {AMENITIES.map((a, i) => (
          <div
            key={a}
            className="flex items-center justify-between border-b border-border py-6 text-[15px] font-medium"
          >
            <span>{a}</span>
            <span className="font-display text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
