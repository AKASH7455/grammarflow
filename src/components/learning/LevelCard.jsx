import {
  FiBookOpen,
  FiTrendingUp,
  FiAward,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function LevelCard({ level }) {
  const icons = {
    beginner: <FiBookOpen />,
    intermediate: <FiTrendingUp />,
    advanced: <FiAward />,
    master: <FiStar />,
  };

  const topicsCount = level.subjects.reduce(
    (count, subject) => count + subject.topics.length,
    0
  );

  return (
    <Link
      to={`/learning/${level.slug}`}
      className={`level-card level-card--${level.slug}`}
    >
      <div className="level-card__icon">
        {icons[level.slug]}
      </div>

      <h3 className="level-card__title">
        {level.title}
      </h3>

      <span className="level-card__topics">
        {topicsCount} Topics
      </span>
    </Link>
  );
}

export default LevelCard;
