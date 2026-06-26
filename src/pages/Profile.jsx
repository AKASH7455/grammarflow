import { FiUser, FiPhone, FiActivity, FiMoon, FiSun, FiTarget, FiClock, FiAward } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import ActivityHeatmap from "../components/progress/ActivityHeatmap";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import "../styles/profile.css";

function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { data, getLevelInfo, getAchievementsSummary } = useProgress();
  const isDarkTheme = theme === "dark";
  
  const profileData = {
    name: "User Name",
    role: "GrammarFlow Learner",
  };

  const developerData = {
    name: "Akash Kumar",
    phone: "+91 7455045557",
  };

  // Get level and achievement info
  const levelInfo = getLevelInfo();
  const achievementSummary = getAchievementsSummary();
  
  // Calculate learning stats
  const learningStats = {
    totalXP: data.user.xp || 0,
    currentLevel: levelInfo.level || 1,
    currentStage: levelInfo.stage || 'Beginner',
    currentStreak: data.user.streak || 0,
    longestStreak: data.user.longestStreak || 0,
    lessonsCompleted: data.topicProgress.filter((t) => t.completed).length,
    quizzesCompleted: data.quizResults.length,
    practiceCompleted: [
      ...data.fillBlankProgress.filter((f) => f.completed),
      ...data.translationProgress.filter((t) => t.completed),
      ...data.sentenceCorrectionProgress.filter((s) => s.completed),
      ...data.verbProgress.filter((v) => v.completed),
    ].length,
    achievementsUnlocked: achievementSummary.unlocked,
    achievementsTotal: achievementSummary.total,
  };

  return (
    <div className="profile">
      <div className="profile__container">

        {/* Profile Header with Level */}
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
              
              <div className="profile__level-badge">
                <span className="profile__level">Level {learningStats.currentLevel}</span>
                <span className="profile__stage">{learningStats.currentStage}</span>
              </div>
            </div>

          </div>
        </section>

        {/* Learning Statistics */}
        <section className="profile__section">
          <div className="profile__section-header">
            <FiTarget />
            <h2>Learning Statistics</h2>
          </div>

          <div className="profile__stats-grid">
            <div className="profile__stat-card">
              <FaTrophy className="profile__stat-icon" />
              <div className="profile__stat-content">
                <span className="profile__stat-value">{learningStats.totalXP}</span>
                <span className="profile__stat-label">Total XP</span>
              </div>
            </div>

            <div className="profile__stat-card">
              <FiAward className="profile__stat-icon" />
              <div className="profile__stat-content">
                <span className="profile__stat-value">{learningStats.achievementsUnlocked}/{learningStats.achievementsTotal}</span>
                <span className="profile__stat-label">Achievements</span>
              </div>
            </div>

            <div className="profile__stat-card">
              <FiActivity className="profile__stat-icon" />
              <div className="profile__stat-content">
                <span className="profile__stat-value">{learningStats.currentStreak}</span>
                <span className="profile__stat-label">Current Streak</span>
              </div>
            </div>

            <div className="profile__stat-card">
              <FiClock className="profile__stat-icon" />
              <div className="profile__stat-content">
                <span className="profile__stat-value">{learningStats.longestStreak}</span>
                <span className="profile__stat-label">Longest Streak</span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Activity */}
        <section className="profile__section">
          <div className="profile__section-header">
            <FiActivity />
            <h2>Learning Activity</h2>
          </div>

          <div>
            <ActivityHeatmap activityData={data.activityLogs || []} completedDates={data.user?.completedDates || []} />
          </div>
        </section>

        {/* Appearance */}
        <section className="profile__section">
          <div className="profile__settings-item">
            <span className="profile__settings-label">
              Theme
            </span>

            <span
              className={`profile__theme-toggle ${
                isDarkTheme
                  ? "profile__theme-toggle--dark"
                  : ""
              }`}
              onClick={toggleTheme}
              role="button"
              tabIndex={0}
            >
              {isDarkTheme ? <FiSun /> : <FiMoon />}
              <span>
                {isDarkTheme ? "Light" : "Dark"}
              </span>
            </span>
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