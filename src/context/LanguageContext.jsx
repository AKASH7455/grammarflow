import { useEffect, useState } from "react";
import { getProgress, saveSetting } from "../services/grammarFlowStorage";
import { LanguageContext } from "./AppContexts";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => getProgress().settings.language || "hinglish"
  );
  const [isLearningPage, setIsLearningPage] = useState(false);

  useEffect(() => {
    document.documentElement.lang =
      language === "hindi" ? "hi" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((previous) => {
      const next =
        previous === "hindi" ? "hinglish" : "hindi";
      saveSetting("language", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        isLearningPage,
        setIsLearningPage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

