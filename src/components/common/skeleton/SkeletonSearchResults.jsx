import React from "react";
import { SkeletonBox, SkeletonCard } from "./index";

const SkeletonSearchResults = React.memo(({ 
  results = 5
}) => {
  return (
    <div className="skeleton" aria-hidden="true">
      {/* Search Bar */}
      <div style={{ padding: "16px", marginBottom: "16px" }}>
        <SkeletonBox width="100%" height="48px" borderRadius="var(--radius-md)" />
      </div>

      {/* Results */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ marginBottom: "16px" }}>
          <SkeletonBox width="120px" height="20px" />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Array.from({ length: results }).map((_, index) => (
            <SkeletonCard key={index} height="80px" padding="16px" headerHeight="20px" bodyLines={2} />
          ))}
        </div>
      </div>
    </div>
  );
});

SkeletonSearchResults.displayName = "SkeletonSearchResults";

export default SkeletonSearchResults;
