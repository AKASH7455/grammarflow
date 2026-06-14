import { useState } from "react";

import MCQ from "../mcq/MCQ";
import FillBlank from "../fillblank/FillBlank";

function TopicContent({
  activeTab,
  data,
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  if (!data) {
    return (
      <div className="empty-state">
        No Content Available
      </div>
    );
  }

  /* =========================
     NOTES
  ========================= */

  if (activeTab === "notes") {
    return (
      <div className="learning-content">
        {data.title && (
          <h2 className="learning-title">
            {data.title}
          </h2>
        )}

        {data.definition && (
          <div className="learning-section">
            <h3>Definition</h3>
            <p>{data.definition}</p>
          </div>
        )}

        {data.content?.map((item) => (
          <div
            key={item.id}
            className="learning-item"
          >
            <h4>{item.heading}</h4>
            <p>{item.text}</p>
          </div>
        ))}

        {data.examples?.length > 0 && (
          <div className="learning-section">
            <h3>Examples</h3>

            <ul>
              {data.examples.map(
                (example, index) => (
                  <li key={index}>
                    {example}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  /* =========================
     SAFETY CHECK
  ========================= */

  if (!Array.isArray(data)) {
    return (
      <div className="empty-state">
        Invalid Data Format
      </div>
    );
  }

  const currentQuestion =
    data[currentIndex];

  /* =========================
     MCQ
  ========================= */

  if (activeTab === "mcq") {
    return (
      <div className="practice-wrapper">

        <div className="question-counter">
          Question {currentIndex + 1} of{" "}
          {data.length}
        </div>

        <MCQ
          key={currentQuestion.id}
          question={
            currentQuestion.question
          }
          options={
            currentQuestion.options
          }
          correctAnswer={
            currentQuestion.answer
          }
          explanation={
            currentQuestion.explanation
          }
        />

        <div className="question-navigation">
          <button
            type="button"
            className="nav-btn"
            disabled={currentIndex === 0}
            onClick={() =>
              setCurrentIndex(
                (prev) => prev - 1
              )
            }
          >
            Previous
          </button>

          <button
            type="button"
            className="nav-btn"
            disabled={
              currentIndex ===
              data.length - 1
            }
            onClick={() =>
              setCurrentIndex(
                (prev) => prev + 1
              )
            }
          >
            Next
          </button>
        </div>

      </div>
    );
  }

  /* =========================
     FILL BLANKS
  ========================= */

  if (activeTab === "fill-blanks") {
    return (
      <div className="practice-wrapper">

        <div className="question-counter">
          Question {currentIndex + 1} of{" "}
          {data.length}
        </div>

        <FillBlank
          key={currentQuestion.id}
          sentence={
            currentQuestion.question
          }
          correctAnswer={
            currentQuestion.answer
          }
          hint={
            currentQuestion.hintOptions?.join(", ")
          }
          explanation={
            currentQuestion.explanation
          }
        />

        <div className="question-navigation">
          <button
            type="button"
            className="nav-btn"
            disabled={currentIndex === 0}
            onClick={() =>
              setCurrentIndex(
                (prev) => prev - 1
              )
            }
          >
            Previous
          </button>

          <button
            type="button"
            className="nav-btn"
            disabled={
              currentIndex ===
              data.length - 1
            }
            onClick={() =>
              setCurrentIndex(
                (prev) => prev + 1
              )
            }
          >
            Next
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="empty-state">
      Content Not Found
    </div>
  );
}

export default TopicContent;