import React from "react";
import SkeletonBox from "./SkeletonBox";
import SkeletonText from "./SkeletonText";

const SkeletonCard = React.memo(({ 
  width = "100%",
  height = "auto",
  padding = "16px",
  borderRadius = "var(--radius-md)",
  headerHeight = "24px",
  bodyLines = 3,
  className = "",
  style = {}
}) => {
  return (
    <div 
      className="skeleton"
      style={{
        width,
        minHeight: height === "auto" ? "120px" : height,
        padding,
        borderRadius,
        ...style
      }}
      aria-hidden="true"
    >
      <SkeletonBox 
        width="60%" 
        height={headerHeight} 
        style={{ marginBottom: "12px" }}
      />
      <SkeletonText lines={bodyLines} />
    </div>
  );
});

SkeletonCard.displayName = "SkeletonCard";

export default SkeletonCard;
