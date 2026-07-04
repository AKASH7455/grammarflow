import React from "react";
import { SkeletonBox, SkeletonCircle } from "./index";

const SkeletonLevelCard = React.memo(({ 
  height = "140px",
  padding = "20px"
}) => {
  return (
    <div className="level-card skeleton" style={{ height, padding, borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }} aria-hidden="true">
      <SkeletonCircle size="48px" />
      <SkeletonBox width="70%" height="24px" />
      <SkeletonBox width="40%" height="18px" />
    </div>
  );
});

SkeletonLevelCard.displayName = "SkeletonLevelCard";

export default SkeletonLevelCard;
