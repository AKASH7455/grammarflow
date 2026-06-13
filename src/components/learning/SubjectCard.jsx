import { Link } from "react-router-dom";
import { FiBook } from "react-icons/fi";

function SubjectCard({ subject, levelSlug, levelColor }) {
  return (
    <Link
      to={`/learning/${levelSlug}/${subject.slug}`}
      className={`subject-card subject-card--${levelColor}`}
    >
      <div className="subject-card__icon">
        <FiBook />
      </div>

      <h3 className="subject-card__title">
        {subject.title}
      </h3>

      <span className="subject-card__badge">
        {subject.topics.length} Topics
      </span>
    </Link>
  );
}

export default SubjectCard;
