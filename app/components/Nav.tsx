"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/app/i18n/context";
import translations from "@/app/i18n/translations";

export function Nav() {
  const { lang, setLang } = useLang();
  const tx = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#projects", label: tx.projects },
    { href: "#stack", label: tx.stack },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-canvas/90 backdrop-blur-md border-b border-surface"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight text-ink hover:text-amber transition-colors duration-200"
        >
          Gildo Neto
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="font-mono text-xs text-ink-muted hover:text-amber border border-surface-up hover:border-amber rounded px-2.5 py-1 transition-colors duration-200"
            aria-label={`Switch to ${lang === "pt" ? "English" : "Português"}`}
          >
            {tx.langSwitch}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="font-display font-bold text-sm tracking-widest uppercase text-amber border border-amber px-4 py-1.5 rounded hover:bg-amber hover:text-canvas transition-colors duration-200"
          >
            {tx.contact}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="font-mono text-xs text-ink-muted border border-surface-up rounded px-2 py-1"
            aria-label={`Switch to ${lang === "pt" ? "English" : "Português"}`}
          >
            {tx.langSwitch}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-ink-muted hover:text-ink p-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-canvas/95 backdrop-blur-md border-b border-surface px-6 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-ink-muted hover:text-ink text-sm py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-display font-bold text-sm tracking-widest uppercase text-amber border border-amber px-4 py-2 rounded text-center"
          >
            {tx.contact}
          </a>
        </div>
      )}
    </header>
  );
}
