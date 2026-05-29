"use client";

import { useLang } from "@/app/i18n/context";
import translations from "@/app/i18n/translations";

export function Footer() {
  const { lang } = useLang();
  const tx = translations[lang].footer;

  return (
    <footer className="border-t border-surface py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-ink-muted">
          {tx.made}{" "}
          <span className="text-amber" aria-label="Next.js and TypeScript">
            Next.js + TypeScript
          </span>{" "}
          {tx.by}
        </span>
        <span className="font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
