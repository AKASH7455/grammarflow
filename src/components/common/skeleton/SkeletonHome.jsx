import React from "react";
import { SkeletonBox, SkeletonCard, SkeletonGrid } from "./index";

const SkeletonHome = React.memo(() => {
  return (
    <>
      <section className="welcome-card skeleton" style={{ padding: "24px", borderRadius: "var(--radius-lg)", minHeight: "180px" }} aria-hidden="true">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
          <SkeletonBox width="40%" height="32px" />
          <SkeletonBox width="80%" height="20px" />
          <SkeletonBox width="60%" height="20px" />
        </div>
        <SkeletonBox width="120px" height="120px" borderRadius="var(--radius-lg)" />
      </section>

      <section className="streak-card skeleton" style={{ padding: "20px", borderRadius: "var(--radius-md)", minHeight: "100px" }} aria-hidden="true">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SkeletonBox width="120px" height="24px" />
            <SkeletonBox width="80px" height="20px" />
          </div>
          <SkeletonBox width="60px" height="60px" borderRadius="50%" />
        </div>
      </section>

      <section className="quick-actions skeleton" aria-hidden="true">
        <div style={{ marginBottom: "16px" }}>
          <SkeletonBox width="150px" height="28px" />
        </div>
        <SkeletonGrid columns={2} rows={2} gap="12px" />
      </section>
    </>
  );
});

SkeletonHome.displayName = "SkeletonHome";

export default SkeletonHome;
