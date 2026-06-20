import React, { useMemo } from "react";
import "../../styles/progresspage.css";

const TopicProgress = React.memo(({ topic }) => {
  const { name, progress = 0 } = topic;

  const safeProgress = useMemo(
    () => Math.min(100, Math.max(0, progress)),
    [progress]
  );

  const isCompleted = safeProgress === 100;

  return (
    <div
      className={`topic-progress-item ${
        isCompleted ? "completed" : ""
      }`}
      aria-label={`${name} progress ${safeProgress}%`}
    >
      <div className="topic-progress-header">
        <span className="topic-name">
          {name}
        </span>

        <span className="topic-percentage">
          {safeProgress}%
        </span>
      </div>

      <div className="topic-progress-bar">
        <div
          className="topic-progress-fill"
          style={{
            width: `${safeProgress}%`,
          }}
        />
      </div>

      {isCompleted && (
        <span className="topic-completed-badge">
          ✓ Completed
        </span>
      )}
    </div>
  );
});

TopicProgress.displayName = "TopicProgress";

export default TopicProgress;