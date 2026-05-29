"use client";

import { useLang } from "@/app/i18n/context";
import translations from "@/app/i18n/translations";
import { Terminal } from "./Terminal";

export function Hero() {
  const { lang } = useLang();
  const tx = translations[lang].hero;

  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <p className="font-mono text-xs text-terminal tracking-widest uppercase mb-6 opacity-0 animate-[fadeUp_600ms_ease-out_100ms_forwards]">
              Full-Stack Developer · Next.js · Firebase · TypeScript
            </p>

            {/* Headline */}
            <h1
              className="font-display font-extrabold leading-[0.9] tracking-tight mb-8 opacity-0 animate-[fadeUp_600ms_ease-out_250ms_forwards]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
            >
              <span className="block text-ink">{tx.line1}</span>
              <span className="block text-amber">{tx.line2}</span>
            </h1>

            {/* Sub-copy */}
            <p
              className="text-ink-muted text-lg leading-relaxed max-w-[52ch] mb-10 opacity-0 animate-[fadeUp_600ms_ease-out_380ms_forwards]"
            >
              {tx.sub}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 opacity-0 animate-[fadeUp_600ms_ease-out_500ms_forwards]"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-amber text-canvas font-display font-bold text-sm tracking-widest uppercase px-7 py-3.5 rounded hover:bg-amber-dim transition-colors duration-200"
              >
                {tx.ctaPrimary}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-surface-up text-ink-muted text-sm px-7 py-3.5 rounded hover:border-ink-muted hover:text-ink transition-colors duration-200"
              >
                {tx.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="hidden lg:block opacity-0 animate-[fadeUp_700ms_ease-out_600ms_forwards]">
            <Terminal />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
