import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";

import "../../../styles/topiccontent.css";

function ExamNavigation({
  currentIndex,
  totalQuestions,
  hasAnswer,
  allAnswered,
  onPrevious,
  onNext,
  onSubmit,
}) {
  const isLastQuestion =
    currentIndex === totalQuestions - 1;

  return (
    <div className="question-navigation">
      <button
        type="button"
        className="nav-btn"
        disabled={currentIndex === 0}
        onClick={onPrevious}
      >
        <FiChevronLeft />
        <span>Previous</span>
      </button>

      {isLastQuestion ? (
        <button
          type="button"
          className="nav-btn nav-btn-primary"
          disabled={!allAnswered}
          onClick={onSubmit}
        >
          <FiCheckCircle />
          <span>Submit</span>
        </button>
      ) : (
        <button
          type="button"
          className="nav-btn nav-btn-primary"
          disabled={!hasAnswer}
          onClick={onNext}
        >
          <span>Next</span>
          <FiChevronRight />
        </button>
      )}
    </div>
  );
}

export default ExamNavigation;