import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import learningData from "../data/learning";
import TopicCard from "../components/learning/TopicCard";

import "../styles/learning.css";

function LevelTopics() {
  const { levelSlug, subjectSlug } = useParams();

  const level = learningData.find(
    (item) => item.slug === levelSlug
  );

  const subject = level?.subjects.find(
    (item) => item.slug === subjectSlug
  );

  if (!level || !subject) {
    return <h2>Subject Not Found</h2>;
  }

  return (
    <section className="learning-page">
      <div className="page-header">
        <Link
          to={`/learning/${levelSlug}`}
          className="learning-page__back"
        >
          <FiArrowLeft />
        </Link>

        <h1 className="section-title">
          {subject.title}
        </h1>
      </div>

      <div className="subjects-grid">
        {subject.topics.map((topic) => (
          <TopicCard
            key={topic.slug}
            topic={topic}
            levelSlug={levelSlug}
            subjectSlug={subjectSlug}
            levelColor={levelSlug}
          />
        ))}
      </div>
    </section>
  );
}

export default LevelTopics;