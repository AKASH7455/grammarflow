import { Link } from "react-router-dom";

function VerbDashboardCard({
  title,
  icon: Icon,
  path,
  count = 0,
  color = "primary",
}) {
  return (
    <Link
      to={path}
      className="verb-dashboard-card"
      aria-label={`${title} section`}
    >
      <div
        className={`verb-dashboard-card__icon verb-dashboard-card__icon--${color}`}
      >
        <Icon size={22} />
      </div>

      <h3 className="verb-dashboard-card__title">
        {title}
      </h3>

      <span className="verb-dashboard-card__count">
        {count}+
      </span>
    </Link>
  );
}

export default VerbDashboardCard;