import React from "react";
import SkeletonBox from "./SkeletonBox";

const SkeletonButton = React.memo(({ 
  width = "120px", 
  height = "44px",
  borderRadius = "var(--radius-sm)",
  className = "",
  style = {}
}) => {
  return (
    <SkeletonBox
      width={width}
      height={height}
      borderRadius={borderRadius}
      className={className}
      style={style}
    />
  );
});

SkeletonButton.displayName = "SkeletonButton";

export default SkeletonButton;
