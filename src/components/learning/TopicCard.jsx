import { Link } from "react-router-dom";

function TopicCard({ topic, levelSlug, subjectSlug, levelColor, index }) {
  return (
    <Link
      to={`/learning/${levelSlug}/${subjectSlug}/${topic.slug}`}
      className={`subject-card subject-card--${levelColor}`}
    >
      <div className="subject-card__icon learning-list-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <h3 className="subject-card__title">
        {topic.title}
      </h3>
    </Link>
  );
}

export default TopicCard;

