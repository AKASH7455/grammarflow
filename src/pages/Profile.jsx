import { FiUser, FiPhone, FiActivity } from "react-icons/fi";
import ActivityHeatmap from "../components/progress/ActivityHeatmap";
import "../styles/profile.css";

function Profile() {
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

        {/* Profile Header */}
        <section className="profile__header">
          <div className="profile__card profile__card--header">

            <div className="profile__avatar">
              <FiUser className="profile__avatar-icon" />
            </div>

            <div className="profile__info">
              <h1 className="profile__name">
                {profileData.name}
              </h1>

              <p className="profile__role">
                {profileData.role}
              </p>
            </div>

          </div>
        </section>

        {/* Learning Activity */}
        <section className="profile__section">

          <div className="profile__section-header">
            <FiActivity />
            <h2>Learning Activity</h2>
          </div>

          <div className="profile__card profile__card--calendar">
            <ActivityHeatmap />
          </div>

        </section>

        {/* Developer Section */}
        <section className="profile__section">

          <div className="profile__card profile__card--developer">

            <div className="developer-card__header">
              <FiUser className="developer-card__icon" />
              <h3 className="developer-card__title">
                Developer
              </h3>
            </div>

            <div className="developer-card__info">

              <p className="developer-card__name">
                {developerData.name}
              </p>

              <a
                href={`tel:${developerData.phone}`}
                className="developer-card__contact"
              >
                <FiPhone className="developer-card__phone-icon" />

                <span>
                  {developerData.phone}
                </span>
              </a>

            </div>

          </div>

        </section>

        {/* App Info */}
        <section className="profile__section">

          <div className="profile__card profile__card--info">

            <h3 className="profile__info-title">
              GrammarFlow
            </h3>

            <p className="profile__info-text">
              Learn English grammar with notes,
              quizzes, practice exercises and
              progress tracking.
            </p>

            <span className="profile__version">
              Version 1.0.0
            </span>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Profile;