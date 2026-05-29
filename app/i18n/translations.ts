export type Lang = "pt" | "en";

export type ProjectStatus = "live" | "wip";
export type ProjectColor = "amber" | "blue" | "violet" | "coral";

export interface ProjectMeta {
  id: string;
  url?: string;
  stack: string[];
  color: ProjectColor;
  status: ProjectStatus;
}

export const projectsMeta: ProjectMeta[] = [
  {
    id: "biblioteca-da-mari",
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
        "biblioteca-da-mari": {
          name: "Biblioteca da Mari",
          desc: "Depois da partida de Mari, seu acervo de livros ganhou vida própria — distribuído para a comunidade que ela amava.",
        },
        "mini-setlist": {
          name: "Mini Setlist",
          desc: "Para o músico que não pode perder tempo no palco. Cifras, setlists e autoplay numa tela só.",
        },
        "band-manager": {
          name: "Band Manager",
          desc: "A parte que os músicos odeiam: contas, pagamentos e agenda. Finalmente organizado.",
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
        project: "O que você está construindo?",
        message: "Mensagem",
      },
      placeholders: {
        name: "Seu nome",
        email: "seu@email.com",
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
        "biblioteca-da-mari": {
          name: "Biblioteca da Mari",
          desc: "After Mari's passing, her personal library found new life — shared with the community she loved.",
        },
        "mini-setlist": {
          name: "Mini Setlist",
          desc: "For musicians who can't afford downtime on stage. Chord charts, setlists, and auto-scroll in one place.",
        },
        "band-manager": {
          name: "Band Manager",
          desc: "The part musicians hate: bills, payments, and booking. Finally organized.",
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
        project: "What are you building?",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        email: "you@email.com",
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
