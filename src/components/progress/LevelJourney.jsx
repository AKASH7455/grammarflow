import React, { useMemo } from "react";
import { calculateLevel, getAllLevels, getLevelConfig } from "../../utils/levelUtils";
import { FaCheck, FaLock } from "react-icons/fa";

import "../../styles/progresspage.css";

const LevelJourney = React.memo(({ currentProgress }) => {
  const currentLevel = useMemo(() => calculateLevel(currentProgress), [currentProgress]);
  const allLevels = useMemo(() => getAllLevels(), []);
  const currentIndex = useMemo(() => allLevels.indexOf(currentLevel), [allLevels, currentLevel]);

  return (
    <section className="level-journey">
      <h2 className="level-journey-title">Level Journey</h2>
      <div className="level-journey-scroll">
        {allLevels.map((level, index) => {
          const config = getLevelConfig(level);
          const isCurrent = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isLocked = index > currentIndex;

          return (
            <div
              key={level}
              className={`level-card ${isCurrent ? "current" : ""} ${isCompleted ? "completed" : ""} ${isLocked ? "locked" : ""}`}
            >
              <div className="level-card-icon">
                {isCompleted ? (
                  <FaCheck />
                ) : isLocked ? (
                  <FaLock />
                ) : typeof config.icon === "function" ? (
                  <config.icon />
                ) : (
                  config.icon
                )}
              </div>
              <span className="level-card-name">{level}</span>
              {isCurrent && <span className="level-card-badge">Current</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
});

LevelJourney.displayName = "LevelJourney";

export default LevelJourney;
