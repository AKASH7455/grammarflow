import React from "react";
import { SkeletonBox, SkeletonText, SkeletonButton } from "./index";

const SkeletonTranslation = React.memo(() => {
  return (
    <section className="exam-wrapper skeleton" aria-hidden="true">
      <div style={{ padding: "16px", borderBottom: "1px solid var(--border-color)", marginBottom: "16px" }}>
        <SkeletonBox width="150px" height="20px" />
        <SkeletonBox width="100px" height="16px" style={{ marginTop: "8px" }} />
      </div>

      <div style={{ padding: "16px" }}>
        <SkeletonBox width="100%" height="60px" borderRadius="var(--radius-md)" style={{ marginBottom: "16px" }} />
        
        <SkeletonBox width="100%" height="48px" borderRadius="var(--radius-sm)" style={{ marginBottom: "24px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <SkeletonButton width="100px" height="44px" />
          <SkeletonButton width="120px" height="44px" />
        </div>
      </div>
    </section>
  );
});

SkeletonTranslation.displayName = "SkeletonTranslation";

export default SkeletonTranslation;
