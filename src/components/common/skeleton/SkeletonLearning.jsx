import React from "react";
import { SkeletonBox, SkeletonCard } from "./index";

const SkeletonLearning = React.memo(() => {
  return (
    <section className="learning-page skeleton" aria-hidden="true">
      <div className="section-header" style={{ marginBottom: "24px" }}>
        <SkeletonBox width="200px" height="32px" />
      </div>

      <div className="levels-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard 
            key={index}
            height="140px"
            padding="20px"
            headerHeight="28px"
            bodyLines={1}
          />
        ))}
      </div>
    </section>
  );
});

SkeletonLearning.displayName = "SkeletonLearning";

export default SkeletonLearning;
