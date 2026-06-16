import {
  FiCpu,
  FiZap,
  FiMessageCircle,
} from "react-icons/fi";

function AI() {
  return (
    <section className="ai-coming-soon">
      <div className="ai-coming-soon__icon">
        <FiCpu />
      </div>

      <h2 className="ai-coming-soon__title">
        AI Practice
      </h2>

      <p className="ai-coming-soon__description">
        Practice English with AI,
        get instant corrections,
        improve grammar,
        vocabulary and speaking confidence.
      </p>

      <div className="ai-features">
        <div className="ai-feature">
          <FiMessageCircle />
          Real Conversations
        </div>

        <div className="ai-feature">
          <FiZap />
          Instant Feedback
        </div>

        <div className="ai-feature">
          <FiCpu />
          Smart AI Tutor
        </div>
      </div>

      <div className="ai-coming-soon__badge">
        🚀 Coming Soon
      </div>
    </section>
  );
}

export default AI;