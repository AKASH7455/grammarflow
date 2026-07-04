import React from "react";
import { SkeletonBox, SkeletonText } from "./index";

const SkeletonTopicCard = React.memo(({ 
  height = "100px",
  padding = "16px"
}) => {
  return (
    <div className="topic-card skeleton" style={{ height, padding, borderRadius: "var(--radius-md)" }} aria-hidden="true">
      <SkeletonBox width="70%" height="20px" style={{ marginBottom: "12px" }} />
      <SkeletonText lines={2} gap="8px" />
    </div>
  );
});

SkeletonTopicCard.displayName = "SkeletonTopicCard";

export default SkeletonTopicCard;
