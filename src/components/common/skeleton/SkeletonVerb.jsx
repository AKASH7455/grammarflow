import React from "react";
import { SkeletonBox, SkeletonCard, SkeletonGrid } from "./index";

const SkeletonVerb = React.memo(() => {
  return (
    <main className="verb-dashboard-page skeleton" aria-hidden="true">
      <div className="verb-dashboard-page__header" style={{ padding: "20px", marginBottom: "24px" }}>
        <SkeletonBox width="200px" height="32px" style={{ marginBottom: "12px" }} />
        <SkeletonBox width="60%" height="20px" />
      </div>

      <div style={{ padding: "0 16px", marginBottom: "24px" }}>
        <SkeletonGrid columns={2} rows={2} gap="16px" />
      </div>

      <div style={{ padding: "16px" }}>
        <SkeletonBox width="150px" height="24px" style={{ marginBottom: "16px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} height="60px" padding="12px" headerHeight="20px" bodyLines={1} />
          ))}
        </div>
      </div>
    </main>
  );
});

SkeletonVerb.displayName = "SkeletonVerb";

export default SkeletonVerb;
