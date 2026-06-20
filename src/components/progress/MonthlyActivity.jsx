import React from "react";
import "../../styles/progresspage.css";

const MonthlyActivity = React.memo(({ activity = [] }) => {
  // Generate 30 days of activity data
  const daysInMonth = 30;
  const safeActivity = Array.from({ length: daysInMonth }, (_, index) => {
    // Use provided activity if available, otherwise generate realistic data
    if (activity[index] !== undefined) {
      return Math.min(100, Math.max(0, Number(activity[index]) || 0));
    }
    // Generate realistic learning activity pattern
    const baseActivity = Math.random() * 80;
    const weekendBoost = (index % 7 === 0 || index % 7 === 6) ? 20 : 0;
    return Math.min(100, Math.max(0, baseActivity + weekendBoost));
  });

  const currentDay = new Date().getDate();
  const currentDayIndex = Math.min(currentDay - 1, daysInMonth - 1);

  const totalActivity = safeActivity.reduce(
    (total, value) => total + value,
    0
  );

  const maxActivity = Math.max(...safeActivity, 1);

  return (
    <section className="monthly-activity">
      <div className="monthly-header">
        <h3 className="monthly-activity-title">
          Monthly Activity
        </h3>

        <span className="monthly-total">
          {totalActivity}
        </span>
      </div>

      <div className="monthly-chart">
        {safeActivity.map((value, index) => {
          const dayNumber = index + 1;
          const isToday = index === currentDayIndex;
          const normalizedHeight = (value / maxActivity) * 100;

          return (
            <div
              key={dayNumber}
              className={`monthly-bar-container ${
                isToday ? "today" : ""
              }`}
            >
              <span className="monthly-value">
                {value}
              </span>

              <div className="monthly-bar-track">
                <div
                  className="monthly-bar"
                  style={{
                    height: `${Math.max(normalizedHeight, 5)}%`,
                  }}
                />
              </div>

              <span className="monthly-label">
                {dayNumber}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
});

MonthlyActivity.displayName = "MonthlyActivity";

export default MonthlyActivity;
