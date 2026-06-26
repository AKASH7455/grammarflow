import React, { useMemo, useState } from "react";
import AchievementCard from "./AchievementCard";
import { ACHIEVEMENT_CATEGORIES } from "../../utils/achievementDefinitions";
import "../../styles/progresspage.css";

const CATEGORY_LABELS = {
  [ACHIEVEMENT_CATEGORIES.LEARNING]: "Learning",
  [ACHIEVEMENT_CATEGORIES.PRACTICE]: "Practice",
  [ACHIEVEMENT_CATEGORIES.QUIZ]: "Quiz",
  [ACHIEVEMENT_CATEGORIES.STREAK]: "Streak",
  [ACHIEVEMENT_CATEGORIES.TRANSLATION]: "Translation",
  [ACHIEVEMENT_CATEGORIES.SPEED]: "Speed",
  [ACHIEVEMENT_CATEGORIES.ACCURACY]: "Accuracy",
  [ACHIEVEMENT_CATEGORIES.DAILY_LOGIN]: "Daily Login",
  [ACHIEVEMENT_CATEGORIES.COMPLETION]: "Completion",
  [ACHIEVEMENT_CATEGORIES.XP_MILESTONES]: "XP Milestones",
  [ACHIEVEMENT_CATEGORIES.SPECIAL]: "Special",
};

const CATEGORIES = [
  { id: "all", label: "All" },
  ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label })),
];

const AchievementSection = React.memo(({ achievements = [] }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const stats = useMemo(() => {
    const total = achievements.length;
    const unlocked = achievements.filter((a) => a.unlocked).length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    return { total, unlocked, percentage };
  }, [achievements]);

  const recentUnlocks = useMemo(
    () => achievements.filter((a) => a.unlocked).slice(-5).reverse(),
    [achievements]
  );

  const filteredAchievements = useMemo(() => {
    if (activeCategory === "all") return achievements;
    return achievements.filter((a) => a.category === activeCategory);
  }, [achievements, activeCategory]);

  return (
    <section className="achievement-section">
      {/* Progress Summary */}
      <div className="achievement-summary">
        <div className="achievement-summary-header">
          <h2 className="achievement-summary-title">Achievements</h2>
          <span className="achievement-summary-count">
            {stats.unlocked} / {stats.total}
          </span>
        </div>
        <div className="achievement-summary-progress">
          <div
            className="achievement-summary-fill"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        <span className="achievement-summary-percentage">{stats.percentage}% Unlocked</span>
      </div>

      {/* Recent Unlocks */}
      {recentUnlocks.length > 0 && (
        <div className="achievement-recent">
          <h3 className="achievement-recent-title">Recent Unlocks</h3>
          <div className="achievement-recent-scroll">
            {recentUnlocks.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="achievement-categories">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`achievement-category-chip ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Category Achievements */}
      <div className="achievement-category-scroll">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              compact
            />
          ))
        ) : (
          <p className="achievement-empty">No achievements in this category yet.</p>
        )}
      </div>
    </section>
  );
});

AchievementSection.displayName = "AchievementSection";

export default AchievementSection;
