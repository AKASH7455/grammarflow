import React from "react";
import { SkeletonBox, SkeletonCircle } from "./index";

const SkeletonStatistics = React.memo(({ 
  items = 4
}) => {
  return (
    <div className="skeleton" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }} aria-hidden="true">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} style={{ padding: "16px", borderRadius: "var(--radius-md)", background: "var(--surface-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <SkeletonCircle size="32px" />
            <SkeletonBox width="60%" height="20px" />
          </div>
          <SkeletonBox width="40%" height="28px" style={{ marginBottom: "8px" }} />
          <SkeletonBox width="50%" height="16px" />
        </div>
      ))}
    </div>
  );
});

SkeletonStatistics.displayName = "SkeletonStatistics";

export default SkeletonStatistics;
