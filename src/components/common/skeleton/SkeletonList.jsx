import React from "react";
import SkeletonBox from "./SkeletonBox";

const SkeletonList = React.memo(({ 
  items = 3,
  itemHeight = "48px",
  gap = "12px",
  className = "",
  style = {}
}) => {
  return (
    <div 
      className={className}
      style={{ display: "flex", flexDirection: "column", gap, ...style }}
      aria-hidden="true"
    >
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonBox
          key={index}
          width="100%"
          height={itemHeight}
          borderRadius="var(--radius-sm)"
        />
      ))}
    </div>
  );
});

SkeletonList.displayName = "SkeletonList";

export default SkeletonList;
