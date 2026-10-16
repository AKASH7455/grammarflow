import { FiGlobe, FiMoon, FiSun } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";

import logo from "../../assets/images/logo.png";

import "../../styles/navbar.css";

function Navbar() {
  const { language, toggleLanguage, isLearningPage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isVerbPage = location.pathname.startsWith("/verbs");

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <img
          src={logo}
          alt="GrammarFlow Logo"
          className="navbar__logo"
        />
      </Link>

      <div className="navbar__actions">
        {isLearningPage || isVerbPage ? (
          <button
            type="button"
            className="navbar__language-button"
            onClick={toggleLanguage}
            aria-label={`Switch language to ${language !== "hindi" ? "Hindi" : "Hinglish"}`}
          >
            <FiGlobe aria-hidden="true" />
            <span>{language !== "hindi" ? "हिंदी" : "Hinglish"}</span>
          </button>
        ) : (
          <Link
            to="/verbs"
            className="navbar__verb-button"
          >
            <span>Verbs</span>
          </Link>
        )}

        <button
          type="button"
          className="navbar__icon-button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;

