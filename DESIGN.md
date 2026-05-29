---
name: Gildo Neto — Portfolio
description: Desenvolvedor full-stack Next.js · Firebase · TypeScript
colors:
  bg: "oklch(0.11 0.008 55)"
  surface: "oklch(0.16 0.006 55)"
  surface-hover: "oklch(0.21 0.006 55)"
  accent: "oklch(0.76 0.18 52)"
  accent-dim: "oklch(0.66 0.14 52)"
  text-primary: "oklch(0.96 0.003 85)"
  text-secondary: "oklch(0.62 0.005 85)"
  code-green: "oklch(0.74 0.18 145)"
  project-amber: "oklch(0.76 0.18 52)"
  project-blue: "oklch(0.64 0.20 250)"
  project-violet: "oklch(0.62 0.22 305)"
  project-coral: "oklch(0.62 0.22 25)"
typography:
  display:
    fontFamily: "Barlow Condensed, Impact, sans-serif"
    fontWeight: 800
    fontSize: "clamp(3.5rem, 9vw, 7rem)"
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontWeight: 700
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    lineHeight: 1.1
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8125rem"
---

# Design System: Gildo Neto Portfolio

## 1. Overview

**Creative North Star: "O Desenvolvedor por Trás do Sistema"**

O design rejeita o portfolio genérico de dev e o clone de fireship. A ideia central: mostrar que
por trás do código existe um profissional com 8 anos de experiência que entende NEGÓCIO, não
apenas tecnologia. A estética é elétrica e confiante — dark mode, tipografia condensada bold,
cor âmbar como assinatura — mas sempre servindo a legibilidade e a conversão, nunca sendo
ruído visual.

**Key Characteristics:**
- **Âmbar como assinatura**: uma cor viva e calorosa num ambiente escuro. Lembra fogo, energia,
  presença. Não é azul-dev, não é verde-código. É própria.
- **Tipografia que respira**: Barlow Condensed para os momentos de impacto; Inter para os momentos
  de leitura. A hierarquia vem do contraste, não do grito constante.
- **Projetos como personagens**: cada projeto do portfólio tem uma cor própria (como os cursos do
  fireship), mas a cor serve a identidade do projeto — não a uma grade decorativa.

## 2. Colors

O esquema é escuro com foco em âmbar. O fundo tem um tint quente sutil para não parecer
estéril — é escuro como uma tela de terminal bem configurada, não como um buraco negro.

### Background & Surfaces

- **Fundo Principal** (`oklch(0.11 0.008 55)`): Escuro, quase preto, com tint âmbar imperceptível.
  Evita o `#000` estéril sem perder o impacto dark.
- **Surface** (`oklch(0.16 0.006 55)`): Cards e seções elevadas — ligeiramente mais claro que o fundo.
- **Surface Hover** (`oklch(0.21 0.006 55)`): Estado de hover em cards interativos.

### Accent — Âmbar

- **Âmbar Principal** (`oklch(0.76 0.18 52)`): A cor de identidade. Usada em: links ativos, CTAs,
  destaques em copy, bordas de foco, badges de tech stack.
- **Âmbar Dim** (`oklch(0.66 0.14 52)`): Para hover states do âmbar e variantes menos chamativas.

### Text

- **Texto Principal** (`oklch(0.96 0.003 85)`): Near-white com tint quente. Nunca `#fff` puro.
- **Texto Secundário** (`oklch(0.62 0.005 85)`): Metadados, labels, datas, descrições de suporte.

### Code / Tech Labels

- **Verde Terminal** (`oklch(0.74 0.18 145)`): Para badges de tecnologia, snippets, labels de stack.
  Evoca o terminal sem ser o verde clichê.

### Project Colors (por projeto no portfólio)

Cada projeto recebe uma cor que reflete sua identidade, usada no card e na página de detalhe:
- **Âmbar** (`oklch(0.76 0.18 52)`): Biblioteca da Mari — calor, memória, literário.
- **Azul Elétrico** (`oklch(0.64 0.20 250)`): Para projetos tech-forward/SaaS.
- **Violeta** (`oklch(0.62 0.22 305)`): Para projetos criativos ou de produto.
- **Coral** (`oklch(0.62 0.22 25)`): Para projetos de alto impacto/urgência.

### Named Rules

**A Regra do Âmbar Único.** O âmbar é reservado como cor de identidade e CTA. Não usar para
decoração, background de seções ou elementos não-interativos. Quando aparece, significa ação
ou destaque — não "animação bonita".

## 3. Typography

### Fonts

- **Display/Headline**: Barlow Condensed (Google Fonts, gratuita) — ExtraBold (800) para heroes,
  Bold (700) para section headings. Condensada o suficiente para o impacto do fireship sem ser
  idêntica.
