import React, { useMemo, useState } from "react";
import "../../styles/progresspage.css";

const ActivityHeatmap = React.memo(({ activityData = [], completedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Validate activityData and warn if invalid
  const safeActivityData = useMemo(() => {
    if (!Array.isArray(activityData)) {
      console.warn('ActivityHeatmap: activityData is not an array, using empty array instead', activityData);
      return [];
    }
    // Filter out invalid entries
    const validData = activityData.filter(log => {
      if (!log || typeof log !== 'object') {
        console.warn('ActivityHeatmap: Invalid activity log entry', log);
        return false;
      }
      return true;
    });
    return validData;
  }, [activityData]);

  const heatmapData = useMemo(() => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateKey = date.toISOString().slice(0, 10);
      
      const dayActivities = safeActivityData.filter(log => log.timestamp && log.timestamp.startsWith(dateKey));
      const activityCount = dayActivities.length;
      
      data.push({
        day,
        date,
        activityCount,
        isToday: day === new Date().getDate() && 
                 currentMonth.getMonth() === new Date().getMonth() &&
                 currentMonth.getFullYear() === new Date().getFullYear(),
      });
    }
    return data;
  }, [currentMonth, safeActivityData]);

  const getActivityLevel = (count) => {
    const safeCount = Number(count ?? 0);
    if (isNaN(safeCount)) {
      console.warn('ActivityHeatmap: Invalid count value', count);
      return 0;
    }
    if (safeCount === 0) return 0;
    if (safeCount >= 1 && safeCount <= 2) return 1;
    if (safeCount >= 3 && safeCount <= 5) return 2;
    if (safeCount >= 6 && safeCount <= 10) return 3;
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
    () => heatmapData.reduce((sum, day) => sum + Number(day?.activityCount ?? 0), 0),
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
        {totalActivity === 0 ? (
          <span className="heatmap-stat">
            No activity recorded yet
          </span>
        ) : (
          <span className="heatmap-stat">
            <strong>{totalActivity}</strong> total activity
          </span>
        )}
      </div>

      <div className="heatmap-grid">
        {Array.isArray(heatmapData) && heatmapData.map((day) => {
          const safeDay = day || {};
          const safeDate = safeDay.date instanceof Date ? safeDay.date : new Date();
          const safeActivityCount = Number(safeDay.activityCount ?? 0);
          
          return (
            <div
              key={safeDay.day || 0}
              className={`heatmap-cell level-${getActivityLevel(safeActivityCount)} ${
                safeDay.isToday ? "today" : ""
              }`}
              title={`${safeDate.toLocaleDateString()}: ${safeActivityCount} activities`}
            >
              <span className="heatmap-day-number">{safeDay.day || 0}</span>
            </div>
          );
        })}
      </div>

      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={Number(level ?? 0)}
            className={`heatmap-legend-cell level-${Number(level ?? 0)}`}
          />
        ))}
        <span className="heatmap-legend-label">More</span>
      </div>
    </section>
  );
});

ActivityHeatmap.displayName = "ActivityHeatmap";

export default ActivityHeatmap;

