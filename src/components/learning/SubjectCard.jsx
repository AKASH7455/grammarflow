import { Link } from "react-router-dom";
import { FiBook } from "react-icons/fi";

function SubjectCard({ subject, levelSlug, levelColor }) {
  const targetPath =
    subject.topics.length === 1
      ? `/learning/${levelSlug}/${subject.slug}/${subject.topics[0].slug}`
      : `/learning/${levelSlug}/${subject.slug}`;

  return (
    <Link
      to={targetPath}
      className={`subject-card subject-card--${levelColor}`}
    >
      <div className="subject-card__icon">
        <FiBook />
      </div>

      <h3 className="subject-card__title">
        {subject.title}
      </h3>

      <span className="subject-card__badge">
        {subject.topics.length}{" "}
        {subject.topics.length === 1 ? "Topic" : "Topics"}
      </span>
    </Link>
  );
}

export default SubjectCard;