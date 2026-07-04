import React from "react";
import { SkeletonBox, SkeletonCircle } from "./index";

const SkeletonAchievementCard = React.memo(({ 
  unlocked = false
}) => {
  return (
    <div 
      className="skeleton" 
      style={{ 
        padding: "16px", 
        borderRadius: "var(--radius-md)",
        opacity: unlocked ? 1 : 0.6
      }} 
      aria-hidden="true"
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <SkeletonCircle size="48px" />
        <div style={{ flex: 1 }}>
          <SkeletonBox width="70%" height="20px" style={{ marginBottom: "8px" }} />
          <SkeletonBox width="90%" height="16px" style={{ marginBottom: "12px" }} />
          <SkeletonBox width="40%" height="12px" />
        </div>
      </div>
    </div>
  );
});

SkeletonAchievementCard.displayName = "SkeletonAchievementCard";

export default SkeletonAchievementCard;
