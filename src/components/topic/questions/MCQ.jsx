import "../../../styles/mcq.css";

function MCQ({
  question,
  options = [],
  selectedAnswer,
  onAnswer,
  onEnter,
}) {
  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || event.repeat) return;

    event.preventDefault();
    onEnter?.();
  };

  return (
    <div className="mcq-container">
      <h3 className="mcq-question-text">
        {question}
      </h3>

      <div className="mcq-options">
        {options.map((option) => {
          const isSelected =
            selectedAnswer === option;

          return (
            <label
              key={option}
              className={`mcq-option ${
                isSelected
                  ? "mcq-option-selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="mcq-option"
                value={option}
                checked={isSelected}
                onChange={() => onAnswer(option)}
                onKeyDown={handleKeyDown}
                className="mcq-radio"
              />

              <span className="mcq-option-text">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default MCQ;