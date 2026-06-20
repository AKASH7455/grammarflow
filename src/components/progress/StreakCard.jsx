import React, { useMemo } from "react";
import { FaFire } from "react-icons/fa";

import "../../styles/progresspage.css";

const StreakCard = React.memo(({ currentStreak = 0, longestStreak = 0 }) => {
  const motivation = useMemo(() => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak < 3) return "Keep the fire burning!";
    if (currentStreak < 7) return "You're on a roll!";
    if (currentStreak < 14) return "Unstoppable!";
    if (currentStreak < 30) return "Legendary streak!";
    return "You're on fire! 🔥";
  }, [currentStreak]);

  const streakPercentage = useMemo(() => {
    if (longestStreak <= 0) return 0;
    return Math.min((currentStreak / longestStreak) * 100, 100);
  }, [currentStreak, longestStreak]);

  return (
    <section className="streak-card">
      <div className="streak-content">
        <div className="streak-icon-wrapper">
          <FaFire className="streak-icon" />
        </div>
        
        <div className="streak-info">
          <div className="streak-current">
            <span className="streak-number">{currentStreak}</span>
            <span className="streak-label">Day Streak</span>
          </div>
          
          <div className="streak-best">
            <span className="streak-best-label">Best:</span>
            <span className="streak-best-number">{longestStreak}</span>
          </div>
        </div>

        <div className="streak-progress">
          <div
            className="streak-progress-fill"
            style={{ width: `${streakPercentage}%` }}
          />
        </div>

        <p className="streak-motivation">{motivation}</p>
      </div>
    </section>
  );
});

StreakCard.displayName = "StreakCard";

export default StreakCard;
