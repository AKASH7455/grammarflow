import React from "react";
import { SkeletonBox, SkeletonCard, SkeletonText, SkeletonCircle } from "./index";

const SkeletonProgress = React.memo(() => {
  return (
    <main className="progress-page skeleton" aria-hidden="true">
      <div style={{ padding: "20px", marginBottom: "16px" }}>
        <SkeletonBox width="100%" height="120px" borderRadius="var(--radius-lg)" />
      </div>

      <div style={{ padding: "0 20px", marginBottom: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} height="80px" padding="12px" headerHeight="20px" bodyLines={1} />
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px", marginBottom: "16px" }}>
        <SkeletonCard height="100px" padding="16px" headerHeight="24px" bodyLines={2} />
      </div>

      <section style={{ padding: "20px", marginBottom: "16px" }}>
        <div style={{ marginBottom: "16px" }}>
          <SkeletonBox width="150px" height="20px" />
          <SkeletonBox width="50px" height="16px" style={{ marginTop: "8px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBox key={index} width="100%" height="48px" borderRadius="var(--radius-sm)" />
          ))}
        </div>
      </section>

      <section style={{ padding: "20px", marginBottom: "16px" }}>
        <div style={{ marginBottom: "16px" }}>
          <SkeletonBox width="150px" height="20px" />
          <SkeletonBox width="50px" height="16px" style={{ marginTop: "8px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} height="100px" padding="16px" headerHeight="20px" bodyLines={2} />
          ))}
        </div>
      </section>

      <section style={{ padding: "20px" }}>
        <div style={{ marginBottom: "16px" }}>
          <SkeletonBox width="200px" height="20px" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} height="80px" padding="12px" headerHeight="20px" bodyLines={1} />
          ))}
        </div>
      </section>
    </main>
  );
});

SkeletonProgress.displayName = "SkeletonProgress";

export default SkeletonProgress;
