import { Link } from "react-router-dom";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

function VerbSetCard({
  title,
  verbCount,
  progress = 0,
  status = "new",
  level = "beginner",
  path
}) {
  const statusConfig = {
    completed: "Completed",
    inProgress: "In Progress",
    new: "Start Learning"
  };

  return (
    <Link
      to={path}
      className={`verb-set-card verb-set-card--${level}`}
    >
      {/* Top */}
      <div className="verb-set-card__top">
        <div className="verb-set-card__icon">
          <FiBookOpen />
        </div>

        <span
          className={`verb-set-card__level verb-set-card__level--${level}`}
        >
          {level}
        </span>
      </div>

      {/* Title */}
      <h3 className="verb-set-card__title">
        {title}
      </h3>

      <p className="verb-set-card__count">
        {verbCount} Verbs
      </p>

      {/* Progress */}
      <div className="verb-set-card__progress">
        <div className="verb-set-card__progress-bar">
          <div
            className="verb-set-card__progress-fill"
            style={{
              width: `${progress}%`
            }}
          />
        </div>

        <span className="verb-set-card__percentage">
          {progress}%
        </span>
      </div>

      {/* Footer */}
      <div className="verb-set-card__footer">
        <span className="verb-set-card__status">
          {statusConfig[status]}
        </span>

        <FiArrowRight />
      </div>
    </Link>
  );
}

export default VerbSetCard;