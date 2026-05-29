"use client";

import { useLang } from "@/app/i18n/context";
import translations, { projectsMeta, type ProjectColor } from "@/app/i18n/translations";
import { useReveal } from "@/app/hooks/useReveal";

const colorMap: Record<
  ProjectColor,
  { bg: string; cardText: string; badgeBg: string; badgeText: string; glow: string }
> = {
  amber: {
    bg: "bg-proj-amber",
    cardText: "text-[oklch(0.09_0.006_55)]",
    badgeBg: "bg-[oklch(0.09_0.006_55_/_0.18)]",
    badgeText: "text-[oklch(0.09_0.006_55)]",
    glow: "hover:shadow-[0_12px_48px_oklch(0.76_0.18_52_/_0.35)]",
  },
  violet: {
    bg: "bg-proj-violet",
    cardText: "text-[oklch(0.96_0.003_85)]",
    badgeBg: "bg-[oklch(0.96_0.003_85_/_0.15)]",
    badgeText: "text-[oklch(0.96_0.003_85)]",
    glow: "hover:shadow-[0_12px_48px_oklch(0.62_0.22_305_/_0.4)]",
  },
  blue: {
    bg: "bg-proj-blue",
    cardText: "text-[oklch(0.96_0.003_85)]",
    badgeBg: "bg-[oklch(0.96_0.003_85_/_0.15)]",
    badgeText: "text-[oklch(0.96_0.003_85)]",
    glow: "hover:shadow-[0_12px_48px_oklch(0.64_0.2_250_/_0.4)]",
  },
  coral: {
    bg: "bg-proj-coral",
    cardText: "text-[oklch(0.09_0.006_55)]",
    badgeBg: "bg-[oklch(0.09_0.006_55_/_0.18)]",
    badgeText: "text-[oklch(0.09_0.006_55)]",
    glow: "hover:shadow-[0_12px_48px_oklch(0.62_0.22_25_/_0.4)]",
  },
};

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projectsMeta)[0];
  index: number;
  visible: boolean;
}) {
  const { lang } = useLang();
  const tx = translations[lang].projects;
  const item = tx.items[project.id as keyof typeof tx.items];
  const colors = colorMap[project.color];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[
        "reveal",
        visible ? "visible" : "",
        `reveal-delay-${index + 1}`,
        "relative overflow-hidden rounded-2xl p-7 flex flex-col justify-between min-h-[300px]",
        "transition-transform duration-200 hover:-translate-y-1",
        colors.bg,
        colors.glow,
      ].join(" ")}
    >
      {/* Background number */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-4 right-5 font-display font-extrabold leading-none select-none pointer-events-none",
          colors.cardText,
          "opacity-10",
        ].join(" ")}
        style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
      >
        {num}
      </span>

      {/* Header */}
      <div className="relative z-10">
        {/* Status badge */}
        <span
          className={[
            "inline-block font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded mb-5",
            colors.badgeBg,
            colors.cardText,
          ].join(" ")}
        >
          {tx.status[project.status]}
        </span>

        <h3
          className={[
            "font-display font-extrabold leading-tight mb-3",
            colors.cardText,
          ].join(" ")}
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)" }}
        >
          {item.name}
        </h3>

        <p className={["text-sm leading-relaxed max-w-[38ch] opacity-90", colors.cardText].join(" ")}>
          {item.desc}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between mt-8">
        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={[
                "font-mono text-[10px] tracking-wide px-2 py-0.5 rounded",
                colors.badgeBg,
                colors.cardText,
              ].join(" ")}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "flex items-center gap-1.5 font-mono text-xs font-medium whitespace-nowrap ml-4 hover:opacity-70 transition-opacity",
              colors.cardText,
            ].join(" ")}
            aria-label={`${tx.viewProject}: ${item.name}`}
          >
            {tx.viewProject}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { lang } = useLang();
  const tx = translations[lang].projects;
  const { ref, visible } = useReveal();

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className={`reveal ${visible ? "visible" : ""} mb-14`}>
          <p className="font-mono text-xs text-terminal tracking-widest uppercase mb-3">
            ./projects
          </p>
          <h2
            className="font-display font-extrabold text-ink leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            {tx.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectsMeta.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
