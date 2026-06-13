import learningData from "../data/learning";
import LevelCard from "../components/learning/LevelCard";
import "../styles/learning.css";

function Learning() {
  return (
    <section className="learning-page">
      <div className="section-header">
        <h1 className="section-title">Choose Your Level</h1>
      </div>

      <div className="levels-grid">
        {learningData.map((level) => (
          <LevelCard key={level.slug} level={level} />
        ))}
      </div>
    </section>
  );
}

export default Learning;
