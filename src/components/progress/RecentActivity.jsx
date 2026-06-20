import React, { useMemo } from "react";
import {
  FaCheckCircle,
  FaStar,
  FaTrophy,
  FaFire,
  FaBookOpen,
  FaBrain,
} from "react-icons/fa";

import "../../styles/progresspage.css";

const RecentActivity = React.memo(({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "quiz":
        return <FaBrain />;
      case "achievement":
        return <FaTrophy />;
      case "streak":
        return <FaFire />;
      case "xp":
        return <FaStar />;
      case "topic":
        return <FaBookOpen />;
      default:
        return <FaCheckCircle />;
    }
  };

  const sortedActivities = useMemo(
    () => [...activities].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [activities]
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (sortedActivities.length === 0) {
    return (
      <section className="recent-activity">
        <h2 className="recent-activity-title">Recent Activity</h2>
        <p className="recent-activity-empty">No recent activity yet. Start learning!</p>
      </section>
    );
  }

  return (
    <section className="recent-activity">
      <h2 className="recent-activity-title">Recent Activity</h2>
      <div className="activity-list">
        {sortedActivities.slice(0, 20).map((activity, index) => (
          <div key={`${activity.id}-${index}`} className="activity-item">
            <div className="activity-icon">{getActivityIcon(activity.type)}</div>
            <div className="activity-content">
              <p className="activity-text">{activity.text}</p>
              <span className="activity-time">{formatTime(activity.timestamp)}</span>
            </div>
            {activity.xp && (
              <span className="activity-xp">+{activity.xp} XP</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});

RecentActivity.displayName = "RecentActivity";

export default RecentActivity;
