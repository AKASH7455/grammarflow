import React from "react";
import { SkeletonBox, SkeletonText, SkeletonCircle } from "./index";

const SkeletonSubjectCard = React.memo(({ 
  height = "120px",
  padding = "16px"
}) => {
  return (
    <div className="subject-card skeleton" style={{ height, padding, borderRadius: "var(--radius-md)" }} aria-hidden="true">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <SkeletonCircle size="40px" />
        <SkeletonBox width="60px" height="20px" borderRadius="var(--radius-sm)" />
      </div>
      <SkeletonBox width="80%" height="22px" style={{ marginBottom: "8px" }} />
      <SkeletonBox width="60%" height="16px" />
    </div>
  );
});

SkeletonSubjectCard.displayName = "SkeletonSubjectCard";

export default SkeletonSubjectCard;
