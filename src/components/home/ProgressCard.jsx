import { useMemo } from "react";
import { useStreak } from "../../hooks/useStreak";

import "../../styles/progresscard.css";

function ProgressCard() {
  const { currentStreak, longestStreak, completedDates } = useStreak();

  // Mock data for progress (in real app, this would come from a service)
  const overallProgress = 65;
  const lessonsCompleted = 24;

  const grammarTopics = [
    { name: "Nouns", progress: 90 },
    { name: "Pronouns", progress: 75 },
    { name: "Verbs", progress: 60 },
    { name: "Tenses", progress: 45 },
    { name: "Adjectives", progress: 30 },
    { name: "Adverbs", progress: 20 },
    { name: "Articles", progress: 15 },
    { name: "Prepositions", progress: 10 },
  ];

  const achievements = [
    { icon: "🏆", title: "Grammar Master", unlocked: overallProgress >= 100 },
    { icon: "🔥", title: "7 Day Streak", unlocked: currentStreak >= 7 },
    { icon: "📚", title: "First Lesson", unlocked: lessonsCompleted >= 1 },
    { icon: "⭐", title: "Quiz Expert", unlocked: overallProgress >= 50 },
  ];

  const motivationalQuotes = [
    "Consistency beats intensity.",
    "Small progress every day creates big results.",
    "Every expert was once a beginner.",
    "Your journey to fluency starts here.",
    "Keep pushing, you're doing great!",
  ];

  const randomQuote = useMemo(() => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  }, []);

  return (
    <section className="progress-card">
      {/* Overall Progress Card */}
      <div className="progress-overall">
        <div className="progress-header">
          <h3 className="progress-title">Overall Progress</h3>
          <div className="progress-percentage">{overallProgress}%</div>
        </div>
        <div className="progress-bar-large">
          <div
            className="progress-bar-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="progress-stats">
          <div className="progress-stat">
            <span className="stat-icon">📖</span>
            <div className="stat-info">
              <p className="stat-value">{lessonsCompleted}</p>
              <p className="stat-label">Lessons</p>
            </div>
          </div>
          <div className="progress-stat">
            <span className="stat-icon">🔥</span>
            <div className="stat-info">
              <p className="stat-value">{currentStreak}</p>
              <p className="stat-label">Streak</p>
            </div>
          </div>
          <div className="progress-stat">
            <span className="stat-icon">🏆</span>
            <div className="stat-info">
              <p className="stat-value">{longestStreak}</p>
              <p className="stat-label">Best</p>
            </div>
          </div>
          <div className="progress-stat">
            <span className="stat-icon">📅</span>
            <div className="stat-info">
              <p className="stat-value">{completedDates?.length || 0}</p>
              <p className="stat-label">Study Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Topic Progress */}
      <div className="progress-topics">
        <h3 className="section-title">Grammar Topics</h3>
        <div className="topics-list">
          {grammarTopics.map((topic) => (
            <div key={topic.name} className="topic-item">
              <div className="topic-header">
                <span className="topic-name">{topic.name}</span>
                <span className="topic-progress">{topic.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="progress-achievements">
        <h3 className="section-title">Achievements</h3>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <p className="achievement-title">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Section */}
      <div className="progress-motivation">
        <p className="motivation-text">"{randomQuote}"</p>
      </div>
    </section>
  );
}

export default ProgressCard;
