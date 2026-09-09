import RevealText from "@/components/RevealText";
import BookingCalendar from "@/components/BookingCalendar";

export default function Booking() {
  return (
    <section id="book" className="bg-bg-alt py-28 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
          Availability &amp; pricing
        </p>
        <RevealText as="h2" className="max-w-2xl font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[42px]">
          Pick your dates.
        </RevealText>
        <p className="mt-4 max-w-md text-[15px] text-muted">
          Tap a check-in date, then a check-out date. Greyed-out days are
          already booked.
        </p>

        <div className="mt-14">
          <BookingCalendar />
        </div>
      </div>
    </section>
  );
}
