import React from "react";
import "../../styles/progresspage.css";

const AchievementCard = React.memo(({ achievement, compact = false }) => {
  const {
    icon: Icon,
    title,
    description,
    unlocked,
    xp = 0,
    rarity = 'common',
    progress = 0,
  } = achievement;

  const IconComponent = typeof Icon === 'function' ? <Icon /> : Icon;

  return (
    <article
      className={`achievement-card ${unlocked ? "unlocked" : "locked"} ${compact ? "compact" : ""} rarity-${rarity}`}
      aria-label={title}
      title={description || title}
    >
      <div className="achievement-icon">
        {IconComponent}
      </div>

      <div className="achievement-content">
        <h4 className="achievement-title">
          {title}
        </h4>

        {!compact && (
          <>
            <span className="achievement-xp">
              +{xp} XP
            </span>
            {!unlocked && progress > 0 && progress < 100 && (
              <div className="achievement-progress-bar">
                <div
                  className="achievement-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </>
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
