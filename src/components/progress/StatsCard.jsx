import React, { useMemo } from "react";
import "../../styles/progresspage.css";

const StatsCard = React.memo(
  ({
    icon,
    value,
    label,
    progress = 0,
    max = 100,
  }) => {
    const progressPercentage = useMemo(() => {
      if (max <= 0) return 0;

      return Math.min(
        Math.max((progress / max) * 100, 0),
        100
      );
    }, [progress, max]);

    return (
      <div
        className="stats-card"
        aria-label={`${label}: ${value}`}
      >
        <div className="stats-card-icon">
          {icon}
        </div>

        <div className="stats-card-content">
          <span className="stats-card-value">
            {value}
          </span>

          <span className="stats-card-label">
            {label}
          </span>

          <div className="stats-card-progress-bar">
            <div
              className="stats-card-progress-fill"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <span className="stats-card-progress-text">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>
    );
  }
);

StatsCard.displayName = "StatsCard";

export default StatsCard;