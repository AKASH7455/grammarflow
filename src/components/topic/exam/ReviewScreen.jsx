import { useState } from "react";

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

import "../../../styles/topiccontent.css";

function ReviewScreen({ data, answers }) {
  const [showReview, setShowReview] = useState(false);

  const score = data.filter((question) => {
    const answer = answers.find(
      (item) => item.questionId === question.id
    );

    return (
      answer?.selectedAnswer === question.answer
    );
  }).length;

  const wrongAnswers = data.length - score;

  const accuracy = Math.round(
    (score / data.length) * 100
  );

  return (
    <section className="review-section">
      {!showReview ? (
        <div className="result-compact">
          <div className="result-header">
            <div className="result-title">
              <FaTrophy />
              <span>Quiz Completed</span>
            </div>
            <div className="result-accuracy">
              {accuracy}% Accuracy
            </div>
          </div>

          <div className="result-score">
            {score} / {data.length} Correct
          </div>

          <div className="result-progress-row">
            <div className="result-progress-bar">
              <div
                className="result-progress-fill"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <div className="result-progress-percent">
              {accuracy}%
            </div>
          </div>

          <div className="result-stats-row">
            <div className="result-stat-item">
              <HiOutlineCheckCircle />
              <span>{score} Correct</span>
            </div>
            <div className="result-stat-item">
              <HiOutlineXCircle />
              <span>{wrongAnswers} Wrong</span>
            </div>
            <div className="result-stat-item">
              <HiOutlineClipboardList />
              <span>{data.length} Total</span>
            </div>
          </div>

          <div className="result-status">
            <HiOutlineExclamationCircle />
            <span>Needs More Practice</span>
          </div>

          <div className="result-buttons">
            <button
              className="result-btn"
              onClick={() => setShowReview(true)}
            >
              <HiOutlineDocumentText />
              <span>Review Answers</span>
            </button>
            <button
              className="result-btn result-btn-secondary"
              onClick={() => window.location.reload()}
            >
              <HiOutlineArrowLeft />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="answer-review">
          <button
            className="back-button"
            onClick={() => setShowReview(false)}
          >
            <HiOutlineArrowLeft />
            <span>Back to Summary</span>
          </button>

          {data.map((question) => {
            const userAnswer = answers.find(
              (item) =>
                item.questionId === question.id
            );

            const isCorrect =
              userAnswer?.selectedAnswer ===
              question.answer;

            return (
              <div
                key={question.id}
                className="review-card"
              >
                <h3 className="review-question">
                  {question.question}
                </h3>

                <div className="review-answers">
                  <p className="review-answer">
                    <span className="answer-label">
                      Your Answer:
                    </span>

                    <span className="answer-value">
                      {userAnswer?.selectedAnswer ||
                        "Not Answered"}
                    </span>
                  </p>

                  <p className="review-answer">
                    <span className="answer-label">
                      Correct Answer:
                    </span>

                    <span className="answer-value">
                      {question.answer}
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
                      <span>Correct</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineExclamationCircle />
                      <span>Wrong</span>
                    </>
                  )}
                </div>

                {question.explanation && (
                  <div className="review-explanation">
                    <strong>
                      Explanation
                    </strong>

                    <p>
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ReviewScreen;