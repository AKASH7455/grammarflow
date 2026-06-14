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
  return (
    <div className="question-navigation">
      <button
        type="button"
        className="nav-btn"
        disabled={currentIndex === 0}
        onClick={onPrevious}
      >
        Previous
      </button>

      {currentIndex === totalQuestions - 1 ? (
        <button
          type="button"
          className="nav-btn nav-btn-primary"
          disabled={!allAnswered}
          onClick={onSubmit}
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          className="nav-btn nav-btn-primary"
          disabled={!hasAnswer}
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default ExamNavigation;
