const ITEMS = [
  "Self check-in",
  "Free WiFi",
  "Wood-burning stove",
  "Free private parking",
  "Old Town, 5 min walk",
  "No broker fees",
  "Pet friendly",
];

export default function ValueMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-border bg-bg-alt py-6">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 [animation-play-state:running] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 text-sm font-medium uppercase tracking-[0.1em] text-muted"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
