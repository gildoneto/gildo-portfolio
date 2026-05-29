"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLang } from "@/app/i18n/context";
import translations from "@/app/i18n/translations";
import { useReveal } from "@/app/hooks/useReveal";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { lang } = useLang();
  const tx = translations[lang].contact;
  const { ref, visible } = useReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || status === "success") return;
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = [
    "w-full bg-surface border border-surface-up rounded px-4 py-3 text-sm text-ink",
    "placeholder:text-ink-muted",
    "focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/30",
    "transition-colors duration-200",
  ].join(" ");

  const labelClass = "block font-mono text-[11px] text-ink-muted tracking-widest uppercase mb-2";

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 border-t border-surface"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <p className="font-mono text-xs text-terminal tracking-widest uppercase mb-3">
              ./contact
            </p>
            <h2
              className="font-display font-extrabold text-ink leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {tx.title}
            </h2>
            <p className="text-ink-muted leading-relaxed max-w-[42ch]">
              {tx.sub}
            </p>

            {/* Ambient info */}
            <div className="mt-10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
                <span className="font-mono text-sm text-ink-muted">
                  gildorama@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-terminal" aria-hidden="true" />
                <span className="font-mono text-sm text-ink-muted">
                  Brazil · Open to worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`}>
            {status === "success" ? (
              <div className="bg-surface border border-surface-up rounded-xl p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-terminal/15 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="oklch(0.74 0.18 145)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-ink font-medium">{tx.success}</p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      {tx.fields.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={tx.placeholders.name}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {tx.fields.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={tx.placeholders.email}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsapp" className={labelClass}>
                    {tx.fields.whatsapp}
                    <span className="ml-1 normal-case tracking-normal opacity-50">
                      {lang === "pt" ? "(opcional)" : "(optional)"}
                    </span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder={tx.placeholders.whatsapp}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="project" className={labelClass}>
                    {tx.fields.project}
                  </label>
                  <input
                    id="project"
                    name="project"
                    type="text"
                    required
                    placeholder={tx.placeholders.project}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    {tx.fields.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={tx.placeholders.message}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-proj-coral">
                    {tx.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-amber text-canvas font-display font-bold text-sm tracking-widest uppercase py-4 rounded hover:bg-amber-dim transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? tx.sending : tx.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
