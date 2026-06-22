import React, { useMemo } from "react";
import {
  calculateLevel,
  getNextLevelInfo,
} from "../../utils/levelUtils";
import { FaTrophy } from "react-icons/fa";

import "../../styles/progresspage.css";

const ProgressHero = React.memo(({ progress = 0, currentXP = 0, xpToNextLevel = 500 }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  const currentLevel = useMemo(
    () => calculateLevel(safeProgress),
    [safeProgress]
  );

  const nextLevelInfo = useMemo(
    () => getNextLevelInfo(safeProgress),
    [safeProgress]
  );

  const message = useMemo(() => {
    if (safeProgress < 25) {
      return "Great start! Keep learning";
    }

    if (safeProgress < 50) {
      return "You're building momentum";
    }

    if (safeProgress < 75) {
      return "Excellent progress";
    }

    if (safeProgress < 100) {
      return "Almost at mastery";
    }

    return "Master level achieved";
  }, [safeProgress]);

  const progressPercentage = useMemo(() => {
    if (xpToNextLevel <= 0) return 100;
    return Math.min((currentXP / (currentXP + xpToNextLevel)) * 100, 100);
  }, [currentXP, xpToNextLevel]);

  return (
    <section className="hero-progress">
      <div className="hero-content">
        {/* Level and XP */}
        <div className="hero-info">
          <div className="hero-level">
            <span className="hero-level-label">Level</span>
            <span className="hero-level-value">{currentLevel}</span>
          </div>

          <div className="hero-xp">
            <span className="hero-xp-label">Current XP</span>
            <span className="hero-xp-value">{currentXP}</span>
          </div>

          {!nextLevelInfo?.isMaxLevel && (
            <div className="hero-xp-needed">
              <span className="hero-xp-label">XP Needed</span>
              <span className="hero-xp-value">{xpToNextLevel}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="hero-progress-bar">
          <div
            className="hero-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
          <span className="hero-progress-text">{Math.round(progressPercentage)}%</span>
        </div>

        {/* Motivational Message */}
        <div className="hero-message">
          <FaTrophy className="hero-message-icon" />
          <span className="hero-message-text">{message}</span>
        </div>
      </div>
    </section>
  );
});

ProgressHero.displayName = "ProgressHero";

export default ProgressHero;
