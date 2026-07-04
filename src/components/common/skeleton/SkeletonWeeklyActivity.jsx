import React from "react";
import { SkeletonBox } from "./index";

const SkeletonWeeklyActivity = React.memo(() => {
  return (
    <div className="skeleton" style={{ padding: "20px", borderRadius: "var(--radius-md)" }} aria-hidden="true">
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <SkeletonBox width="150px" height="24px" />
      </div>

      {/* Heatmap Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "16px" }}>
        {Array.from({ length: 28 }).map((_, index) => (
          <SkeletonBox 
            key={index} 
            width="100%" 
            height="32px" 
            borderRadius="var(--radius-sm)" 
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", alignItems: "center" }}>
        <SkeletonBox width="40px" height="12px" />
        <SkeletonBox width="12px" height="12px" borderRadius="var(--radius-sm)" />
        <SkeletonBox width="12px" height="12px" borderRadius="var(--radius-sm)" />
        <SkeletonBox width="12px" height="12px" borderRadius="var(--radius-sm)" />
      </div>
    </div>
  );
});

SkeletonWeeklyActivity.displayName = "SkeletonWeeklyActivity";

export default SkeletonWeeklyActivity;
