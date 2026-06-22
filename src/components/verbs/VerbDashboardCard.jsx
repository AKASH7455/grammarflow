import { Link } from "react-router-dom";
import { FiBookOpen, FiZap, FiLayers, FiGrid, FiStar } from "react-icons/fi";

function VerbDashboardCard({ title, description, icon, path, count, color }) {
  const Icon = icon;

  return (
    <Link to={path} className="verb-dashboard-card">
      <div className={`verb-dashboard-card__icon verb-dashboard-card__icon--${color}`}>
        <Icon />
      </div>
      <div className="verb-dashboard-card__content">
        <h3 className="verb-dashboard-card__title">{title}</h3>
        <p className="verb-dashboard-card__description">{description}</p>
        <span className="verb-dashboard-card__count">{count} verbs</span>
      </div>
    </Link>
  );
}

export default VerbDashboardCard;
