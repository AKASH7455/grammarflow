import { FiBell, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";

import logo from "../../assets/images/logo.png";

import "../../styles/navbar.css";

function Navbar() {
  const { language, toggleLanguage, isLearningPage } = useLanguage();

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
        {isLearningPage ? (
          <button
            type="button"
            className="navbar__verb-button"
            onClick={toggleLanguage}
          >
            <FiGlobe />
            <span>{language === "english" ? "हिंदी" : "English"}</span>
          </button>
        ) : (
          <Link
            to="/verb-practice"
            className="navbar__verb-button"
          >
            <span>Verbs</span>
          </Link>
        )}

        <button
          type="button"
          className="navbar__icon-button"
          aria-label="Notifications"
        >
          <FiBell />
        </button>
      </div>
    </header>
  );
}

export default Navbar;