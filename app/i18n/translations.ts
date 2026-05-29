export type Lang = "pt" | "en";

export type ProjectStatus = "live" | "wip";
export type ProjectColor =
  | "amber"
  | "blue"
  | "violet"
  | "coral"
  | "lime"
  | "teal";

export interface ProjectMeta {
  id: string;
  url?: string;
  stack: string[];
  color: ProjectColor;
  status: ProjectStatus;
}

export const projectsMeta: ProjectMeta[] = [
  {
    id: "memorial-marizeide",
    url: "https://memorial-marizeide.vercel.app/",
    stack: ["Next.js", "Firebase", "TypeScript"],
    color: "amber",
    status: "live",
  },
  {
    id: "mini-setlist",
    url: "https://mini-setlist.vercel.app/",
    stack: ["Next.js", "React Native", "Firebase"],
    color: "violet",
    status: "wip",
  },
  {
    id: "band-manager",
    url: "https://band-manager-web.vercel.app/",
    stack: ["Next.js", "React Native", "Firebase"],
    color: "blue",
    status: "wip",
  },
  {
    id: "psi-nayara",
    url: "https://psi-nayara-sales.vercel.app/",
    stack: ["Next.js", "Tailwind CSS"],
    color: "coral",
    status: "live",
  },
  {
    id: "daily-rotation",
    url: "https://gildoneto.github.io/daily-rotation/",
    stack: ["JavaScript", "GitHub Pages"],
    color: "lime",
    status: "live",
  },
  {
    id: "coque-connecta",
    url: "https://site-coque-staging.onrender.com/",
    stack: ["Next.js", "Firebase"],
    color: "teal",
    status: "wip",
  },
];

export const stackItems = {
  frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  backend: ["Firebase", "Firestore", "Cloud Functions", "Node.js"],
  mobile: ["React Native", "Expo"],
  tools: ["Git", "Vercel", "GitHub Actions", "Figma"],
};

const translations = {
  pt: {
    nav: {
      projects: "Projetos",
      stack: "Stack",
      contact: "Contato",
      langSwitch: "EN",
    },
    hero: {
      line1: "DO PROBLEMA",
      line2: "AO PRODUTO.",
      sub: "8 anos construindo plataformas web com Next.js, Firebase e TypeScript. Aqui você fala com alguém que entende o problema de negócio antes de escrever a primeira linha.",
      ctaPrimary: "Vamos conversar",
      ctaSecondary: "Ver projetos",
    },
    projects: {
      title: "Projetos que resolvem problemas",
      viewProject: "Ver projeto",
      items: {
        "memorial-marizeide": {
          name: "Memorial de Marizeide",
          desc: "Depois da partida de Marizeide, seu acervo de livros ganhou vida própria — distribuído para a comunidade que ela amava.",
        },
        "mini-setlist": {
          name: "Mini Setlist",
          desc: "Para o músico que não pode perder tempo no palco. Cifras, setlists e autoplay numa tela só.",
        },
        "band-manager": {
          name: "Band Manager",
          desc: "A parte que os músicos odeiam: contas, pagamentos e agenda. Finalmente organizado.",
        },
        "psi-nayara": {
          name: "Psi Nayara Sales",
          desc: "Uma psicóloga que precisava crescer online. Landing page focada em converter visitantes em pacientes.",
        },
        "daily-rotation": {
          name: "Daily Rotation",
          desc: "O time perdia tempo decidindo quem conduz a daily. Um sorteador instantâneo resolveu de vez.",
        },
        "coque-connecta": {
          name: "Coque Connecta",
          desc: "Trabalho voluntário para dar visibilidade à ONG Coque Connecta e à comunidade que ela serve.",
        },
      },
      status: {
        live: "Finalizado",
        wip: "Em construção",
      },
    },
    stack: {
      title: "Stack",
      categories: {
        frontend: "Frontend",
        backend: "Backend & Cloud",
        mobile: "Mobile",
        tools: "Ferramentas",
      },
    },
    contact: {
      title: "Tem um projeto em mente?",
      sub: "Me conta o que você precisa construir. Sem formulário interminável — só uma conversa direta.",
      fields: {
        name: "Nome",
        email: "E-mail",
        whatsapp: "WhatsApp / Celular",
        project: "O que você está construindo?",
        message: "Mensagem",
      },
      placeholders: {
        name: "Seu nome",
        email: "seu@email.com",
        whatsapp: "(11) 99999-9999",
        project: "Descreva brevemente o projeto...",
        message: "Mais detalhes, prazo, contexto...",
      },
      submit: "Enviar mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada. Entro em contato em breve.",
      error: "Algo deu errado. Tente novamente.",
    },
    footer: {
      made: "Feito com",
      by: "por Gildo Neto",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      stack: "Stack",
      contact: "Contact",
      langSwitch: "PT",
    },
    hero: {
      line1: "FROM PROBLEM",
      line2: "TO PRODUCT.",
      sub: "8 years building web platforms with Next.js, Firebase, and TypeScript. A developer who understands the business problem before writing a single line of code.",
      ctaPrimary: "Let's talk",
      ctaSecondary: "See projects",
    },
    projects: {
      title: "Projects that solve real problems",
      viewProject: "View project",
      items: {
        "memorial-marizeide": {
          name: "Memorial de Marizeide",
          desc: "After Marizeide's passing, her personal library found new life — shared with the community she loved.",
        },
        "mini-setlist": {
          name: "Mini Setlist",
          desc: "For musicians who can't afford downtime on stage. Chord charts, setlists, and auto-scroll in one place.",
        },
        "band-manager": {
          name: "Band Manager",
          desc: "The part musicians hate: bills, payments, and booking. Finally organized.",
        },
        "psi-nayara": {
          name: "Psi Nayara Sales",
          desc: "A psychologist who needed to grow online. A landing page built to turn visitors into patients.",
        },
        "daily-rotation": {
          name: "Daily Rotation",
          desc: "The team wasted time deciding who runs today's daily. An instant draw solved it for good.",
        },
        "coque-connecta": {
          name: "Coque Connecta",
          desc: "Volunteer work to give visibility to Coque Connecta NGO and the community it serves.",
        },
      },
      status: {
        live: "Live",
        wip: "In development",
      },
    },
    stack: {
      title: "Stack",
      categories: {
        frontend: "Frontend",
        backend: "Backend & Cloud",
        mobile: "Mobile",
        tools: "Tools",
      },
    },
    contact: {
      title: "Got a project in mind?",
      sub: "Tell me what you need to build. No endless form — just a direct conversation.",
      fields: {
        name: "Name",
        email: "Email",
        whatsapp: "WhatsApp / Phone",
        project: "What are you building?",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        whatsapp: "+55 (11) 99999-9999",
        project: "Briefly describe the project...",
        message: "More details, timeline, context...",
      },
      submit: "Send message",
      sending: "Sending...",
      success: "Message sent. I'll be in touch soon.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      made: "Made with",
      by: "by Gildo Neto",
    },
  },
} as const;

export default translations;
