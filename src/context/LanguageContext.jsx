import { createContext, useContext, useState } from "react";
import { getProgress, saveSetting } from "../services/grammarFlowStorage";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => getProgress().settings.language || "hinglish");
  const [isLearningPage, setIsLearningPage] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prev) => { const next = prev === "hindi" ? "hinglish" : "hindi"; saveSetting("language", next); return next; });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isLearningPage, setIsLearningPage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

