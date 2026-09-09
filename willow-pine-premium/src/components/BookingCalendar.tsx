"use client";

import { useMemo, useState } from "react";

const NIGHTLY_RATE = 145;
const CLEANING_FEE = 45;
const SERVICE_RATE = 0.1;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

// Demo-only "already booked" dates.
const UNAVAILABLE = new Set([
  "2026-11-5", "2026-11-6", "2026-11-7",
  "2026-11-15", "2026-11-16",
  "2026-11-24", "2026-11-25", "2026-11-26", "2026-11-27",
  "2027-0-2", "2027-0-3",
  "2027-0-18", "2027-0-19", "2027-0-20",
]);

function key(y: number, m: number, d: number) {
  return `${y}-${m}-${d}`;
}

function fmtShort(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function BookingCalendar() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(11); // December 2026
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const isPast = (y: number, m: number, d: number) => new Date(y, m, d) < today;
  const isUnavailable = (y: number, m: number, d: number) => UNAVAILABLE.has(key(y, m, d));

  const rangeHasUnavailable = (start: Date, end: Date) => {
    const cur = new Date(start);
    cur.setDate(cur.getDate() + 1);
    while (cur < end) {
      if (UNAVAILABLE.has(key(cur.getFullYear(), cur.getMonth(), cur.getDate()))) return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  };

  const onDayClick = (y: number, m: number, d: number) => {
    const clicked = new Date(y, m, d);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(clicked);
      setCheckOut(null);
    } else if (clicked <= checkIn) {
      setCheckIn(clicked);
      setCheckOut(null);
    } else if (rangeHasUnavailable(checkIn, clicked)) {
      setCheckIn(clicked);
      setCheckOut(null);
    } else {
      setCheckOut(clicked);
    }
  };

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const canGoBack = !(viewYear === today.getFullYear() && viewMonth === today.getMonth());

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const nights = checkIn && checkOut ? Math.round((+checkOut - +checkIn) / 86400000) : 0;
  const subtotal = nights * NIGHTLY_RATE;
  const service = Math.round(subtotal * SERVICE_RATE);
  const total = subtotal + (nights ? CLEANING_FEE + service : 0);

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push(<div key={`pad-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const past = isPast(viewYear, viewMonth, d);
    const unavailable = isUnavailable(viewYear, viewMonth, d);
    const thisDate = new Date(viewYear, viewMonth, d);
    const selected = (checkIn && +thisDate === +checkIn) || (checkOut && +thisDate === +checkOut);
    const inRange = !!(checkIn && checkOut && thisDate > checkIn && thisDate < checkOut);
    const disabled = past || unavailable;

    cells.push(
      <button
        key={d}
        type="button"
        disabled={disabled}
        onClick={() => onDayClick(viewYear, viewMonth, d)}
        className={[
          "aspect-square rounded-lg text-[13px] font-medium transition-colors",
          disabled
            ? "cursor-not-allowed text-fg/25 line-through"
            : "cursor-pointer bg-fg/[0.04] hover:bg-fg/10",
          selected ? "!bg-accent text-bg" : "",
          inRange ? "!bg-accent/30" : "",
        ].join(" ")}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-border bg-bg-alt p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            disabled={!canGoBack}
            onClick={goPrevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border disabled:opacity-30"
          >
            &larr;
          </button>
          <h3 className="font-display text-lg">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <button
            type="button"
            aria-label="Next month"
            onClick={goNextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
          >
            &rarr;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {DOW.map((d, i) => (
            <div key={i} className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              {d}
            </div>
          ))}
          {cells}
        </div>

        <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <i className="h-2.5 w-2.5 rounded-sm bg-fg/10" /> Available
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="h-2.5 w-2.5 rounded-sm bg-accent" /> Selected
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="h-2.5 w-2.5 rounded-sm bg-fg/25 opacity-40" /> Booked
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-7">
        <div className="flex items-baseline gap-2 font-display">
          <span className="text-3xl">&euro;{NIGHTLY_RATE}</span>
          <span className="text-sm text-muted">/ night</span>
        </div>

        <p className="mt-3 text-sm text-muted">
          {!checkIn && "Select check-in and check-out dates"}
          {checkIn && !checkOut && `${fmtShort(checkIn)} → select checkout date`}
          {checkIn && checkOut && `${fmtShort(checkIn)} → ${fmtShort(checkOut)} · ${nights} night${nights === 1 ? "" : "s"}`}
        </p>

        {nights > 0 && (
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>&euro;{NIGHTLY_RATE} &times; {nights} night{nights === 1 ? "" : "s"}</span>
              <span>&euro;{subtotal}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Cleaning fee</span>
              <span>&euro;{CLEANING_FEE}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Service fee</span>
              <span>&euro;{service}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span>&euro;{total}</span>
            </div>
          </div>
        )}

        <a
          href="#request"
          data-cursor="hover"
          aria-disabled={nights === 0}
          className={`mt-6 block rounded-full px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide transition-transform ${
            nights === 0
              ? "pointer-events-none bg-fg/10 text-muted"
              : "bg-accent text-bg hover:scale-[1.02]"
          }`}
        >
          {nights === 0 ? "Select dates to continue" : "Request to book"}
        </a>
        <p className="mt-3 text-center text-xs text-muted">
          You won&rsquo;t be charged yet — this sends a request to the host.
        </p>
      </div>
    </div>
  );
}
