import { FiBell } from "react-icons/fi";
import { TbBook2 } from "react-icons/tb";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

import "../../styles/navbar.css";

function Navbar() {
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
        <Link
          to="/verb-practice"
          className="navbar__verb-button"
        >
          <TbBook2 />
          <span>Verbs</span>
        </Link>

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