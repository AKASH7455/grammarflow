import React from "react";
import { SkeletonBox, SkeletonCard, SkeletonCircle, SkeletonText } from "./index";

const SkeletonProfile = React.memo(() => {
  return (
    <div className="profile skeleton" aria-hidden="true">
      <div className="profile__container">
        <section style={{ padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <SkeletonCircle size="64px" />
            <div style={{ flex: 1 }}>
              <SkeletonBox width="60%" height="24px" style={{ marginBottom: "8px" }} />
              <SkeletonBox width="40%" height="18px" />
            </div>
          </div>
          <SkeletonBox width="120px" height="40px" borderRadius="var(--radius-sm)" />
        </section>

        <section style={{ padding: "20px", marginBottom: "16px" }}>
          <SkeletonCard height="100px" padding="16px" headerHeight="24px" bodyLines={2} />
        </section>

        <section style={{ padding: "20px", marginBottom: "16px" }}>
          <SkeletonCard height="120px" padding="16px" headerHeight="24px" bodyLines={3} />
        </section>

        <section style={{ padding: "20px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <SkeletonBox width="150px" height="24px" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} height="80px" padding="12px" headerHeight="20px" bodyLines={1} />
            ))}
          </div>
        </section>

        <section style={{ padding: "20px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <SkeletonBox width="150px" height="24px" />
          </div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCircle key={index} size="48px" />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonBox key={index} width="100%" height="60px" borderRadius="var(--radius-sm)" />
            ))}
          </div>
        </section>

        <section style={{ padding: "20px" }}>
          <SkeletonCard height="80px" padding="16px" headerHeight="20px" bodyLines={2} />
        </section>
      </div>
    </div>
  );
});

SkeletonProfile.displayName = "SkeletonProfile";

export default SkeletonProfile;
