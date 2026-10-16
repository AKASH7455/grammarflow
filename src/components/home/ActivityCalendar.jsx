import { FiZap } from "react-icons/fi";
import { getCurrentStreak, getProgress } from "../../services/grammarFlowStorage";
import "../../styles/activitycalendar.css";

function ActivityCalendar() {
  const data = getProgress();
  const completedDates = data.user.completedDates || [];
  const streak = getCurrentStreak(completedDates);

  const today = new Date();
  const start = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  ));
  const day = start.getUTCDay() || 7;
  start.setUTCDate(start.getUTCDate() - day + 1);
  const todayKey = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  )).toISOString().slice(0, 10);

  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const dateKey = date.toISOString().slice(0, 10);
    return {
      label: ["M", "T", "W", "T", "F", "S", "S"][index],
      weekday: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][index],
      completed: completedDates.includes(dateKey),
      active: dateKey === todayKey,
      dateKey,
    };
  });

  return (
    <section className="activity-calendar" aria-label="Weekly activity and current streak">
      <div className="calendar-header">
        <div>
          <p className="calendar-label">Current Streak</p>
          <h2 className="calendar-days">{streak} {streak === 1 ? "Day" : "Days"}</h2>
        </div>
        <div className="calendar-icon"><FiZap /></div>
      </div>
      <div className="calendar-week" role="group" aria-label="This week's activity">
        {week.map((item, index) => (
          <div
            key={item.dateKey}
            className={`day ${item.completed ? "completed" : ""} ${item.active ? "active" : ""}`}
            role="img"
            aria-label={`${item.weekday}${item.completed ? ", activity completed" : ", no activity"}${item.active ? ", today" : ""}`}
            title={`${item.weekday}${item.completed ? " • Completed" : ""}${item.active ? " • Today" : ""}`}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <p className="calendar-text">Keep practicing daily to maintain your streak.</p>
    </section>
  );
}

export default ActivityCalendar;
