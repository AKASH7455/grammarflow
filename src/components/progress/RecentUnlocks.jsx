import React from "react";
import AchievementCard from "./AchievementCard";
import "../../styles/progresspage.css";

const RecentUnlocks = React.memo(({ achievements }) => {
  const recentUnlocks = achievements
    .filter(a => a.unlocked)
    .slice(-5)
    .reverse();

  if (recentUnlocks.length === 0) {
    return null;
  }

  return (
    <div className="recent-unlocks">
      <h3 className="recent-unlocks-title">
        Recent Unlocks
      </h3>

      <div className="recent-unlocks-scroll">
        {recentUnlocks.map((achievement) => (
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

RecentUnlocks.displayName = "RecentUnlocks";

export default RecentUnlocks;
