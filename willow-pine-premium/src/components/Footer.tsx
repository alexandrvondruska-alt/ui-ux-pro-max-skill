import RevealText from "@/components/RevealText";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] px-6 pb-10 pt-28 md:px-10 md:pt-40">
      <RevealText
        as="h2"
        className="font-display text-[11vw] leading-[0.94] tracking-tight sm:text-[7vw] md:text-[80px]"
      >
        Your next holiday starts here.
      </RevealText>

      <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <a
          href="#book"
          data-cursor="hover"
          className="group inline-flex items-center gap-3 rounded-full bg-fg px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-bg transition-transform duration-300 hover:scale-105"
        >
          Check availability
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <a href="#about" className="hover:text-fg">The apartment</a>
          <a href="#gallery" className="hover:text-fg">Gallery</a>
          <a href="#amenities" className="hover:text-fg">Amenities</a>
          <a href="#reviews" className="hover:text-fg">Reviews</a>
          <a href="#faq" className="hover:text-fg">FAQ</a>
        </nav>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center">
        <span>&copy; 2026 Willow &amp; Pine. All rights reserved.</span>
        <span>Demo site — for portfolio/preview purposes only.</span>
      </div>
    </footer>
  );
}
