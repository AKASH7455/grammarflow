import React from "react";

const SkeletonCircle = React.memo(({ 
  size = "40px", 
  className = "",
  style = {}
}) => {
  const combinedStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
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

SkeletonCircle.displayName = "SkeletonCircle";

export default SkeletonCircle;
