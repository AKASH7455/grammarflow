import React from "react";
import AchievementCard from "./AchievementCard";
import "../../styles/progresspage.css";

const CategoryAchievements = React.memo(({ achievements, category }) => {
  const filteredAchievements = category === "all" 
    ? achievements 
    : achievements.filter(a => a.category === category);

  if (filteredAchievements.length === 0) {
    return (
      <div className="category-achievements-empty">
        <p>No achievements in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="category-achievements">
      <div className="category-achievements-scroll">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.title}
            achievement={achievement}
            compact
          />
        ))}
      </div>
    </div>
  );
});

CategoryAchievements.displayName = "CategoryAchievements";

export default CategoryAchievements;
