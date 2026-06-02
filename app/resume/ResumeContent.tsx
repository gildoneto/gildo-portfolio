"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLang } from "@/app/i18n/context";
import translations from "@/app/i18n/translations";
import {
  EXPERIENCES,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATIONS,
  SUMMARY,
} from "./resume-data";

// ─── Section chrome helpers ───────────────────────────────────────────────────

function SectionLabel({ slug }: { slug: string }) {
  return (
    <p className="font-mono text-[11px] text-terminal tracking-widest uppercase mb-2">
      ./{slug}
    </p>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display font-bold text-ink mb-8"
      style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
    >
      {children}
    </h2>
  );
}

// ─── Download button ─────────────────────────────────────────────────────────

function DownloadButton({
  lang,
  label,
}: {
  lang: "pt" | "en";
  label: string;
}) {
  return (
    <a
      href={`/api/resume/download?lang=${lang}`}
      className="no-print inline-flex items-center gap-1.5 bg-surface border border-surface-up text-ink font-display font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded hover:border-amber hover:text-amber transition-colors duration-200"
      aria-label={`Download resume in ${lang === "pt" ? "Portuguese" : "English"}`}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="M5.5 1v6M3 5l2.5 2.5L8 5M1.5 9h8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResumeContent() {
  const { lang } = useLang();
  const tx = translations[lang].resume;

  return (
    <main className="min-h-screen bg-canvas pt-24 pb-28">
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="mb-16">
          <p className="font-mono text-[11px] text-terminal tracking-widest uppercase mb-6">
            ./resume
          </p>

          <div className="flex items-start gap-6 mb-6">
            {/* Photo */}
            <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-surface-up">
              <Image
                src="/gildo-laptop.jpg"
                alt="Gildo Neto"
                fill
                className="object-cover object-top"
                sizes="80px"
                priority
              />
            </div>

            {/* Identity */}
            <div>
              <h1
                className="font-display font-extrabold text-ink leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}
              >
                GILDO NETO
              </h1>
              <p
                className="font-display font-bold text-amber mt-2"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}
              >
                Full Stack Developer
              </p>
              <p className="font-mono text-xs text-ink-muted mt-1.5">
                PwD · Brazil, Recife · Open to worldwide
              </p>
            </div>
          </div>

          {/* Contact row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            <a
              href="mailto:gildoneto@hotmail.com"
              className="font-mono text-xs text-amber hover:text-amber-dim transition-colors"
            >
              gildoneto@hotmail.com
            </a>
            <a
              href="tel:+5581998642055"
              className="font-mono text-xs text-ink-muted hover:text-amber transition-colors"
            >
              +55 (81) 9-9864-2055
            </a>
            <a
              href="https://www.linkedin.com/in/gildoneto/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ink-muted hover:text-amber transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/gildoneto"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ink-muted hover:text-amber transition-colors"
            >
              GitHub ↗
            </a>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-3 no-print">
            <DownloadButton lang="pt" label={`↓ PT-BR`} />
            <DownloadButton lang="en" label={`↓ EN`} />
          </div>
        </header>

        {/* ── Professional Summary ───────────────────────────────────────── */}
        <section className="pt-12 border-t border-surface print-keep-together">
          <SectionLabel slug="summary" />
          <SectionHeading>{tx.summary}</SectionHeading>

          <div className="space-y-4 text-sm text-ink-muted leading-relaxed max-w-[70ch]">
            {SUMMARY.paragraphs.map((p, i) => {
              const isLast = i === SUMMARY.paragraphs.length - 1;
              return (
                <p key={i}>
                  {isLast ? (
                    <>
                      {lang === "pt" ? (
                        <>
                          Atualmente na{" "}
                          <span className="text-amber font-medium">Thoughtworks</span>
                          {p.pt.replace("Atualmente na Thoughtworks,", ",")}
                        </>
                      ) : (
                        <>
                          Currently at{" "}
                          <span className="text-amber font-medium">Thoughtworks</span>
                          {p.en.replace("Currently at Thoughtworks,", ",")}
                        </>
                      )}
                    </>
                  ) : (
                    p[lang]
                  )}
                </p>
              );
            })}
          </div>
        </section>

        {/* ── Work Experience ────────────────────────────────────────────── */}
        <section className="mt-16 pt-12 border-t border-surface">
          <SectionLabel slug="experience" />
          <SectionHeading>{tx.experience}</SectionHeading>

          <div className="space-y-12">
            {EXPERIENCES.map((exp) => (
              <div key={exp.company} className="print-keep-together">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3
                    className={`font-display font-bold ${
                      exp.current ? "text-amber" : "text-ink"
                    }`}
                    style={{ fontSize: "clamp(1.1rem, 3vw, 1.35rem)" }}
                  >
                    {exp.company}
                    {exp.current && (
                      <span className="ml-3 font-mono text-[10px] text-amber/70 tracking-widest uppercase align-middle">
                        ● active
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-ink-muted shrink-0">
                    {exp.start} — {exp.end ?? tx.present}
                  </span>
                </div>

                <p className="font-mono text-xs text-terminal mb-4">{exp.role}</p>

                <p className="text-sm text-ink-muted leading-relaxed max-w-[65ch] mb-5">
                  {exp.description[lang]}
                </p>

                <div className="space-y-1.5 mb-5 pl-3 border-l border-surface">
                  {exp.details.map((d, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className="font-mono text-ink-muted w-24 shrink-0">
                        {d.label[lang]}
                      </span>
                      <span className="text-ink-muted">{d.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-terminal bg-surface border border-surface-up rounded px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────────────────── */}
        <section className="mt-16 pt-12 border-t border-surface">
          <SectionLabel slug="skills" />
          <SectionHeading>{tx.skills}</SectionHeading>

          <div className="space-y-5">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.label}
                className="flex flex-wrap sm:flex-nowrap items-start gap-3"
              >
                <span className="font-mono text-[10px] text-ink-muted tracking-widest uppercase pt-0.5 w-28 shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] text-amber bg-surface border border-amber/20 rounded px-2.5 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ─────────────────────────────────────────────────── */}
        <section className="mt-16 pt-12 border-t border-surface print-keep-together">
          <SectionLabel slug="education" />
          <SectionHeading>{tx.education}</SectionHeading>

          <div className="space-y-6">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1"
              >
                <div>
                  <p className="font-display font-bold text-ink text-base">{edu.degree}</p>
                  <p className="font-mono text-xs text-terminal mt-0.5">{edu.institution}</p>
                  <p className="text-xs text-ink-muted mt-1">
                    {edu.note} · {edu.status}
                  </p>
                </div>
                <span className="font-mono text-xs text-ink-muted shrink-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ────────────────────────────────────────────── */}
        <section className="mt-16 pt-12 border-t border-surface print-keep-together">
          <SectionLabel slug="certifications" />
          <SectionHeading>{tx.certifications}</SectionHeading>

          <ul className="space-y-3">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.title} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="text-sm text-ink">{cert.title}</span>
                  <span className="font-mono text-[10px] text-ink-muted ml-2">
                    · {cert.issuer}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Back link ─────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-surface no-print">
          <a
            href="/"
            className="font-mono text-xs text-ink-muted hover:text-amber transition-colors duration-200"
          >
            {tx.back}
          </a>
        </div>

      </div>
    </main>
  );
}
