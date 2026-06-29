import { Link } from "react-router-dom";

function SubjectCard({ subject, levelSlug, levelColor, index }) {
  const targetPath =
    subject.topics.length === 1
      ? `/learning/${levelSlug}/${subject.slug}/${subject.topics[0].slug}`
      : `/learning/${levelSlug}/${subject.slug}`;

  const subjectNumber = String(index + 1).padStart(2, '0');

  return (
    <Link
      to={targetPath}
      className={`subject-card subject-card--${levelColor}`}
    >
      <div className="subject-card__icon learning-list-number">
        {subjectNumber}
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

