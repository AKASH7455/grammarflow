import {
  FiHelpCircle,
} from "react-icons/fi";

import "../../../styles/topiccontent.css";

function ExamHeader({
  currentIndex,
  totalQuestions,
  progress,
}) {
  return (
    <div className="question-header">
      <div className="question-counter">
        <FiHelpCircle />

        <span>
          Question {currentIndex + 1} of {totalQuestions} ({Math.round(progress)}%)
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ExamHeader;