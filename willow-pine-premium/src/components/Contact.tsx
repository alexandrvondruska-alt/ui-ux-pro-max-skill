"use client";

import { useState } from "react";
import RevealText from "@/components/RevealText";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="request" className="bg-bg-alt py-28 md:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 md:grid-cols-2 md:px-10">
        <div>
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
            Get in touch
          </p>
          <RevealText as="h2" className="font-display text-[8vw] leading-[1.02] tracking-tight sm:text-[5vw] md:text-[38px]">
            Questions before you book?
          </RevealText>
          <p className="mt-6 max-w-sm text-[15px] text-muted">
            Message the host directly — Elena usually replies within the
            hour.
          </p>

          <ul className="mt-10 space-y-6 border-t border-border pt-8">
            <li>
              <div className="text-sm font-semibold">+1 (555) 019-4482</div>
              <div className="text-sm text-muted">WhatsApp preferred</div>
            </li>
            <li>
              <div className="text-sm font-semibold">elena@willowandpine.example</div>
              <div className="text-sm text-muted">Usually replies within an hour</div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-2xl border border-border bg-card p-7 md:p-9"
        >
          {submitted && (
            <div className="mb-5 rounded-lg border border-border bg-bg-alt px-4 py-3 text-sm font-medium text-accent-soft">
              Thanks! Your request has been sent — Elena will confirm your
              dates shortly.
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First name" id="fname" required />
            <Field label="Last name" id="lname" required />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email" id="femail" type="email" required />
            <Field label="Guests" id="fguests" as="select" />
          </div>
          <div className="mt-4">
            <Field label="Message" id="fmsg" as="textarea" placeholder="Anything the host should know?" />
          </div>
          <button
            type="submit"
            data-cursor="hover"
            className="mt-6 w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-wide text-bg transition-transform hover:scale-[1.01]"
          >
            Send request
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            This is a demo form — no request is actually sent anywhere.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  as = "input",
  required,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  as?: "input" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-lg border border-border bg-bg px-3.5 py-3 text-sm text-fg outline-none focus:border-accent";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </label>
      {as === "select" ? (
        <select id={id} className={cls} defaultValue="3">
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
        </select>
      ) : as === "textarea" ? (
        <textarea id={id} rows={3} placeholder={placeholder} className={cls} />
      ) : (
        <input id={id} type={type} required={required} className={cls} />
      )}
    </div>
  );
}
