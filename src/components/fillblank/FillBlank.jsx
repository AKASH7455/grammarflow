import { useState } from "react";
  import {
  FiCheck,
  FiX,
  FiHelpCircle,
} from "react-icons/fi";

import "../fillblank/fillblank.css";

function FillBlank({
  sentence,
  correctAnswer,
  hint,
  explanation,
  onAnswer,
}) {
  const [userAnswer, setUserAnswer] =
    useState("");

  const [isAnswered, setIsAnswered] =
    useState(false);

  const [showHint, setShowHint] =
    useState(false);

  const normalizeText = (text) =>
    text.trim().toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userAnswer.trim()) return;

    const result =
      normalizeText(userAnswer) ===
      normalizeText(correctAnswer);

    setIsAnswered(true);

    onAnswer?.(result);
  };

  const isCorrect =
    normalizeText(userAnswer) ===
    normalizeText(correctAnswer);

  const sentenceParts =
    sentence.split("______");

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
                    (prev) => !prev
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

        </div>
      )}

    </div>
  );
}

export default FillBlank;