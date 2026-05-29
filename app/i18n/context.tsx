"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Lang } from "./translations";

interface LangCtx {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: "pt", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang") as Lang | null;
    if (stored === "pt" || stored === "en") {
      setLangState(stored);
    } else {
      const browser = navigator.language.toLowerCase();
      setLangState(browser.startsWith("pt") ? "pt" : "en");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