- **Body**: Inter — legível, neutra, técnica. Alternativa: Geist se a stack usar Next.js/Vercel.
- **Mono**: JetBrains Mono — para badges de stack, snippets e qualquer elemento "terminal".

### Hierarchy

- **Display** (800, clamp 3.5–7rem, line-height 0.92): Hero headline. Uma ou duas palavras por linha.
- **Headline** (700, clamp 1.75–2.75rem, line-height 1.1): Section titles. Barlow Condensed.
- **Title** (600, 1.25rem, line-height 1.3): Card titles, project names. Inter SemiBold.
- **Body** (400, 1rem, line-height 1.65, max 70ch): Copy descritivo. Inter Regular.
- **Label** (500, 0.8125rem, letter-spacing 0.06em, uppercase): Tech badges, datas, metadados.
  JetBrains Mono.

### Named Rules

**A Regra da Condensação Seletiva.** Barlow Condensed aparece apenas em Display e Headline.
Body, labels e formulários usam Inter. Misturar condensado com texto corrido quebra a legibilidade.

## 4. Elevation

Dark mode com tonal layering:
- Fundo principal → surface → surface-hover: progressão de luminosidade de 0.11 → 0.16 → 0.21.
- Sem box-shadows decorativas. Separação visual por contraste de superfície.
- Exceção: hover em project cards pode usar `box-shadow: 0 8px 40px oklch(0.76 0.18 52 / 0.15)`
  (glow âmbar sutil) para indicar interatividade.

### Named Rules

**A Regra do Glow Reservado.** O glow âmbar existe apenas em elementos interativos (cards de
projeto, botões CTA) no estado hover. Nunca estático, nunca decorativo.

## 5. Components

### Hero Section

- Layout dois terços / um terço: texto à esquerda, elemento visual à direita.
- Elemento visual: terminal animado com stack ou screenshot do projeto âncora.
- Headline em Barlow Condensed, duas linhas máximo.
- Sub-copy em Inter, máximo 2 frases, max-width 55ch.
- CTA primário: botão âmbar sólido, Barlow Condensed bold, all-caps, padding generoso.
- CTA secundário: ghost button com borda âmbar.

### Project Cards

- Fundo: a cor do projeto (amber, blue, violet, coral) — o card É a cor, como o fireship.
- Inner container: surface escuro para o thumbnail/screenshot.
- Title: Barlow Condensed Bold, cor escura (near-black) sobre o fundo colorido.
- Description: Inter Regular, mesma cor escura, max 2 linhas.
- Tech stack: badges mono pequenos, cor escura.
- Hover: lift sutil (translateY -4px) + glow da cor do projeto.

### Tech Stack Display

- Não usar icon grids genéricos. Usar display tipo "terminal list" ou badges com JetBrains Mono.
- Cada badge: background surface, texto verde-terminal, padding tight, rounded-sm.
- Agrupados por categoria: Frontend / Backend / Infra / Tools.

### Contact Form

- Labels visíveis acima dos campos (nunca placeholder como label).
- Campos: borda surface-hover, focus com borda âmbar + outline âmbar/20.
- Botão submit: âmbar sólido, full-width no mobile.
- Estado de loading: spinner âmbar + texto "Enviando...".
- Sucesso: mensagem inline, sem redirect.

### Navigation

- Sticky, background bg/90 com backdrop-blur.
- Logo/nome à esquerda: Barlow Condensed, cor text-primary.
- Links à direita: Inter, text-secondary, hover text-primary.
- Language toggle (PT/EN): badge mono, discreto.
- CTA no nav: botão âmbar ghost pequeno "Contato".

## 6. Motion

- Entrance: `animate-in fade-in-0 slide-in-from-bottom-6` em elementos above-the-fold.
- Section reveals: IntersectionObserver com fade + slide-up 40px, duration 600ms, ease-out.
- Project card hover: `transition: transform 200ms ease-out` para o lift.
- Não animar layout properties (width, height, top, left). Usar transform e opacity.

## 7. Do's and Don'ts

### Do:
- Usar âmbar como cor de ação, identidade e destaque — de forma econômica e precisa.
- Mostrar código real ou interfaces reais nos project cards — não mockups genéricos.
- Escrever copy que diz o que você faz na primeira dobra, sem suspense.
- Usar Barlow Condensed para criar impacto no hero e section titles.
- Usar JetBrains Mono para tudo que é "técnico" (stack, labels, snippets).

### Don't:
- Colocar "apaixonado por tecnologia" ou "soluções inovadoras" em nenhum lugar do copy.
- Usar o âmbar como cor de fundo de seções inteiras — é uma cor de acento, não de área.
- Criar um grid de ícones de serviços iguais (ícone + título + 2 linhas x 6 vezes).
- Animar tudo que entra em tela — reservar motion para o que merece atenção.
- Clone visual do fireship: sem card grids com nome de curso em cima de thumbnail escuro em loop.
