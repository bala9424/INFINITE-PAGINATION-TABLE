import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    greeting: "Hello",
    welcome: "Welcome to our app",
    switchLang: "Switch Language",
  },
  hi: {
    greeting: "नमस्ते",
    welcome: "हमारे ऐप में आपका स्वागत है",
    switchLang: "भाषा बदलें",
  },
};

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLanguage, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}