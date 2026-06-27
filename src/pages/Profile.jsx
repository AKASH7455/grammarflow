import { useMemo, useState } from "react";
import {
  FiActivity,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiLock,
  FiMoon,
  FiPhone,
  FiSun,
  FiTarget,
  FiUser,
} from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import ActivityHeatmap from "../components/progress/ActivityHeatmap";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import "../styles/profile.css";

function ProfileAchievements({ achievements = [] }) {
  const [showAll, setShowAll] = useState(false);

  const unlocked = useMemo(
    () => achievements.filter((achievement) => achievement.unlocked),
    [achievements]
  );

  const locked = useMemo(
    () => achievements.filter((achievement) => !achievement.unlocked),
    [achievements]
  );

  const visibleLocked = showAll ? locked : locked.slice(0, 4);
  const unlockedCount = unlocked.length;
  const totalCount = achievements.length || 1;
  const completion = Math.round((unlockedCount / totalCount) * 100);

  const renderIcon = (achievement) => {
    const Icon = achievement.icon;
    return typeof Icon === "function" ? <Icon /> : Icon;
  };

  return (
    <section className="profile__section profile__panel profile__panel--achievements">
      <div className="profile-achievements">
        <div className="profile-achievements__header">
          <div>
            <span className="profile-achievements__eyebrow">Achievements</span>
            <h2>Badge collection</h2>
          </div>

          <button
            className="profile-achievements__view-all"
            type="button"
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="profile-achievements__summary">
          <div>
            <span>{unlockedCount}/{achievements.length}</span>
            <p>Unlocked</p>
          </div>
          <div className="profile-achievements__summary-track" aria-hidden="true">
            <span style={{ width: `${completion}%` }} />
          </div>
          <strong>{completion}%</strong>
        </div>

        <div className="profile-achievements__unlocked-row" aria-label="Unlocked badges">
          {unlocked.length > 0 ? (
            unlocked.slice(0, showAll ? unlocked.length : 8).map((achievement) => (
              <article className="profile-badge profile-badge--unlocked" key={achievement.id}>
                <div className="profile-badge__icon">
                  {renderIcon(achievement)}
                </div>
                <span>{achievement.title}</span>
              </article>
            ))
          ) : (
            <div className="profile-achievements__empty">
              <FiAward aria-hidden="true" />
              <span>Unlock your first badge by completing a lesson.</span>
            </div>
          )}
        </div>

        <div className="profile-achievements__locked-list">
          {visibleLocked.map((achievement) => {
            const progress = Math.min(100, Math.max(0, Number(achievement.progress || 0)));

            return (
              <article className="profile-locked-achievement" key={achievement.id}>
                <div className="profile-locked-achievement__icon">
                  {renderIcon(achievement) || <FiLock />}
                </div>

                <div className="profile-locked-achievement__content">
                  <div className="profile-locked-achievement__topline">
                    <h3>{achievement.title}</h3>
                    <span>+{achievement.xp || 0} XP</span>
                  </div>

                  <p>{achievement.description}</p>

                  <div className="profile-locked-achievement__progress">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <FiLock className="profile-locked-achievement__lock" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { data, getLevelInfo, getAchievements, getAchievementsSummary } = useProgress();
  const isDarkTheme = theme === "dark";

  const profileData = {
    name: "User Name",
    role: "GrammarFlow Learner",
  };

  const developerData = {
    name: "Akash Kumar",
    phone: "+91 7455045557",
  };

  const levelInfo = getLevelInfo();
  const achievements = useMemo(() => getAchievements(), [getAchievements]);
  const achievementSummary = getAchievementsSummary();

  const learningStats = {
    totalXP: data.user.xp || 0,
    currentLevel: levelInfo.level || 1,
    currentStage: levelInfo.stage || "Beginner",
    levelProgress: levelInfo.percentage || 0,
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
           <div className="profile__settings-item">
            <span className="profile__settings-label">Theme</span>

            <span
              className={`profile__theme-toggle ${
                isDarkTheme ? "profile__theme-toggle--dark" : ""
              }`}
              onClick={toggleTheme}
              role="button"
              tabIndex={0}
            >
              {isDarkTheme ? <FiSun /> : <FiMoon />}
              <span>{isDarkTheme ? "Light" : "Dark"}</span>
            </span>
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

        <section className="profile__section profile__panel profile__panel--hero">
          <div className="profile-hero-card">
            <div>
              <span className="profile-hero-card__eyebrow">Hero Card</span>
              <h2>Level {learningStats.currentLevel}</h2>
              <p>{learningStats.currentStage}</p>
            </div>

            <div className="profile-hero-card__progress" aria-hidden="true">
              <span style={{ width: `${learningStats.levelProgress}%` }} />
            </div>

            <div className="profile__level-badge">
              <span className="profile__level">{learningStats.totalXP} XP</span>
              <span className="profile__stage">{learningStats.levelProgress}%</span>
            </div>
          </div>
        </section>

        <section className="profile__section profile__panel profile__panel--stats">
          <div className="profile__section-header">
            <FiTarget />
            <h2>Quick Stats</h2>
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
                <span className="profile__stat-value">
                  {learningStats.achievementsUnlocked}/{learningStats.achievementsTotal}
                </span>
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

        <ProfileAchievements achievements={achievements} />

        <section className="profile__section profile__panel profile__panel--summary">
          <div className="profile__section-header">
            <FiCheckCircle />
            <h2>Learning Summary</h2>
          </div>

          <div className="profile-summary-grid">
            <div>
              <strong>{learningStats.lessonsCompleted}</strong>
              <span>Lessons</span>
            </div>
            <div>
              <strong>{learningStats.quizzesCompleted}</strong>
              <span>Quizzes</span>
            </div>
            <div>
              <strong>{learningStats.practiceCompleted}</strong>
              <span>Practice</span>
            </div>
          </div>

          <ActivityHeatmap
            activityData={data.activityLogs || []}
            completedDates={data.user?.completedDates || []}
          />
        </section>

        <section className="profile__section profile__panel profile__panel--settings">
        

          <div className="profile__card profile__card--info">
            <h3 className="profile__info-title">GrammarFlow</h3>
            <p className="profile__info-text">
              Learn English grammar with notes, quizzes, practice exercises and progress tracking.
            </p>
            <span className="profile__version">Version 1.0.0</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
