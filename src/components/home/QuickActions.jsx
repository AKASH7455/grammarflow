import { Link } from "react-router-dom";

import {
  FaBookOpen,
  FaClipboardList,
  FaPen,
  FaBolt,
} from "react-icons/fa";

import "../../styles/quickactions.css";

const actions = [
  {
    title: "Notes",
    path: "/learning",
    icon: <FaBookOpen />,
  },
  {
    title: "Quiz",
    path: "/learning",
    icon: <FaClipboardList />,
  },
  {
    title: "Practice",
    path: "/practice",
    icon: <FaPen />,
  },
  {
    title: "Verbs",
    path: "/verbs",
    icon: <FaBolt />,
  },
];

function QuickActions() {
  return (
    <section className="quick-actions">
      <div className="section-header">
        <h2 className="section-title">
          Quick Actions
        </h2>
      </div>

      <div className="actions-grid">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className="action-card"
          >
            <div
              className={`action-icon action-icon--${action.title.toLowerCase()}`}
            >
              {action.icon}
            </div>

            <h3 className="action-title">
              {action.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;

