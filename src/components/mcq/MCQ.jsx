import "../mcq/mcq.css";

function MCQ({
  question,
  options = [],
  selectedAnswer,
  onAnswer,
}) {
  return (
    <div className="mcq-container">
      <h3 className="mcq-question-text">
        {question}
      </h3>

      <div className="mcq-options">
        {options.map(
          (option, index) => (
            <button
              key={option}
              type="button"
              className={`mcq-option ${
                selectedAnswer === option
                  ? "mcq-option-selected"
                  : ""
              }`}
              onClick={() =>
                onAnswer(option)
              }
            >
              <span className="mcq-option-label">
                {String.fromCharCode(
                  65 + index
                )}
              </span>

              <span className="mcq-option-text">
                {option}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default MCQ;