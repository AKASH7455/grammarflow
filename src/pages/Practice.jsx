import {
  FiBookOpen,
  FiEdit3,
  FiGlobe,
  FiCheckSquare,
  FiCpu,
} from "react-icons/fi";

import "../styles/practice.css";

const upcomingFeatures = [
  {
    id: "mcq-quiz",
    icon: <FiCheckSquare />,
    title: "MCQ Quiz",
    description:
      "Test your knowledge with multiple choice questions",
    comingSoon: true,
  },
  {
    id: "fill-blanks",
    icon: <FiEdit3 />,
    title: "Fill in the Blanks",
    description:
      "Complete sentences with the correct words",
    comingSoon: true,
  },
  {
    id: "translation",
    icon: <FiGlobe />,
    title: "Translation Practice",
    description:
      "Improve your translation skills",
    comingSoon: true,
  },
  {
    id: "sentence-correction",
    icon: <FiBookOpen />,
    title: "Sentence Correction",
    description:
      "Identify and fix grammatical errors",
    comingSoon: true,
  },
  {
    id: "ai-practice",
    icon: <FiCpu />,
    title: "AI Practice",
    description:
      "Personalized AI-powered learning experience",
    comingSoon: true,
  },
];

function Practice() {
  return (
    <main className="practice-page">
      <section className="practice-page__hero">
        <div className="practice-page__icon-wrapper">
          <div className="practice-page__icon">
            <FiBookOpen />
          </div>
        </div>

        <span className="practice-page__badge">
          Coming Soon
        </span>

        <h1 className="practice-page__title">
          Practice Zone
        </h1>

        <p className="practice-page__description">
          Practice exercises are currently under development.
          New learning modules will be available soon.
        </p>
      </section>

      <section className="practice-page__features">
        <h2 className="practice-page__features-title">
          Upcoming Features
        </h2>

        <div className="practice-page__features-grid">
          {upcomingFeatures.map((feature) => (
            <article
              key={feature.id}
              className="practice-feature-card"
            >
              <div className="practice-feature-card__icon">
                {feature.icon}
              </div>

              <h3 className="practice-feature-card__title">
                {feature.title}
              </h3>

              <p className="practice-feature-card__description">
                {feature.description}
              </p>

              {feature.comingSoon && (
                <span className="practice-feature-card__badge">
                  Coming Soon
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Practice;