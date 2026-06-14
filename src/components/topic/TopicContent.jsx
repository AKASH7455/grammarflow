import { useEffect, useRef, useState } from "react";

import MCQ from "../mcq/MCQ";
import FillBlank from "../fillblank/FillBlank";

import "../../styles/topiccontent.css";

function TopicContent({
  activeTab,
  data,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const prevActiveTabRef = useRef(activeTab);
  const prevDataRef = useRef(data);

  useEffect(() => {
    if (prevActiveTabRef.current !== activeTab || prevDataRef.current !== data) {
      setCurrentIndex(0);
      setAnswers([]);
      setShowReview(false);
      prevActiveTabRef.current = activeTab;
      prevDataRef.current = data;
    }
  }, [activeTab, data]);

  if (!data) {
    return <div className="empty-state">No Content Available</div>;
  }

  /* NOTES */
  if (activeTab === "notes") {
    return (
      <div className="learning-content">
        {data.title && (
          <h2 className="learning-title">{data.title}</h2>
        )}

        {data.definition && (
          <div className="learning-section">
            <h3>Definition</h3>
            <p>{data.definition}</p>
          </div>
        )}

        {data.content?.map((item) => (
          <div key={item.id} className="learning-item">
            <h4>{item.heading}</h4>
            <p>{item.text}</p>
          </div>
        ))}

        {data.examples?.length > 0 && (
          <div className="learning-section">
            <h3>Examples</h3>
            <ul>
              {data.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return <div className="empty-state">Invalid Data Format</div>;
  }

  const currentQuestion = data[currentIndex];
  const currentAnswer = answers.find(
    (item) => item.questionId === currentQuestion.id
  );

  const progress = (answers.length / data.length) * 100;

  const score = data.filter((question) => {
    const answer = answers.find(
      (item) => item.questionId === question.id
    );
    return answer?.selectedAnswer === question.answer;
  }).length;

  const handleAnswer = (questionId, selectedAnswer) => {
    setAnswers((prev) => {
      const exists = prev.find(
        (item) => item.questionId === questionId
      );

      if (exists) {
        return prev.map((item) =>
          item.questionId === questionId
            ? { ...item, selectedAnswer }
            : item
        );
      }

      return [
        ...prev,
        {
          questionId,
          selectedAnswer,
        },
      ];
    });
  };

  /* REVIEW */
  if (showReview) {
    return (
      <section className="review-section">
        <div className="score-box">
          <h2>Exam Completed</h2>
          <h3>
            {score} / {data.length}
          </h3>
          <p>
            {Math.round((score / data.length) * 100)}% Accuracy
          </p>
        </div>

        {data.map((question) => {
          const userAnswer = answers.find(
            (item) => item.questionId === question.id
          );

          const isCorrect =
            userAnswer?.selectedAnswer === question.answer;

          return (
            <div key={question.id} className="review-card">
              <h3>{question.question}</h3>

              <p>
                <strong>Your Answer:</strong> {userAnswer?.selectedAnswer || "Not answered"}
              </p>

              <p>
                <strong>Correct Answer:</strong> {question.answer}
              </p>

              <p
                className={
                  isCorrect ? "result-correct" : "result-wrong"
                }
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
      </section>
    );
  }

  /* EXAM MODE */
  return (
    <section className="exam-wrapper">
      <div className="question-header">
        <div className="question-counter">
          Question {currentIndex + 1} / {data.length}
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

      {activeTab === "mcq" && (
        <MCQ
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={currentAnswer?.selectedAnswer}
          onAnswer={(answer) =>
            handleAnswer(currentQuestion.id, answer)
          }
        />
      )}

      {activeTab === "fill-blanks" && (
        <FillBlank
          sentence={currentQuestion.question}
          userAnswer={currentAnswer?.selectedAnswer || ""}
          onAnswer={(answer) =>
            handleAnswer(currentQuestion.id, answer)
          }
        />
      )}

      <div className="question-navigation">
        <button
          type="button"
          className="nav-btn"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
        >
          Previous
        </button>

        {currentIndex === data.length - 1 ? (
          <button
            type="button"
            className="nav-btn nav-btn-primary"
            disabled={answers.length !== data.length}
            onClick={() => setShowReview(true)}
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            className="nav-btn nav-btn-primary"
            disabled={!currentAnswer}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}

export default TopicContent;
