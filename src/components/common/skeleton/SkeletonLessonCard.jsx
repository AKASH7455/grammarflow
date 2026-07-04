import React from "react";
import { SkeletonBox, SkeletonText } from "./index";

const SkeletonLessonCard = React.memo(({ 
  height = "100px",
  padding = "16px"
}) => {
  return (
    <div className="skeleton" style={{ height, padding, borderRadius: "var(--radius-md)" }} aria-hidden="true">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <SkeletonBox width="60%" height="20px" />
        <SkeletonBox width="40px" height="20px" borderRadius="var(--radius-sm)" />
      </div>
      <SkeletonText lines={2} gap="8px" />
    </div>
  );
});

SkeletonLessonCard.displayName = "SkeletonLessonCard";

export default SkeletonLessonCard;
