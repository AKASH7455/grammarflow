import React from "react";
import SkeletonBox from "./SkeletonBox";

const SkeletonText = React.memo(({ 
  lines = 1,
  width = "100%",
  height = "16px",
  gap = "8px",
  className = "",
  style = {}
}) => {
  return (
    <div 
      className={className}
      style={{ display: "flex", flexDirection: "column", gap, ...style }}
      aria-hidden="true"
    >
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          width={typeof width === "string" ? width : width[index] || "100%"}
          height={height}
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = "SkeletonText";

export default SkeletonText;
