import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

function TopicCard({ topic, levelSlug, subjectSlug, levelColor }) {
  return (
    <Link
      to={`/learning/${levelSlug}/${subjectSlug}/${topic.slug}`}
      className={`subject-card subject-card--${levelColor}`}
    >
      <div className="subject-card__icon">
        <FiFileText />
      </div>

      <h3 className="subject-card__title">
        {topic.title}
      </h3>
    </Link>
  );
}

export default TopicCard;
