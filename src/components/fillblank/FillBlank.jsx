import { useState } from "react";
import {
  FiCheck,
  FiX,
  FiRotateCcw,
  FiHelpCircle,
} from "react-icons/fi";

import "../fillblank/fillblank.css";

function FillBlank({
  sentence,
  correctAnswer,
  hint,
  onAnswer,
}) {
  const [userAnswer, setUserAnswer] =
    useState("");

  const [isAnswered, setIsAnswered] =
    useState(false);

  const [showHint, setShowHint] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const answer =
      userAnswer.trim();

    if (!answer) return;

    const result =
      answer.toLowerCase() ===
      correctAnswer.toLowerCase();

    setIsAnswered(true);

    onAnswer?.(result);
  };

  const handleReset = () => {
    setUserAnswer("");
    setIsAnswered(false);
    setShowHint(false);
  };

  const isCorrect =
    userAnswer.trim().toLowerCase() ===
    correctAnswer.toLowerCase();

  const sentenceParts =
    sentence.split("_______");

  return (
    <div className="fillblank-container">

      <p className="fillblank-sentence">

        {sentenceParts[0]}

        <span
          className={`fillblank-blank ${
            isAnswered
              ? isCorrect
                ? "fillblank-correct"
                : "fillblank-wrong"
              : ""
          }`}
        >
          {isAnswered
            ? userAnswer
            : "_______"}
        </span>

        {sentenceParts[1]}

      </p>

      {!isAnswered && (
        <form
          className="fillblank-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            value={userAnswer}
            className="fillblank-input"
            placeholder="Enter answer"
            onChange={(e) =>
              setUserAnswer(
                e.target.value
              )
            }
          />

          <div className="fillblank-actions">

            <button
              type="submit"
              className="fillblank-submit-btn"
            >
              Check Answer
            </button>

            {hint && (
              <button
                type="button"
                className="fillblank-hint-btn"
                onClick={() =>
                  setShowHint(
                    !showHint
                  )
                }
              >
                <FiHelpCircle />
                Hint
              </button>
            )}

          </div>

          {showHint && (
            <div className="fillblank-hint">
              {hint}
            </div>
          )}

        </form>
      )}

      {isAnswered && (
        <div className="fillblank-result">

          {isCorrect ? (
            <div className="fillblank-success">

              <FiCheck />

              <span>
                Correct Answer
              </span>

            </div>
          ) : (
            <div className="fillblank-error">

              <FiX />

              <span>
                Correct Answer:
                {" "}
                <strong>
                  {correctAnswer}
                </strong>
              </span>

            </div>
          )}

          <button
            className="fillblank-reset-btn"
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

export default FillBlank;