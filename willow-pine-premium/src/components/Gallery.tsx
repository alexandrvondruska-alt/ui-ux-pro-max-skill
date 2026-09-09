import RevealText from "@/components/RevealText";
import RevealImage from "@/components/RevealImage";

const PHOTOS = [
  { label: "Living room", gradient: "linear-gradient(150deg,#c97b4a,#17140f)", span: "md:col-span-2 md:row-span-2" },
  { label: "Main bedroom", gradient: "linear-gradient(150deg,#3a2a1c,#e8c77a)", span: "" },
  { label: "Kitchen", gradient: "linear-gradient(150deg,#17140f,#c97b4a)", span: "" },
  { label: "Second bedroom", gradient: "linear-gradient(150deg,#e8c77a,#3a2a1c)", span: "" },
  { label: "Bathroom", gradient: "linear-gradient(150deg,#c97b4a,#e8c77a)", span: "" },
  { label: "Terrace view", gradient: "linear-gradient(150deg,#17140f,#3a2a1c)", span: "md:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-bg-alt py-28 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
              Gallery
            </p>
            <RevealText as="h2" className="font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[42px]">
              A closer look inside.
            </RevealText>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Every photo below is a placeholder — drop your own real listing
            photos into the same grid slots when you have them.
          </p>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {PHOTOS.map((p) => (
            <RevealImage
              key={p.label}
              gradient={p.gradient}
              label={p.label}
              className={`rounded-xl ${p.span}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
