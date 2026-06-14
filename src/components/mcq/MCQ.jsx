import { useState } from "react";
import {
  FiCheck,
  FiX,
  FiRotateCcw,
} from "react-icons/fi";

import "../mcq/mcq.css";

function MCQ({
  question,
  options = [],
  correctAnswer,
  explanation,
  onAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const isAnswered =
    selectedAnswer !== null;

  const handleOptionClick = (option) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);

    onAnswer?.(
      option === correctAnswer
    );
  };

  const handleReset = () => {
    setSelectedAnswer(null);
  };

  return (
    <div className="mcq-container">
      <h3 className="mcq-question-text">
        {question}
      </h3>

      <div className="mcq-options">
        {options.map((option, index) => {
          const isCorrect =
            option === correctAnswer;

          const isSelected =
            option === selectedAnswer;

          let className =
            "mcq-option";

          if (isAnswered) {
            if (isCorrect) {
              className +=
                " mcq-option-correct";
            }

            if (
              isSelected &&
              !isCorrect
            ) {
              className +=
                " mcq-option-wrong";
            }
          }

          return (
            <button
              key={option}
              type="button"
              className={className}
              disabled={isAnswered}
              onClick={() =>
                handleOptionClick(option)
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

              {isAnswered &&
                isCorrect && (
                  <FiCheck />
                )}

              {isAnswered &&
                isSelected &&
                !isCorrect && (
                  <FiX />
                )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mcq-result">
          {selectedAnswer ===
          correctAnswer ? (
            <p className="mcq-result-correct">
              ✓ Correct Answer
            </p>
          ) : (
            <p className="mcq-result-wrong">
              ✗ Wrong Answer
            </p>
          )}

          {explanation && (
            <div className="explanation-card">
              <div className="explanation-header">
                <strong>Explanation:</strong>
              </div>
              <div className="explanation-content">
                {explanation}
              </div>
            </div>
          )}

          <button
            type="button"
            className="mcq-reset-btn"
            onClick={handleReset}
          >
            <FiRotateCcw />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default MCQ;