import React, { useMemo } from "react";
import { getAllStages, getStageConfig, getStageProgression } from "../../utils/levelUtils";
import { FaCheck, FaLock } from "react-icons/fa";
import "../../styles/progresspage.css";

const LevelJourney = React.memo(({ currentProgress = 0, levelInfo = {} }) => {
  const { stage: currentStage = 'Beginner' } = levelInfo;
  const stageProgression = useMemo(() => getStageProgression(levelInfo.level ? levelInfo.level * 100 : currentProgress), [levelInfo, currentProgress]);
  const allStages = useMemo(() => getAllStages(), []);

  return (
    <section className="level-journey">
      <h2 className="level-journey-title">Learning Journey</h2>
      <div className="level-journey-scroll">
        {stageProgression.map((stageInfo, index) => {
          const config = getStageConfig(stageInfo.stage);
          const isCurrent = stageInfo.current;
          const isCompleted = stageInfo.unlocked && !isCurrent;
          const isLocked = !stageInfo.unlocked;

          return (
            <div
              key={stageInfo.stage}
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
              <span className="level-card-name">{stageInfo.stage}</span>
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
