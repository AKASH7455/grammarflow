import React from "react";
import "../../styles/progresspage.css";

const AchievementCard = React.memo(({ achievement, compact = false }) => {
  const {
    icon,
    title,
    unlocked,
    xp = 0,
  } = achievement;

  return (
    <article
      className={`achievement-card ${unlocked ? "unlocked" : "locked"} ${compact ? "compact" : ""}`}
      aria-label={title}
    >
      <div className="achievement-icon">
        {icon}
      </div>

      <div className="achievement-content">
        <h4 className="achievement-title">
          {title}
        </h4>

        {!compact && (
          <span className="achievement-xp">
            +{xp} XP
          </span>
        )}
      </div>

      {compact && unlocked && (
        <div className="achievement-badge">
          ✓
        </div>
      )}
    </article>
  );
});

AchievementCard.displayName = "AchievementCard";

export default AchievementCard;
