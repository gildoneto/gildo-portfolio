"use client";

import { useRef } from "react";
import { useLang } from "@/app/i18n/context";
import translations, { stackItems } from "@/app/i18n/translations";
import { useReveal } from "@/app/hooks/useReveal";

export function Stack() {
  const { lang } = useLang();
  const tx = translations[lang].stack;
  const { ref, visible } = useReveal();

  const categories = [
    { key: "frontend" as const, items: stackItems.frontend },
    { key: "backend" as const, items: stackItems.backend },
    { key: "mobile" as const, items: stackItems.mobile },
    { key: "tools" as const, items: stackItems.tools },
  ];

  return (
    <section
      id="stack"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 border-t border-surface"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className={`reveal ${visible ? "visible" : ""} mb-16`}>
          <p className="font-mono text-xs text-terminal tracking-widest uppercase mb-3">
            ./stack
          </p>
          <h2
            className="font-display font-extrabold text-ink leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            {tx.title}
          </h2>
        </div>

        {/* Terminal-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface">
          {categories.map((cat, ci) => (
            <div
              key={cat.key}
              className={[
                "reveal",
                visible ? "visible" : "",
                `reveal-delay-${ci + 1}`,
                "bg-canvas px-6 py-8",
              ].join(" ")}
            >
              {/* Category label */}
              <p className="font-mono text-[10px] text-terminal tracking-widest uppercase mb-5">
                {`// ${tx.categories[cat.key]}`}
              </p>

              {/* Tech items */}
              <ul className="flex flex-col gap-3">
                {cat.items.map((tech) => (
                  <li key={tech} className="flex items-center gap-2.5">
                    <span
                      className="w-1 h-1 rounded-full bg-amber flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-sm text-ink">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
