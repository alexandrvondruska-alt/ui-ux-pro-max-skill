import RevealText from "@/components/RevealText";
import RevealImage from "@/components/RevealImage";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
            The apartment
          </p>
          <RevealText
            as="h2"
            className="font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[42px]"
          >
            Warm, quiet, and steps from the square.
          </RevealText>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
            <p>
              Willow &amp; Pine sits on the top floor of a restored
              19th-century townhouse, five minutes on foot from the old town
              square and its holiday market. Expect thick stone walls, a
              working wood stove, and big windows that catch the morning
              light.
            </p>
            <p>
              The apartment sleeps four across two bedrooms — a king in the
              main room, twin beds in the second — with a well-appointed
              bathroom and a kitchen stocked for slow mornings and long
              dinners.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-4 border-t border-border pt-8">
            {[
              ["4", "Guests"],
              ["2", "Bedrooms"],
              ["1", "Bathroom"],
              ["72m²", "Space"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <RevealImage
          gradient="linear-gradient(155deg,#3a2a1c,#c97b4a 55%,#17140f)"
          label="Living room, morning light"
          className="aspect-[4/5] rounded-2xl"
          parallax
        />
      </div>
    </section>
  );
}
