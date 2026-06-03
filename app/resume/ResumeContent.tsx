"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useLang } from "@/app/i18n/context";
import translations from "@/app/i18n/translations";
import {
  type Certification,
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
      style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
    >
      {children}
    </h2>
  );
}

// ─── Download button — fetch+blob with loading/error state ───────────────────

type DownloadState = "idle" | "loading" | "error";

function DownloadButton({
  lang,
  label,
  active,
  currentLang,
}: {
  lang: "pt" | "en";
  label: string;
  active: boolean;
  currentLang: "pt" | "en";
}) {
  const [state, setState] = useState<DownloadState>("idle");

  const handleDownload = async () => {
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch(`/api/resume/download?lang=${lang}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Gildo-Neto-Resume-${lang.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      track("resume_download", { lang });
      setState("idle");
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  const loadingLabel = currentLang === "pt" ? "Gerando..." : "Generating...";
  const errorLabel   = currentLang === "pt" ? "Erro — tente de novo" : "Error — try again";

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={state === "loading"}
      aria-label={`Download resume in ${lang === "pt" ? "Portuguese" : "English"}`}
      className={[
        "no-print inline-flex items-center gap-1.5 font-display font-bold text-xs",
        "tracking-widest uppercase px-4 py-2.5 rounded",
        "transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        state === "error"
          ? "bg-surface border border-proj-coral text-proj-coral"
          : active
          ? "bg-amber text-canvas hover:bg-amber-dim"
          : "bg-surface border border-surface-up text-ink hover:border-amber hover:text-amber",
      ].join(" ")}
    >
      {state === "loading" ? (
        <svg
          className="animate-spin"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="5.5" cy="5.5" r="4"
            stroke="currentColor" strokeWidth="1.5"
            strokeDasharray="18" strokeDashoffset="9"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path
            d="M5.5 1v6M3 5l2.5 2.5L8 5M1.5 9h8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {state === "loading" ? loadingLabel : state === "error" ? errorLabel : label}
    </button>
  );
}

// ─── Certificate theater modal ────────────────────────────────────────────────

function CertModal({
  cert,
  lang,
  onClose,
}: {
  cert: Certification;
  lang: "pt" | "en";
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Track image load failure — falls back to styled card when file doesn't exist yet
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(cert.image) && !imgFailed;

  const verifyLabel = lang === "pt" ? "Verificar certificado ↗" : "Verify certificate ↗";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/85 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div className="relative w-full max-w-xl bg-surface rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-canvas/60 text-ink-muted hover:text-ink hover:bg-canvas/80 transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Certificate image or fallback */}
        {showImage ? (
          <div className="relative w-full aspect-[4/3] bg-canvas">
            <Image
              src={cert.image!}
              alt={cert.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 576px"
              onError={() => setImgFailed(true)}
            />
          </div>
        ) : (
          /* Fallback: styled card when image isn't available yet */
          <div className="w-full aspect-[4/3] bg-canvas flex flex-col items-center justify-center gap-4 p-8">
            <span className="font-mono text-xs text-terminal tracking-widest uppercase">
              {cert.issuer}
            </span>
            <p
              className="font-display font-extrabold text-amber text-center leading-tight"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
            >
              {cert.title}
            </p>
            <span className="font-mono text-xs text-ink-muted">
              {lang === "pt" ? "Screenshot em breve" : "Screenshot coming soon"}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="p-5 flex items-start justify-between gap-4">
          <div>
            <p
              className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
            >
              {cert.title}
            </p>
            <p className="font-mono text-xs text-ink-muted mt-1">{cert.issuer}</p>
            {cert.authNote && (
              <p className="font-mono text-[10px] text-ink-muted mt-1">
                auth: {cert.authNote}
              </p>
            )}
          </div>

          {cert.url && (
            <button
              type="button"
              onClick={() => { window.open(cert.url, "_blank", "noopener,noreferrer"); onClose(); }}
              className="shrink-0 inline-flex items-center gap-1.5 bg-amber text-canvas font-display font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded hover:bg-amber-dim transition-colors duration-200"
            >
              {verifyLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResumeContent() {
  const { lang, setLang } = useLang();
  const tx = translations[lang].resume;
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <>
    {activeCert && (
      <CertModal
        cert={activeCert}
        lang={lang}
        onClose={() => setActiveCert(null)}
      />
    )}
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
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
            <a
              href="mailto:gildoneto@hotmail.com"
              className="font-mono text-xs text-amber hover:text-amber-dim transition-colors"
            >
              gildoneto@hotmail.com
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

          {/* Language toggle + Download buttons */}
          <div className="flex flex-wrap items-center gap-3 no-print">
            {/* Inline language toggle */}
            <div
              className="font-mono text-[11px] tracking-widest uppercase flex items-center gap-1.5 mr-1"
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLang("pt")}
                aria-pressed={lang === "pt"}
                className={[
                  "transition-colors duration-150",
                  lang === "pt"
                    ? "text-amber cursor-default"
                    : "text-ink-muted hover:text-amber cursor-pointer",
                ].join(" ")}
              >
                PT-BR
              </button>
              <span className="text-surface-up" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={[
                  "transition-colors duration-150",
                  lang === "en"
                    ? "text-amber cursor-default"
                    : "text-ink-muted hover:text-amber cursor-pointer",
                ].join(" ")}
              >
                EN
              </button>
            </div>

            <DownloadButton
              lang="pt"
              label="↓ PT-BR"
              active={lang === "pt"}
              currentLang={lang}
            />
            <DownloadButton
              lang="en"
              label="↓ EN"
              active={lang === "en"}
              currentLang={lang}
            />
          </div>
        </header>

        {/* ── Professional Summary ───────────────────────────────────────── */}
        <section id="summary" className="pt-12 border-t border-surface print-keep-together">
          <SectionLabel slug="summary" />
          <SectionHeading>{tx.summary}</SectionHeading>

          <div className="space-y-4 text-base text-ink-muted leading-relaxed max-w-[70ch]">
            {SUMMARY.paragraphs.map((p, i) => {
              const isLast = i === SUMMARY.paragraphs.length - 1;
              if (!isLast) return <p key={i}>{p[lang]}</p>;

              // Last paragraph: highlight current employer inline
              return (
                <p key={i}>
                  {lang === "pt" ? (
                    <>
                      Atualmente na{" "}
                      <span className="text-amber font-medium">Thoughtworks</span>
                      {", contribuindo em um projeto de larga escala para uma empresa farmacêutica americana: backend Java (Spring Boot, JUnit), frontend React + Next.js e PostgreSQL."}
                    </>
                  ) : (
                    <>
                      Currently at{" "}
                      <span className="text-amber font-medium">Thoughtworks</span>
                      {", working on a large-scale project for a US-based pharmaceutical company: Java backend (Spring Boot, JUnit), React + Next.js frontend, and PostgreSQL."}
                    </>
                  )}
                </p>
              );
            })}
          </div>
        </section>

        {/* ── Work Experience ────────────────────────────────────────────── */}
        <section id="experience" className="mt-16 pt-12 border-t border-surface">
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
                    style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
                  >
                    {exp.company}
                    {exp.current && (
                      <span className="ml-3 font-mono text-[10px] text-amber-dim tracking-widest uppercase align-middle">
                        ● active
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-ink-muted shrink-0">
                    {exp.start} — {exp.end ?? tx.present}
                  </span>
                </div>

                <p className="font-mono text-xs text-terminal mb-4">{exp.role}</p>

                <p className="text-base text-ink-muted leading-relaxed max-w-[65ch] mb-5">
                  {exp.description[lang]}
                </p>

                {/* Detail rows — categorized tooling context */}
                <div className="space-y-1.5 pl-3 border-l border-surface">
                  {exp.details.map((d, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className="font-mono text-ink-muted w-24 shrink-0">
                        {d.label[lang]}
                      </span>
                      <span className="text-sm text-ink-muted">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────────────────── */}
        <section id="skills" className="mt-16 pt-12 border-t border-surface">
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
        <section id="education" className="mt-16 pt-12 border-t border-surface print-keep-together">
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
        <section id="certifications" className="mt-16 pt-12 border-t border-surface print-keep-together">
          <SectionLabel slug="certifications" />
          <SectionHeading>{tx.certifications}</SectionHeading>

          <ul className="space-y-3">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.title} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-amber shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="text-base text-ink hover:text-amber transition-colors duration-200 text-left"
                  >
                    {cert.title}
                    <span className="text-amber-dim ml-1 text-sm" aria-hidden="true">⊕</span>
                  </button>
                  <span className="font-mono text-[10px] text-ink-muted ml-2">
                    · {cert.issuer}
                  </span>
                  {cert.authNote && (
                    <span className="font-mono text-[10px] text-ink-muted block mt-0.5">
                      auth: {cert.authNote}
                    </span>
                  )}
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
    </>
  );
}
