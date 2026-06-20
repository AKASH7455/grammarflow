import React from "react";
import "../../styles/progresspage.css";

const DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const WeeklyActivity = React.memo(({ activity = [] }) => {
  const safeActivity = DAYS.map((_, index) =>
    Math.min(
      100,
      Math.max(0, Number(activity[index]) || 0)
    )
  );

  const currentDayIndex = (() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  })();

  const totalActivity = safeActivity.reduce(
    (total, value) => total + value,
    0
  );

  return (
    <section className="weekly-activity">
      <div className="weekly-header">
        <h3 className="weekly-activity-title">
          Weekly Activity
        </h3>

        <span className="weekly-total">
          {totalActivity}
        </span>
      </div>

      <div className="weekly-chart">
        {DAYS.map((day, index) => {
          const value = safeActivity[index];

          return (
            <div
              key={day}
              className={`weekly-bar-container ${
                currentDayIndex === index
                  ? "today"
                  : ""
              }`}
            >
              <span className="weekly-value">
                {value}
              </span>

              <div className="weekly-bar-track">
                <div
                  className="weekly-bar"
                  style={{
                    height: `${value}%`,
                  }}
                />
              </div>

              <span className="weekly-label">
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
});

WeeklyActivity.displayName = "WeeklyActivity";

export default WeeklyActivity;