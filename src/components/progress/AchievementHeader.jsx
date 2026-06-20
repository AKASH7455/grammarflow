import React from "react";
import "../../styles/progresspage.css";

const AchievementHeader = React.memo(({ total, unlocked }) => {
  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  return (
    <div className="achievement-header">
      <div className="achievement-header-top">
        <h2 className="achievement-header-title">
          Achievements
        </h2>
        <span className="achievement-header-count">
          {unlocked} / {total} Unlocked
        </span>
      </div>

      <div className="achievement-progress-bar">
        <div
          className="achievement-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

AchievementHeader.displayName = "AchievementHeader";

export default AchievementHeader;
