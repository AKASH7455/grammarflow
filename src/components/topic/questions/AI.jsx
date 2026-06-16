import { FiCpu } from "react-icons/fi";
import "../../../styles/ai.css";

function AI() {
  return (
    <div className="ai-container">
      <div className="ai-illustration">
        <FiCpu className="ai-robot-icon" />
      </div>
      
      <h2 className="ai-title">AI Practice</h2>
      
      <div className="ai-badge">Coming Soon</div>
      
      <p className="ai-description">
        We are working hard to bring you an amazing AI practice experience.
      </p>
      
      <p className="ai-cta">Stay tuned!</p>
    </div>
  );
}

export default AI;
