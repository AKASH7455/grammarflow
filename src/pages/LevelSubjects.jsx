import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import learningData from "../data/learning";
import SubjectCard from "../components/learning/SubjectCard";

import "../styles/learning.css";

function LevelSubjects() {
  const { levelSlug } = useParams();

  const level = learningData.find(
    (item) => item.slug === levelSlug
  );

  if (!level) {
    return <h2>Level Not Found</h2>;
  }

  return (
    <section className="learning-page">
      <div className="page-header">
        <Link
          to="/learning"
          className="learning-page__back"
        >
          <FiArrowLeft />
        </Link>

        <h1 className="section-title">
          {level.title}
        </h1>
      </div>

      <div className="subjects-grid">
        {level.subjects.map((subject) => (
          <SubjectCard
            key={subject.slug}
            subject={subject}
            levelSlug={levelSlug}
            levelColor={levelSlug}
          />
        ))}
      </div>
    </section>
  );
}

export default LevelSubjects;