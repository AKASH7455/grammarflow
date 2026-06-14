import "../../../styles/topiccontent.css";

function ExamHeader({ currentIndex, totalQuestions, progress }) {
  return (
    <>
      <div className="question-header">
        <div className="question-counter">
          Question {currentIndex + 1} / {totalQuestions}
        </div>
        <div className="progress-percentage">
          {Math.round(progress)}%
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}

export default ExamHeader;
