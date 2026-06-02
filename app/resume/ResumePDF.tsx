// Server-only — never imported in client components.
// @react-pdf/renderer runs in Node.js only.

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import {
  type Lang,
  EXPERIENCES,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATIONS,
  SUMMARY,
} from "./resume-data";

// ─── Design tokens ────────────────────────────────────────────────────────────

const AMBER   = "#D97706"; // oklch(0.76 0.18 52) → print-safe amber
const INK     = "#1a1a1a";
const MUTED   = "#6b7280";
const SURFACE = "#f3f4f6";
const WHITE   = "#ffffff";
const TERMINAL_GREEN = "#1a7a4a";

// ─── Stylesheet ───────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: INK,
    backgroundColor: WHITE,
    paddingTop: 44,
    paddingBottom: 44,
    paddingLeft: 50,
    paddingRight: 50,
  },

  // Header
  header: { marginBottom: 18 },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 26,
    color: AMBER,
    lineHeight: 1,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  titleLine: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: INK,
    marginBottom: 3,
  },
  pwdLine: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: MUTED,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  contactItem: {
    fontSize: 8.5,
    color: MUTED,
    marginRight: 12,
  },
  contactLink: {
    fontSize: 8.5,
    color: AMBER,
    textDecoration: "none",
    marginRight: 12,
  },

  // Section
  section: { marginTop: 14 },
  sectionSlug: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: TERMINAL_GREEN,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: INK,
    marginBottom: 6,
  },
  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: AMBER,
    marginBottom: 10,
  },

  // Experience entry
  expEntry: { marginBottom: 12 },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 1,
  },
  expCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
  },
  expCompanyCurrent: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: AMBER,
  },
  expPeriod: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: MUTED,
  },
  expRole: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 8.5,
    color: TERMINAL_GREEN,
    marginBottom: 4,
  },
  expDesc: {
    fontSize: 9,
    color: INK,
    lineHeight: 1.5,
    marginBottom: 5,
    maxWidth: "85%",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 1.5,
  },
  detailLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: MUTED,
    width: 70,
  },
  detailValue: {
    fontSize: 8,
    color: INK,
    flex: 1,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 5,
  },
  techBadge: {
    fontFamily: "Courier",
    fontSize: 7.5,
    color: TERMINAL_GREEN,
    backgroundColor: SURFACE,
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    borderRadius: 2,
  },

  // Skills
  skillGroup: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  skillGroupLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: MUTED,
    width: 80,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingTop: 1.5,
  },
  skillBadgesWrap: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillBadge: {
    fontFamily: "Courier",
    fontSize: 7.5,
    color: AMBER,
    backgroundColor: "#fef3c7",
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    borderRadius: 2,
  },

  // Education
  eduEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    marginBottom: 1,
  },
  eduInstitution: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 8.5,
    color: TERMINAL_GREEN,
    marginBottom: 1,
  },
  eduNote: {
    fontSize: 8,
    color: MUTED,
  },
  eduPeriod: {
    fontSize: 8.5,
    color: MUTED,
  },

  // Certifications
  certItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  certDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: AMBER,
    marginTop: 2.5,
    marginRight: 6,
  },
  certTitle: {
    fontSize: 9,
    color: INK,
    flex: 1,
  },
  certIssuer: {
    fontFamily: "Courier",
    fontSize: 7.5,
    color: MUTED,
    marginLeft: 4,
  },
});

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionSlug}>./{slug}</Text>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.divider} />
      {children}
    </View>
  );
}

// ─── Labels bilíngues do documento ───────────────────────────────────────────

const DOC_LABELS = {
  en: {
    summary: "Professional Summary",
    experience: "Work Experience",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    present: "Present",
  },
  pt: {
    summary: "Resumo Profissional",
    experience: "Experiência",
    skills: "Habilidades",
    education: "Formação",
    certifications: "Certificações",
    present: "Presente",
  },
};

// ─── Document component ───────────────────────────────────────────────────────

