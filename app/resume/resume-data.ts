// ─── Bilingual resume data ────────────────────────────────────────────────────
// Importado por ResumeContent.tsx (client) e ResumePDF.tsx (server).
// Sem imports de Node.js — seguro para client bundle.

export type Lang = "pt" | "en";

export interface BilingualText {
  en: string;
  pt: string;
}

export interface ExperienceDetail {
  label: BilingualText;
  value: string; // tech values: shared across languages
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string | null; // null = present
  description: BilingualText;
  details: ExperienceDetail[];
  tech: string[];
  current: boolean;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  note: string;
  status: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

// ─── Experiences ─────────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [
  {
    company: "Thoughtworks",
    role: "Consultant Developer",
    start: "Apr 2022",
    end: null,
    description: {
      en: "Participate in daily meetings, deliver code aligned with acceptance criteria, showcase features to clients, create automated tests, facilitate retrospectives, organize releases, propose technical improvements, and mentor new team members. Currently contributing to a large-scale project for a US-based pharmaceutical company.",
      pt: "Participo de cerimônias ágeis, entrego código alinhado a critérios de aceite, apresento funcionalidades aos clientes, crio testes automatizados, facilito retrospectivas, organizo releases, proponho melhorias técnicas e mentoro novos membros do time. Atualmente contribuo em um projeto de larga escala para uma empresa farmacêutica americana.",
    },
    details: [
      {
        label: { en: "Languages", pt: "Linguagens" },
        value: "JavaScript, Java",
      },
      {
        label: { en: "Libraries", pt: "Bibliotecas" },
        value: "React, Styled Components, React Testing Library, Jest, JUnit",
      },
      {
        label: { en: "CI/CD", pt: "CI/CD" },
        value: "GitHub Actions + GCP, Jenkins, Argo CD",
      },
      {
        label: { en: "Agile", pt: "Gestão" },
        value: "JIRA, Azure DevOps, Trello",
      },
    ],
    tech: [
      "JavaScript", "Java", "React", "Spring Boot",
      "JUnit", "Jest", "PostgreSQL", "Jenkins",
      "Argo CD", "GitHub Actions", "GCP", "Azure DevOps",
    ],
    current: true,
  },
  {
    company: "Faculdade Descomplica",
    role: "Full Stack Developer",
    start: "Dec 2021",
    end: "Feb 2022",
    description: {
      en: "Worked on distance education projects, contributing to frontend and backend development.",
      pt: "Atuei em projetos de educação a distância, contribuindo no desenvolvimento frontend e backend.",
    },
    details: [
      {
        label: { en: "Frameworks", pt: "Frameworks" },
        value: "React, VueJS",
      },
      {
        label: { en: "Database", pt: "Banco de Dados" },
        value: "PostgreSQL",
      },
      {
        label: { en: "CI/CD", pt: "CI/CD" },
        value: "Jenkins + Spinnaker",
      },
      {
        label: { en: "Agile", pt: "Gestão" },
        value: "Shortcut (formerly Clubhouse)",
      },
    ],
    tech: ["React", "VueJS", "PostgreSQL", "Jenkins", "Spinnaker", "Git", "GitHub"],
    current: false,
  },
  {
    company: "Avanade",
    role: "Senior Software Engineer",
    start: "May 2018",
    end: "Dec 2021",
    description: {
      en: "Contributed to projects for a natural resources company and a leading healthcare organization. Responsible for bug fixes and improvements in NodeJS, Angular, and C# corporate API projects. Founded Programação Sem Pantim, a nonprofit initiative supporting career changers.",
      pt: "Contribuí em projetos para uma empresa do setor de recursos naturais e uma das maiores organizações de saúde do país. Responsável por correções e melhorias em projetos de APIs corporativas em NodeJS, Angular e C#. Fundei o Programação Sem Pantim, iniciativa sem fins lucrativos de apoio a pessoas em transição de carreira.",
    },
    details: [
      {
        label: { en: "Languages", pt: "Linguagens" },
        value: "NodeJS, Angular, C#",
      },
      {
        label: { en: "API Gateway", pt: "API Gateway" },
        value: "Sensedia",
      },
      {
        label: { en: "Container", pt: "Container" },
        value: "OpenShift (Kubernetes)",
      },
      {
        label: { en: "Database", pt: "Banco de Dados" },
        value: "SQL Server",
      },
      {
        label: { en: "DevOps", pt: "DevOps" },
        value: "Azure DevOps, GitLab",
      },
    ],
    tech: [
      "NodeJS", "Angular", "C#", "SQL Server",
      "Git", "GitLab", "Sensedia", "OpenShift", "Azure DevOps",
    ],
    current: false,
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILL_GROUPS: SkillGroup[] = [
  { label: "Languages",      skills: ["JavaScript", "TypeScript", "Java"] },
  { label: "Frontend",       skills: ["React", "Next.js", "VueJS", "HTML5", "CSS3", "Styled Components"] },
  { label: "Backend",        skills: ["Node.js", "Spring Boot", "REST APIs"] },
  { label: "Databases",      skills: ["PostgreSQL", "Firebase / Firestore", "SQL Server"] },
  { label: "DevOps & Cloud", skills: ["Git", "GitHub Actions", "Jenkins", "Argo CD", "OpenShift", "GCP", "Azure DevOps"] },
  { label: "Testing",        skills: ["Jest", "JUnit", "React Testing Library"] },
  { label: "API & Infra",    skills: ["Sensedia API Gateway", "Kubernetes", "CI/CD pipelines"] },
  { label: "Methodologies",  skills: ["Scrum", "Agile", "TDD"] },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const EDUCATION: Education[] = [
  {
    degree: "Analysis and Systems Development",
    institution: "UNIBRATEC",
    period: "Dec 2019",
    note: "Undergraduate",
    status: "Completed",
  },
  {
    degree: "English",
    institution: "SENAC-PE",
    period: "Jun 2021",
    note: "Language Course",
    status: "Upper Intermediate",
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────

export const CERTIFICATIONS: Certification[] = [
  { title: "Azure Fundamentals",                               issuer: "Microsoft" },
  { title: "JavaScript Algorithms and Data Structures",        issuer: "freeCodeCamp" },
  { title: "Responsive Web Design",                            issuer: "freeCodeCamp" },
  { title: "Entendendo TypeScript",                            issuer: "Udemy" },
  { title: "Build Dynamic Websites With JavaScript (1 & 2)",  issuer: "Udemy" },
  { title: "Learn and Understand NodeJS",                      issuer: "Udemy" },
  { title: "CSS Avançado: Sass, CSS Grid & CSS Modules",       issuer: "Udemy" },
  { title: "Linux Administration",                             issuer: "Udemy" },
  { title: "Extensão em Teste de Software",                    issuer: "UFMG" },
];

// ─── Summary bilingual ────────────────────────────────────────────────────────

export const SUMMARY: { paragraphs: BilingualText[] } = {
  paragraphs: [
    {
      en: "Started at Avanade in 2018 while pursuing a degree in Analysis and Systems Development, contributing to projects for a natural resources company and a leading healthcare organization. Gained expertise in SQL, ServiceNow, APIs, Kubernetes, SLA management, and client engagement. Founded Programação Sem Pantim, a nonprofit initiative supporting career changers.",
      pt: "Iniciei na Avanade em 2018, durante a graduação em Análise e Desenvolvimento de Sistemas, contribuindo em projetos para uma empresa do setor de recursos naturais e uma das maiores organizações de saúde do país. Adquiri experiência em SQL, ServiceNow, APIs, Kubernetes, gestão de SLA e relacionamento com clientes. Fundei o Programação Sem Pantim, iniciativa sem fins lucrativos de apoio a pessoas em transição de carreira.",
    },
    {
      en: "Joined Faculdade Descomplica as a Full Stack Developer in 2021, then selected for Thoughtworks University, collaborating with international teams from the US, Canada, Ecuador, and Chile. Served as an instructor for the Conexões Periféricas project, teaching web programming to underprivileged youth.",
      pt: "Ingressei na Faculdade Descomplica como Desenvolvedor Full Stack em 2021 e fui selecionado para a Thoughtworks University, onde colaborei com times internacionais dos EUA, Canadá, Equador e Chile. Atuei como instrutor no projeto Conexões Periféricas, ensinando programação web a jovens em situação de vulnerabilidade.",
    },
    {
      en: "Currently at Thoughtworks, working on a large-scale project for a US-based pharmaceutical company: Java backend (Spring Boot, JUnit), React + Next.js frontend, and PostgreSQL.",
      pt: "Atualmente na Thoughtworks, contribuindo em um projeto de larga escala para uma empresa farmacêutica americana: backend Java (Spring Boot, JUnit), frontend React + Next.js e PostgreSQL.",
    },
  ],
};
