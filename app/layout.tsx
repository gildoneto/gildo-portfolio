import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/i18n/context";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gildo Neto — Desenvolvedor Full-Stack",
  description:
    "8 anos construindo plataformas web com Next.js, Firebase e TypeScript. Um desenvolvedor que entende o problema de negócio antes de escrever a primeira linha.",
  openGraph: {
    title: "Gildo Neto — Full-Stack Developer",
    description:
      "8 years building web platforms with Next.js, Firebase, and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
