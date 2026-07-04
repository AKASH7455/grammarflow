import React from "react";
import { SkeletonBox, SkeletonText } from "./index";

const SkeletonNotes = React.memo(() => {
  return (
    <div className="notes-article skeleton" aria-hidden="true">
      <div style={{ marginBottom: "24px" }}>
        <SkeletonBox width="70%" height="32px" style={{ marginBottom: "16px" }} />
        <SkeletonText lines={3} gap="12px" />
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} style={{ marginBottom: "24px" }}>
          <SkeletonBox width="60%" height="24px" style={{ marginBottom: "12px" }} />
          <SkeletonText lines={4} gap="10px" />
        </div>
      ))}

      <div style={{ marginTop: "32px" }}>
        <SkeletonBox width="50%" height="24px" style={{ marginBottom: "12px" }} />
        <SkeletonText lines={2} gap="10px" />
      </div>
    </div>
  );
});

SkeletonNotes.displayName = "SkeletonNotes";

export default SkeletonNotes;
