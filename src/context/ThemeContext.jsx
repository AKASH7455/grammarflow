import { useEffect, useState } from "react";
import {
  getProgress,
  saveSetting,
} from "../services/grammarFlowStorage";
import { ThemeContext } from "./AppContexts";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => getProgress().settings.theme
  );

  const setTheme = (value) => {
    setThemeState(value);
    saveSetting("theme", value);
  };

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.documentElement.classList.remove(
      "light-theme",
      "dark-theme"
    );
    document.documentElement.classList.add(
      `${theme}-theme`
    );
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

