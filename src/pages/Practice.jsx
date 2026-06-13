import { Link } from "react-router-dom";

const practiceItems = [
  { title: "Quiz", path: "/quiz" },
  { title: "Fill in the Blanks", path: "/fill-blanks" },
  { title: "Translation", path: "/translation" },
  { title: "Verbs", path: "/verbs" },
  { title: "Sentence Correction", path: "/sentence-correction" },
  { title: "AI Practice", path: "/ai-practice" },
];

function Practice() {
  return (
    <main className="learning-page">
      <h1 className="learning-page__title">Practice</h1>

      <div className="levels-grid">
        {practiceItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="level-card"
          >
            <h2>{item.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Practice;
