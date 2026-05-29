"use client";

import { useEffect, useState } from "react";

type LineType = "command" | "output" | "blank";

interface Line {
  type: LineType;
  text: string;
  delay: number;
}

const LINES: Line[] = [
  { type: "command", text: "whoami", delay: 400 },
  { type: "output", text: "  gildo neto — full-stack dev", delay: 60 },
  { type: "blank", text: "", delay: 200 },
  { type: "command", text: "stack --list", delay: 300 },
  { type: "output", text: "  ▸ Next.js  ▸ TypeScript", delay: 60 },
  { type: "output", text: "  ▸ Firebase  ▸ React Native", delay: 60 },
  { type: "blank", text: "", delay: 200 },
  { type: "command", text: "git log --oneline -3", delay: 300 },
  { type: "output", text: "  a2f3c1 launched biblioteca da mari", delay: 60 },
  { type: "output", text: "  8b9d4a add setlist autoplay", delay: 60 },
  { type: "output", text: "  c7e2f9 band finance dashboard", delay: 60 },
  { type: "blank", text: "", delay: 200 },
];

export function Terminal() {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || shown >= LINES.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), LINES[shown].delay);
    return () => clearTimeout(t);
  }, [started, shown]);

  return (
    <div
      role="img"
      aria-label="Terminal showing Gildo's tech stack and recent project commits"
      className="rounded-xl border border-surface-up bg-surface overflow-hidden select-none"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-up">
        <span className="w-3 h-3 rounded-full bg-proj-coral opacity-80" />
        <span className="w-3 h-3 rounded-full bg-proj-amber opacity-80" />
        <span className="w-3 h-3 rounded-full bg-terminal opacity-80" />
        <span className="ml-3 font-mono text-xs text-ink-muted">
          gildo@dev — ~
        </span>
      </div>

      {/* Content */}
      <div className="px-5 py-4 font-mono text-[0.8125rem] leading-relaxed min-h-[220px]">
        {LINES.slice(0, shown).map((line, i) => {
          if (line.type === "blank") return <div key={i} className="h-2" />;
          if (line.type === "command") {
            return (
              <div key={i} className="flex items-baseline">
                <span className="text-amber mr-2">$</span>
                <span className="text-ink">{line.text}</span>
              </div>
            );
          }
          return (
            <div key={i} className="text-terminal">
              {line.text}
            </div>
          );
        })}

        {/* Cursor line */}
        <div className="flex items-baseline mt-0.5">
          <span className="text-amber mr-2">$</span>
          {shown < LINES.length ? null : <span className="cursor" />}
        </div>
      </div>
    </div>
  );
}
