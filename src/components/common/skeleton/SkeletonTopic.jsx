import React from "react";
import { SkeletonBox, SkeletonText, SkeletonButton } from "./index";

const SkeletonTopic = React.memo(() => {
  return (
    <main className="topic-details-page skeleton" aria-hidden="true">
      <div style={{ padding: "16px", borderBottom: "1px solid var(--border-color)", marginBottom: "16px" }}>
        <SkeletonBox width="120px" height="44px" style={{ marginBottom: "16px" }} />
        <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonButton key={index} width="80px" height="36px" />
          ))}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <SkeletonBox width="100%" height="200px" borderRadius="var(--radius-md)" style={{ marginBottom: "16px" }} />
        <SkeletonText lines={4} gap="12px" />
      </div>
    </main>
  );
});

SkeletonTopic.displayName = "SkeletonTopic";

export default SkeletonTopic;
