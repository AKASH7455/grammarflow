import "../../styles/streakcard.css";

function StreakCard() {
  return (
    <section className="streak-card">
      <div className="streak-header">
        <div>
          <p className="streak-label">
            Current Streak
          </p>

          <h2 className="streak-days">
            12 Days
          </h2>
        </div>

        <div className="streak-icon">
          🔥
        </div>
      </div>

      <div className="streak-week">
        <div className="day completed">
          <span>M</span>
        </div>

        <div className="day completed">
          <span>T</span>
        </div>

        <div className="day completed">
          <span>W</span>
        </div>

        <div className="day completed">
          <span>T</span>
        </div>

        <div className="day active">
          <span>F</span>
        </div>

        <div className="day">
          <span>S</span>
        </div>

        <div className="day">
          <span>S</span>
        </div>
      </div>

      <p className="streak-text">
        Keep practicing daily to maintain your streak.
      </p>
    </section>
  );
}

export default StreakCard;