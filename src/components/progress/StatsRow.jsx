import React, { useMemo } from "react";
import {
  FaBookOpen,
  FaStickyNote,
  FaBrain,
  FaRocket,
} from "react-icons/fa";

import "../../styles/progresspage.css";

const StatsRow = React.memo(({ stats = {} }) => {
  const {
    topicsCompleted = 0,
    notesRead = 0,
    mcqSolved = 0,
    practiceCompleted = 0,
  } = stats;

  const statItems = useMemo(
    () => [
      {
        icon: <FaBookOpen />,
        value: topicsCompleted,
        label: "Topics",
        color: "var(--primary-color)",
        bg: "var(--primary-soft-color)",
      },
      {
        icon: <FaStickyNote />,
        value: notesRead,
        label: "Notes",
        color: "var(--primary-dark-color)",
        bg: "var(--primary-soft-color)",
      },
      {
        icon: <FaBrain />,
        value: mcqSolved,
        label: "Quizzes",
        color: "var(--intermediate-text)",
        bg: "var(--intermediate-bg)",
      },
      {
        icon: <FaRocket />,
        value: practiceCompleted,
        label: "Practice",
        color: "var(--advanced-text)",
        bg: "var(--advanced-bg)",
      },
    ],
    [topicsCompleted, notesRead, mcqSolved, practiceCompleted]
  );

  return (
    <section className="stats-row">
      <h2 className="stats-row-title">Quick Stats</h2>
      <div className="stats-grid">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{
              "--stat-color": stat.color,
              "--stat-bg": stat.bg,
            }}
          >
            <div className="stat-card-icon">{stat.icon}</div>
            <span className="stat-card-value">{stat.value}</span>
            <span className="stat-card-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

StatsRow.displayName = "StatsRow";

export default StatsRow;
