import React, { useMemo, useState } from "react";
import "../../styles/progresspage.css";

const ActivityHeatmap = React.memo(({ activityData = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const heatmapData = useMemo(() => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayIndex = day - 1;
      const activity = activityData[dayIndex] || Math.random() * 100;
      
      data.push({
        day,
        date,
        activity: Math.min(100, Math.max(0, activity)),
        isToday: day === new Date().getDate() && 
                 currentMonth.getMonth() === new Date().getMonth() &&
                 currentMonth.getFullYear() === new Date().getFullYear(),
      });
    }
    return data;
  }, [currentMonth, activityData]);

  const getActivityLevel = (activity) => {
    if (activity === 0) return 0;
    if (activity < 25) return 1;
    if (activity < 50) return 2;
    if (activity < 75) return 3;
    return 4;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const totalActivity = useMemo(
    () => heatmapData.reduce((sum, day) => sum + day.activity, 0),
    [heatmapData]
  );

  return (
    <section className="activity-heatmap">
      <div className="heatmap-header">
        <button
          className="heatmap-nav-button"
          onClick={() => navigateMonth(-1)}
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="heatmap-title">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          className="heatmap-nav-button"
          onClick={() => navigateMonth(1)}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="heatmap-stats">
        <span className="heatmap-stat">
          <strong>{totalActivity.toFixed(0)}</strong> total activity
        </span>
      </div>

      <div className="heatmap-grid">
        {heatmapData.map((day) => (
          <div
            key={day.day}
            className={`heatmap-cell level-${getActivityLevel(day.activity)} ${
              day.isToday ? "today" : ""
            }`}
            title={`${day.date.toLocaleDateString()}: ${day.activity.toFixed(0)}%`}
          >
            <span className="heatmap-day-number">{day.day}</span>
          </div>
        ))}
      </div>

      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`heatmap-legend-cell level-${level}`}
          />
        ))}
        <span className="heatmap-legend-label">More</span>
      </div>
    </section>
  );
});

ActivityHeatmap.displayName = "ActivityHeatmap";

export default ActivityHeatmap;
