import {
  FiMoon,
  FiPhone,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import "../styles/profile.css";

function Profile() {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  const profileData = {
    name: "User Name",
    role: "GrammarFlow Learner",
  };

  const developerData = {
    name: "Akash Kumar",
    phone: "+91 7455045557",
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <section className="profile__header profile__panel profile__panel--header">
          <div className="profile__card profile__card--header">
            <div className="profile__avatar">
              <FiUser className="profile__avatar-icon" />
            </div>

            <div className="profile__info">
              <h1 className="profile__name">{profileData.name}</h1>
              <p className="profile__role">{profileData.role}</p>
            </div>
          </div>
        </section>

        <section className="profile__section profile__panel profile__panel--user-info">
          <div className="profile__card profile__card--developer">
            <div className="developer-card__header">
              <FiUser className="developer-card__icon" />
              <h2 className="developer-card__title">User Info</h2>
            </div>

            <div className="developer-card__info">
              <p className="developer-card__name">{developerData.name}</p>

              <a href={`tel:${developerData.phone}`} className="developer-card__contact">
                <FiPhone className="developer-card__phone-icon" />
                <span>{developerData.phone}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="profile__section profile__panel profile__panel--settings">
          <div className="profile__settings-item">
            <div className="profile__settings-copy">
              <span className="profile__settings-label">Appearance</span>
              <span className="profile__settings-description">
                Switch between light and dark mode
              </span>
            </div>
            <button
              className={`profile__theme-toggle ${
                isDarkTheme ? "profile__theme-toggle--dark" : ""
              }`}
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
              aria-pressed={isDarkTheme}
            >
              {isDarkTheme ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              <span>{isDarkTheme ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div className="profile__card profile__card--info">
            <h3 className="profile__info-title">GrammarFlow</h3>
            <p className="profile__info-text">
              Learn English grammar with notes, quizzes, practice exercises.
            </p>
            <span className="profile__version">Version 1.0.0</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
