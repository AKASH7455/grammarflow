import React, { useMemo, useState } from "react";
import AchievementCard from "./AchievementCard";
import "../../styles/progresspage.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "streak", label: "Streak" },
  { id: "learning", label: "Learning" },
  { id: "quiz", label: "Quiz" },
  { id: "special", label: "Special" },
  { id: "master", label: "Master" },
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
                key={achievement.title}
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
              key={achievement.title}
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
