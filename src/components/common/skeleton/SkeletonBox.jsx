import React from "react";

const SkeletonBox = React.memo(({ 
  width = "100%", 
  height = "20px", 
  borderRadius = "var(--radius-sm)",
  className = "",
  style = {}
}) => {
  const combinedStyle = {
    width,
    height,
    borderRadius,
    ...style
  };

  return (
    <div 
      className={`skeleton ${className}`}
      style={combinedStyle}
      aria-hidden="true"
    />
  );
});

SkeletonBox.displayName = "SkeletonBox";

export default SkeletonBox;
