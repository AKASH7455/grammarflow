import React from "react";
import { SkeletonBox } from "./index";

const SkeletonVerbTable = React.memo(({ 
  rows = 5,
  columns = 4
}) => {
  return (
    <div className="skeleton" style={{ borderRadius: "var(--radius-md)", overflow: "hidden" }} aria-hidden="true">
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px", padding: "16px", borderBottom: "1px solid var(--border-color)" }}>
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonBox key={`header-${index}`} width="100%" height="24px" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          style={{ 
            display: "grid", 
            gridTemplateColumns: `repeat(${columns}, 1fr)`, 
            gap: "12px", 
            padding: "16px",
            borderBottom: rowIndex < rows - 1 ? "1px solid var(--border-color)" : "none"
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonBox key={`cell-${rowIndex}-${colIndex}`} width="100%" height="20px" />
          ))}
        </div>
      ))}
    </div>
  );
});

SkeletonVerbTable.displayName = "SkeletonVerbTable";

export default SkeletonVerbTable;
