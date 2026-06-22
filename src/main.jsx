import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import { ProgressProvider } from "./context/ProgressContext";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";

import "./styles/variables.css";

import "./styles/global.css";

import "./styles/themes.css";



createRoot(document.getElementById("root")).render(

  <StrictMode>

    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>

  </StrictMode>

);


