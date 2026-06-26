import React, { useMemo } from "react";
import { FaTrophy } from "react-icons/fa";
import "../../styles/progresspage.css";

const ProgressHero = React.memo(({ currentXP = 0, xpToNextLevel = 500, levelInfo = {} }) => {
  const { level = 1, stage = 'Beginner', percentage = 0, isMaxLevel = false } = levelInfo;

  const message = useMemo(() => {
    if (stage === 'Beginner') {
      return "Great start! Keep learning";
    }
    if (stage === 'Intermediate') {
      return "You're building momentum";
    }
    if (stage === 'Advanced') {
      return "Excellent progress";
    }
    if (stage === 'Master') {
      return "Master level achieved";
    }
    return "Keep going!";
  }, [stage]);

  const progressPercentage = useMemo(() => {
    if (isMaxLevel || xpToNextLevel <= 0) return 100;
    const value = Number.isFinite(percentage)
      ? percentage
      : (currentXP / (currentXP + xpToNextLevel)) * 100;
    return Math.min(100, Math.max(0, value));
  }, [currentXP, xpToNextLevel, percentage, isMaxLevel]);

  return (
    <section className="hero-progress">
      <div className="hero-content">
        {/* Level and XP */}
        <div className="hero-info">
          <div className="hero-level">
            <span className="hero-level-label">Level</span>
            <span className="hero-level-value">{level}</span>
          </div>

          <div className="hero-stage">
            <span className="hero-stage-label">Stage</span>
            <span className="hero-stage-value">{stage}</span>
          </div>

          <div className="hero-xp">
            <span className="hero-xp-label">Current XP</span>
            <span className="hero-xp-value">{currentXP}</span>
          </div>

          {!isMaxLevel && (
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
