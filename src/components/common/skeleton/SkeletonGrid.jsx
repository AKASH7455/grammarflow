import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = React.memo(({ 
  columns = 2,
  rows = 2,
  gap = "16px",
  className = "",
  style = {}
}) => {
  return (
    <div 
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        ...style
      }}
      aria-hidden="true"
    >
      {Array.from({ length: columns * rows }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
});

SkeletonGrid.displayName = "SkeletonGrid";

export default SkeletonGrid;
