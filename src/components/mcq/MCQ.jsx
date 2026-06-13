import { useState } from "react";
import {
  FiCheck,
  FiX,
  FiRotateCcw,
} from "react-icons/fi";

import "../mcq/mcq.css";

function MCQ({
  question,
  options,
  correctAnswer,
  onAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const handleOptionClick = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    onAnswer?.(
      option === correctAnswer
    );
  };

  const handleReset = () => {
    setSelectedAnswer(null);
  };

  const isAnswered =
    selectedAnswer !== null;

  return (
    <div className="mcq-container">
      <h3 className="mcq-question-text">
        {question}
      </h3>

      <div className="mcq-options">
        {options.map((option, index) => {
          let className =
            "mcq-option";

          if (isAnswered) {
            if (
              option === correctAnswer
            ) {
              className +=
                " mcq-option-correct";
            }

            if (
              option === selectedAnswer &&
              option !== correctAnswer
            ) {
              className +=
                " mcq-option-wrong";
            }
          }

          return (
            <button
              key={index}
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
                option ===
                  correctAnswer && (
                  <FiCheck />
                )}

              {isAnswered &&
                option ===
                  selectedAnswer &&
                option !==
                  correctAnswer && (
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
              Correct Answer
            </p>
          ) : (
            <p className="mcq-result-wrong">
              Wrong Answer
            </p>
          )}

          <button
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