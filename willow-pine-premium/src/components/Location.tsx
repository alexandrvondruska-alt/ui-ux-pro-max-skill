import RevealText from "@/components/RevealText";
import RevealImage from "@/components/RevealImage";

const NEARBY = [
  ["Old Town Square & holiday market", "5 min walk"],
  ["Riverside promenade", "7 min walk"],
  ["Central train station", "12 min walk"],
  ["Nearest grocery store", "2 min walk"],
  ["Airport", "35 min by taxi"],
];

export default function Location() {
  return (
    <section id="location" className="bg-bg-alt py-28 md:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 md:grid-cols-2 md:items-center md:px-10 md:gap-20">
        <RevealImage
          gradient="radial-gradient(circle at 50% 50%, rgba(201,123,74,0.35), transparent 60%), repeating-linear-gradient(0deg, rgba(245,239,230,0.06) 0 1px, transparent 1px 42px), repeating-linear-gradient(90deg, rgba(245,239,230,0.06) 0 1px, transparent 1px 42px), #17140f"
          className="aspect-[4/3] rounded-2xl"
        />
        <div>
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
            Location
          </p>
          <RevealText as="h2" className="font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[38px]">
            Old Town, five minutes from the square.
          </RevealText>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {NEARBY.map(([place, time]) => (
              <li key={place} className="flex items-center justify-between py-4 text-[15px]">
                <span>{place}</span>
                <span className="text-muted">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
