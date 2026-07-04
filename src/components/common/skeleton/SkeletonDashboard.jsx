import React from "react";
import { SkeletonBox, SkeletonCard, SkeletonGrid } from "./index";

const SkeletonDashboard = React.memo(() => {
  return (
    <main className="skeleton" aria-hidden="true">
      {/* Header */}
      <div style={{ padding: "20px", marginBottom: "16px" }}>
        <SkeletonBox width="40%" height="32px" style={{ marginBottom: "12px" }} />
        <SkeletonBox width="60%" height="20px" />
      </div>

      {/* Stats Grid */}
      <div style={{ padding: "0 20px", marginBottom: "24px" }}>
        <SkeletonGrid columns={4} rows={1} gap="12px" />
      </div>

      {/* Main Content */}
      <div style={{ padding: "0 20px", marginBottom: "24px" }}>
        <SkeletonCard height="200px" padding="20px" headerHeight="24px" bodyLines={4} />
      </div>

      {/* Secondary Content */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ marginBottom: "16px" }}>
          <SkeletonBox width="150px" height="24px" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} height="80px" padding="16px" headerHeight="20px" bodyLines={2} />
          ))}
        </div>
      </div>
    </main>
  );
});

SkeletonDashboard.displayName = "SkeletonDashboard";

export default SkeletonDashboard;
