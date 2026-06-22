import { useEffect, useRef, useState } from "react";

import MCQ from "./questions/MCQ";
import FillBlank from "./questions/FillBlank";
import AI from "./questions/AI";
import Notes from "./Notes";
import ExamHeader from "./exam/ExamHeader";
import ExamNavigation from "./exam/ExamNavigation";
import ReviewScreen from "./exam/ReviewScreen";
import { useProgress } from "../../hooks/useProgress";

import "../../styles/topiccontent.css";

function TopicContent({
  activeTab,
  data,
  onReviewModeChange,
  topicId,
}) {
  const { saveQuizResult, saveFillBlankResult, saveTopicProgress } = useProgress();

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

  useEffect(() => {
    if (onReviewModeChange) {
      onReviewModeChange(showReview);
    }
  }, [showReview, onReviewModeChange]);

  if (!data) {
    return <div className="empty-state">No Content Available</div>;
  }

  /* NOTES */
  if (activeTab === "notes") {
    return <Notes data={data} />;
  }

  /* AI */
  if (activeTab === "ai-practice") {
    return <AI />;
  }

  if (!Array.isArray(data)) {
    return <div className="empty-state">Invalid Data Format</div>;
  }

  const currentQuestion = data[currentIndex];
  const currentAnswer = answers.find(
    (item) => item.questionId === currentQuestion.id
  );

  const progress = (answers.length / data.length) * 100;

  

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

  const handleSubmit = () => {
    const score = data.reduce((sum, question) => sum + (answers.find((item) => item.questionId === question.id)?.selectedAnswer === question.answer ? 1 : 0), 0);
    const id = topicId + "/" + activeTab;
    if (activeTab === "mcq") saveQuizResult({ quizId: id, score, totalQuestions: data.length, correctAnswers: score });
    if (activeTab === "fill-blanks") saveFillBlankResult({ exerciseId: id, completed: true, score });
    saveTopicProgress({ topicId, completed: true });
    setShowReview(true);
  };

  /* REVIEW */
  if (showReview) {
    return (
      <ReviewScreen
        data={data}
        answers={answers}
        onRetry={() => {
          setCurrentIndex(0);
          setAnswers([]);
          setShowReview(false);
        }}
      />
    );
  }

  /* EXAM MODE */
  return (
    <section className="exam-wrapper">
      <ExamHeader
        currentIndex={currentIndex}
        totalQuestions={data.length}
        progress={progress}
      />

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
          hintOptions={currentQuestion.hintOptions}
        />
      )}

      <ExamNavigation
        currentIndex={currentIndex}
        totalQuestions={data.length}
        hasAnswer={!!currentAnswer}
        allAnswered={answers.length === data.length}
        onPrevious={() => setCurrentIndex((prev) => prev - 1)}
        onNext={() => setCurrentIndex((prev) => prev + 1)}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default TopicContent;