export function ResumePDF({ lang }: { lang: Lang }) {
  const labels = DOC_LABELS[lang];

  return (
    <Document
      title={`Gildo Neto — Resume ${lang === "pt" ? "(PT-BR)" : "(EN)"}`}
      author="Gildo Neto"
      subject="Full Stack Developer Resume"
    >
      <Page size="A4" style={s.page}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <View style={s.header}>
          <Text style={s.name}>GILDO NETO</Text>
          <Text style={s.titleLine}>Full Stack Developer</Text>
          <Text style={s.pwdLine}>PwD · Brazil, Recife, Pernambuco</Text>
          <View style={s.contactRow}>
            <Link src="mailto:gildoneto@hotmail.com" style={s.contactLink}>
              gildoneto@hotmail.com
            </Link>
            <Link src="https://www.linkedin.com/in/gildoneto/" style={s.contactLink}>
              linkedin.com/in/gildoneto
            </Link>
            <Link src="https://github.com/gildoneto" style={s.contactLink}>
              github.com/gildoneto
            </Link>
          </View>
        </View>

        {/* ── Professional Summary ────────────────────────────────────── */}
        <Section slug="summary" title={labels.summary}>
          {SUMMARY.paragraphs.map((p, i) => (
            <Text
              key={i}
              style={{ fontSize: 9, color: INK, lineHeight: 1.55, marginBottom: 5 }}
            >
              {p[lang]}
            </Text>
          ))}
        </Section>

        {/* ── Work Experience ─────────────────────────────────────────── */}
        <Section slug="experience" title={labels.experience}>
          {EXPERIENCES.map((exp) => (
            <View key={exp.company} style={s.expEntry} wrap={false}>
              <View style={s.expHeader}>
                <Text style={exp.current ? s.expCompanyCurrent : s.expCompany}>
                  {exp.company}
                  {exp.current ? "  ●" : ""}
                </Text>
                <Text style={s.expPeriod}>
                  {exp.start} — {exp.end ?? labels.present}
                </Text>
              </View>
              <Text style={s.expRole}>{exp.role}</Text>
              <Text style={s.expDesc}>{exp.description[lang]}</Text>

              {/* Detail rows */}
              <View style={{ paddingLeft: 8, borderLeftWidth: 1, borderLeftColor: SURFACE }}>
                {exp.details.map((d, i) => (
                  <View key={i} style={s.detailRow}>
                    <Text style={s.detailLabel}>{d.label[lang]}</Text>
                    <Text style={s.detailValue}>{d.value}</Text>
                  </View>
                ))}
              </View>

              {/* Tech badges */}
              <View style={s.techRow}>
                {exp.tech.map((t) => (
                  <Text key={t} style={s.techBadge}>{t}</Text>
                ))}
              </View>
            </View>
          ))}
        </Section>

        {/* ── Skills ──────────────────────────────────────────────────── */}
        <Section slug="skills" title={labels.skills}>
          {SKILL_GROUPS.map((group) => (
            <View key={group.label} style={s.skillGroup}>
              <Text style={s.skillGroupLabel}>{group.label}</Text>
              <View style={s.skillBadgesWrap}>
                {group.skills.map((skill) => (
                  <Text key={skill} style={s.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
          ))}
        </Section>

        {/* ── Education ───────────────────────────────────────────────── */}
        <Section slug="education" title={labels.education}>
          {EDUCATION.map((edu) => (
            <View key={edu.degree} style={s.eduEntry} wrap={false}>
              <View>
                <Text style={s.eduDegree}>{edu.degree}</Text>
                <Text style={s.eduInstitution}>{edu.institution}</Text>
                <Text style={s.eduNote}>{edu.note} · {edu.status}</Text>
              </View>
              <Text style={s.eduPeriod}>{edu.period}</Text>
            </View>
          ))}
        </Section>

        {/* ── Certifications ──────────────────────────────────────────── */}
        <Section slug="certifications" title={labels.certifications}>
          {CERTIFICATIONS.map((cert) => (
            <View key={cert.title} style={s.certItem}>
              <View style={s.certDot} />
              <Text style={s.certTitle}>{cert.title}</Text>
              <Text style={s.certIssuer}>· {cert.issuer}</Text>
            </View>
          ))}
        </Section>

      </Page>
    </Document>
  );
}
