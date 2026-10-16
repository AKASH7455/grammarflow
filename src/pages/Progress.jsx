import { useMemo, useState } from "react";
import { FiBarChart2, FiBookOpen, FiTarget } from "react-icons/fi";
import { getProgress } from "../services/grammarFlowStorage";
import { getCourseProgress } from "../utils/learningProgress";
import "../styles/progresspage.css";

const getSubjectName = (id = "") => {
  const parts = id.split("/").filter(Boolean);
  const subject = parts.length > 1 ? parts[1] : parts[0] || "";
  const singular = subject.endsWith("s") ? subject.slice(0, -1) : subject;
  return singular
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatTimeAgo = (timestamp) => {
  const elapsedSeconds = Math.max(0, (Date.now() - new Date(timestamp).getTime()) / 1000);
  if (!Number.isFinite(elapsedSeconds)) return "";
  if (elapsedSeconds < 60) return "Just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)} min ago`;
  if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)} hr ago`;
  if (elapsedSeconds < 2592000) return `${Math.floor(elapsedSeconds / 86400)} days ago`;
  return `${Math.floor(elapsedSeconds / 2592000)} months ago`;
};

const getActivityLabel = (type) => ({
  quiz: "Quiz done",
  topic: "Topic completed",
  fillblank: "Fill in the blanks done",
  translation: "Translation practice done",
  sentence: "Sentence correction done",
  verb: "Verb practice done",
}[type] || "Activity completed");

function Progress() {
  const data = getProgress();
  const [showAllTopics, setShowAllTopics] = useState(false);

  const currentStreak = data.user.streak || 0;
  const longestStreak = data.user.longestStreak || currentStreak;
  const courseProgress = getCourseProgress(data.topicProgress);
  const overallProgress = courseProgress.percentage;
  const lessonsCompleted = courseProgress.completed;
  const quizzesCompleted = data.progress.completedQuizzes.length;
  const practiceCompleted = data.progress.completedPractice.length;

  const weeklyActivity = useMemo(() => {
    const start = new Date();
    const day = start.getDay() || 7;
    start.setDate(start.getDate() - day + 1);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const dateKey = date.toISOString().slice(0, 10);
      return {
        label: ["M", "T", "W", "T", "F", "S", "S"][index],
        completed: data.user.completedDates.includes(dateKey),
        active: dateKey === new Date().toISOString().slice(0, 10)
      };
    });
  }, [data.user.completedDates]);

  const topicProgress = useMemo(() => {
    const latestBySubject = new Map();
    data.activityLogs.forEach((activity) => {
      if (!activity.type || !activity.id) return;
      const activityId = activity.id?.slice(activity.type.length + 1).replace(/:\d{4}-\d{2}-\d{2}$/, "");
      const name = getSubjectName(activityId);
      if (!name || !activity.timestamp) return;
      const current = latestBySubject.get(name);
      if (!current || new Date(activity.timestamp) > new Date(current.timestamp)) {
        latestBySubject.set(name, activity);
      }
    });

    data.topicProgress.forEach((topic) => {
      const name = getSubjectName(topic.topicId);
      if (!name || latestBySubject.has(name)) return;
      latestBySubject.set(name, {
        type: "topic",
        timestamp: topic.completedAt,
      });
    });

    return [...latestBySubject.entries()].map(([name, activity]) => ({
      name,
      action: getActivityLabel(activity.type),
      timeAgo: formatTimeAgo(activity.timestamp),
    }));
  }, [data.activityLogs, data.topicProgress]);

  const visibleTopics = showAllTopics ? topicProgress : topicProgress.slice(0, 3);

  return (
    <main className="progress-page">
      <div className="progress-hero">
        <div className="progress-hero-content">
          <span className="progress-hero-label">Your Progress</span>
          <h1 className="progress-hero-title">{overallProgress}% Complete</h1>
          <p className="progress-hero-subtitle">
            {courseProgress.completed} of {courseProgress.total} Beginner topics completed
          </p>
        </div>
        <div className="progress-hero-circle">
          <svg viewBox="0 0 100 100" className="progress-ring">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${overallProgress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
      </div>

      <section className="progress-section">
        <h2 className="section-title">Quick Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FiBookOpen />
            </div>
            <div className="stat-content">
              <span className="stat-value">{lessonsCompleted}</span>
              <span className="stat-label">Lessons</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FiTarget />
            </div>
            <div className="stat-content">
              <span className="stat-value">{quizzesCompleted}</span>
              <span className="stat-label">Quizzes</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FiBarChart2 />
            </div>
            <div className="stat-content">
              <span className="stat-value">{practiceCompleted}</span>
              <span className="stat-label">Practice</span>
            </div>
          </div>
        </div>
      </section>

      <section className="progress-section">
        <h2 className="section-title">Weekly Activity</h2>
        <div className="weekly-calendar">
          {weeklyActivity.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.completed ? "completed" : ""} ${day.active ? "active" : ""}`}
            >
              <span className="day-label">{day.label}</span>
            </div>
          ))}
        </div>
        <div className="streak-info">
          <p>Current Streak: <strong>{currentStreak} days</strong></p>
          <p>Best Streak: <strong>{longestStreak} days</strong></p>
        </div>
      </section>

      <section className="progress-section">
        <h2 className="section-title">Topic Progress</h2>
        <div className="topic-list">
          {topicProgress.length > 0 ? (
            visibleTopics.map((topic) => (
              <div key={topic.name} className="topic-item">
                <span className="topic-name">{topic.name}</span>
                <span className="topic-activity">
                  {topic.action}{topic.timeAgo ? ` · ${topic.timeAgo}` : ""}
                </span>
              </div>
            ))
          ) : (
            <p className="empty-state">No topics started yet</p>
          )}
          {topicProgress.length > 3 && (
            <button
              type="button"
              className="activity-history-toggle"
              onClick={() => setShowAllTopics((shown) => !shown)}
            >
              {showAllTopics ? "View less" : "View more"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default Progress;
