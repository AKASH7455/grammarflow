import { useMemo, useState } from "react";

import {
  HiOutlineDocumentText,
  HiOutlineArrowLeft,
  HiOutlineBadgeCheck,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClipboardList,
} from "react-icons/hi";

import { FaTrophy } from "react-icons/fa";

import { useLanguage } from "../../../hooks/useLanguage";

import "../../../styles/topiccontent.css";

function ReviewScreen({
  data = [],
  answers = [],
  onRetry,
}) {
  const { language } = useLanguage();
  const [showReview, setShowReview] =
    useState(false);

  const answerMap = useMemo(
    () =>
      answers.reduce((acc, item) => {
        acc[item.questionId] =
          item.selectedAnswer;
        return acc;
      }, {}),
    [answers]
  );

  const score = useMemo(
    () =>
      data.reduce((total, question) => {
        return (
          total +
          (answerMap[question.id] ===
          question.answer
            ? 1
            : 0)
        );
      }, 0),
    [data, answerMap]
  );

  const totalQuestions = data.length;

  const wrongAnswers =
    totalQuestions - score;

  const accuracy =
    totalQuestions > 0
      ? Math.round(
          (score / totalQuestions) * 100
        )
      : 0;

  const getResultStatus = (
    accuracy
  ) => {
    if (accuracy >= 90)
      return "Outstanding";

    if (accuracy >= 75)
      return "Excellent";

    if (accuracy >= 60)
      return "Good";

    if (accuracy >= 40)
      return "Average";

    return "Needs More Practice";
  };

  const resultStatus =
    getResultStatus(accuracy);

  if (
    !Array.isArray(data) ||
    !data.length
  ) {
    return (
      <section className="review-section">
        <div className="result-compact">
          <h3>No Questions Found</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="review-section">
      {!showReview ? (
        <div className="modern-result-card">
          <div className="modern-result-header">
            <div className="modern-result-icon">
              <FaTrophy />
            </div>
            <div className="modern-result-title">
              <h3>Quiz Completed</h3>
            </div>
          </div>

          <div className="modern-result-circle">
            <svg className="score-ring" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 - (accuracy / 100) * (2 * Math.PI * 80)}
                style={{
                  transition: "stroke-dashoffset 1s ease-in-out",
                }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="score-content">
              <span className="score-percentage">{accuracy}%</span>
              <span className="score-detail">{score} / {totalQuestions} Correct</span>
            </div>
          </div>

          <div className="performance-badge">
            {resultStatus}
          </div>

          <div className="modern-stats-grid">
            <div className="modern-stat-card stat-correct">
              <HiOutlineCheckCircle />
              <span className="stat-number">{score}</span>
              <span className="stat-label">Correct</span>
            </div>

            <div className="modern-stat-card stat-wrong">
              <HiOutlineXCircle />
              <span className="stat-number">{wrongAnswers}</span>
              <span className="stat-label">Wrong</span>
            </div>

            <div className="modern-stat-card stat-total">
              <HiOutlineClipboardList />
              <span className="stat-number">{totalQuestions}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>

          <div className="modern-result-buttons">
            <button
              className="modern-btn primary-btn"
              onClick={() =>
                setShowReview(true)
              }
            >
              <HiOutlineDocumentText />
              <span>
                Review Answers
              </span>
            </button>

            <button
              className="modern-btn secondary-btn"
              onClick={onRetry}
            >
              <HiOutlineArrowLeft />
              <span>
                Retry Quiz
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="answer-review">
          <button
            className="back-button"
            onClick={() =>
              setShowReview(false)
            }
          >
            <HiOutlineArrowLeft />
            <span>
              Back to Summary
            </span>
          </button>

          {data.map(
            (question, index) => {
              const userAnswer =
                answerMap[
                  question.id
                ];

              const isCorrect =
                userAnswer ===
                question.answer;

              const explanationText = typeof question.explanation === 'object' 
                ? question.explanation[language] || question.explanation.english 
                : question.explanation;

              return (
                <div
                  key={`${question.id}-${index}`}
                  className="review-card"
                >
                  <h3 className="review-question">
                    {
                      question.question
                    }
                  </h3>

                  <div className="review-answers">
                    <p className="review-answer">
                      <span className="answer-label">
                        Your Answer:
                      </span>

                      <span className="answer-value">
                        {userAnswer ??
                          "Not Answered"}
                      </span>
                    </p>

                    <p className="review-answer">
                      <span className="answer-label">
                        Correct
                        Answer:
                      </span>

                      <span className="answer-value">
                        {
                          question.answer
                        }
                      </span>
                    </p>
                  </div>

                  <div
                    className={`review-status ${
                      isCorrect
                        ? "status-correct"
                        : "status-wrong"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <HiOutlineBadgeCheck />
                        <span>
                          Correct
                        </span>
                      </>
                    ) : (
                      <>
                        <HiOutlineExclamationCircle />
                        <span>
                          Wrong
                        </span>
                      </>
                    )}
                  </div>

                  {explanationText && (
                    <div className="review-explanation">
                      <strong>
                        Explanation
                      </strong>

                      <p>
                        {explanationText}
                      </p>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

export default ReviewScreen;