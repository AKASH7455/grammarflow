import { useState } from "react";
import "../../../styles/topiccontent.css";

function ReviewScreen({ data, answers }) {
  const [showReview, setShowReview] = useState(false);

  const score = data.filter((question) => {
    const answer = answers.find(
      (item) => item.questionId === question.id
    );
    return answer?.selectedAnswer === question.answer;
  }).length;

  const wrongAnswers = data.length - score;
  const accuracy = Math.round((score / data.length) * 100);

  return (
    <section className="review-section">
      {!showReview ? (
        <div className="progress-summary">
          <div className="score-box">
            <h2>Quiz Completed!</h2>
            <div className="score-display">
              <span className="score-number">{score}</span>
              <span className="score-divider">/</span>
              <span className="score-total">{data.length}</span>
            </div>
            <p className="accuracy-text">{accuracy}% Accuracy</p>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Questions</span>
              <span className="stat-value">{data.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Correct</span>
              <span className="stat-value stat-correct">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Wrong</span>
              <span className="stat-value stat-wrong">{wrongAnswers}</span>
            </div>
          </div>

          <button
            className="review-button"
            onClick={() => setShowReview(true)}
          >
            Review Answers
          </button>
        </div>
      ) : (
        <div className="answer-review">
          <button
            className="back-button"
            onClick={() => setShowReview(false)}
          >
            ← Back to Summary
          </button>

          {data.map((question) => {
            const userAnswer = answers.find(
              (item) => item.questionId === question.id
            );

            const isCorrect =
              userAnswer?.selectedAnswer === question.answer;

            return (
              <div key={question.id} className="review-card">
                <h3 className="review-question">{question.question}</h3>

                <div className="review-answers">
                  <p className="review-answer">
                    <span className="answer-label">Your Answer:</span>
                    <span className="answer-value">
                      {userAnswer?.selectedAnswer || "Not answered"}
                    </span>
                  </p>

                  <p className="review-answer">
                    <span className="answer-label">Correct Answer:</span>
                    <span className="answer-value">
                      {question.answer}
                    </span>
                  </p>
                </div>

                <p
                  className={`review-status ${
                    isCorrect ? "status-correct" : "status-wrong"
                  }`}
                >
                  {isCorrect ? "✓ Correct" : "✗ Wrong"}
                </p>

                {question.explanation && (
                  <div className="review-explanation">
                    <strong>Explanation</strong>
                    <p>{question.explanation}</p>
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
