import { useProgress } from "../../hooks/useProgress";
import "../../styles/streakcard.css";

function StreakCard() {
  const { data } = useProgress();
  const streak = data.user.streak || 0;
  const completedDates = data.user.completedDates || [];
  const start = new Date();
  const day = start.getDay() || 7;
  start.setDate(start.getDate() - day + 1);
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dateKey = date.toISOString().slice(0, 10);
    return { label: ["M", "T", "W", "T", "F", "S", "S"][index], completed: completedDates.includes(dateKey), active: dateKey === new Date().toISOString().slice(0, 10) };
  });

  return (
    <section className="streak-card">
      <div className="streak-header">
        <div><p className="streak-label">Current Streak</p><h2 className="streak-days">{streak} Days</h2></div>
        <div className="streak-icon">??</div>
      </div>
      <div className="streak-week">
        {week.map((item, index) => <div key={index} className={`day ${item.completed ? "completed" : ""} ${item.active ? "active" : ""}`}><span>{item.label}</span></div>)}
      </div>
      <p className="streak-text">Keep practicing daily to maintain your streak.</p>
    </section>
  );
}
export default StreakCard;

