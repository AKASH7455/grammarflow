import { useEffect, useRef, useState } from "react";

import MCQ from "./questions/MCQ";
import FillBlank from "./questions/FillBlank";
import AI from "./questions/AI";
import Notes from "./Notes";
import ExamHeader from "./exam/ExamHeader";
import ExamNavigation from "./exam/ExamNavigation";
import ReviewScreen from "./exam/ReviewScreen";
import { useProgress } from "../../hooks/useProgress";
import {
  loadQuizSession,
  persistQuizSession,
  restartQuizSession,
} from "../../services/quizSessionService";

import "../../styles/topiccontent.css";

function TopicContent({
  activeTab,
  data,
  onReviewModeChange,
  topicId,
}) {
  const {
    saveQuizResult,
    saveFillBlankResult,
    saveTopicProgress,
  } = useProgress();

  const quizId = `${topicId}/${activeTab}`;
  const [initialSession] = useState(() =>
    loadQuizSession(
      quizId,
      Array.isArray(data) ? data.length : 0
    )
  );

  const [currentIndex, setCurrentIndex] = useState(
    initialSession.currentIndex
  );
  const [answers, setAnswers] = useState(
    initialSession.answers
  );
  const [showReview, setShowReview] = useState(
    initialSession.showReview
  );
  const [scoreData, setScoreData] = useState(
    initialSession.score
  );
  const [showAnswerReview, setShowAnswerReview] = useState(
    Boolean(initialSession.showAnswerReview)
  );
  const skipPersistRef = useRef(false);

  useEffect(() => {
    if (!Array.isArray(data) || !["mcq", "fill-blanks"].includes(activeTab)) return;
    if (skipPersistRef.current) {
      skipPersistRef.current = false;
      return;
    }

    persistQuizSession(quizId, {
      currentIndex,
      answers,
      score: scoreData,
      completed: showReview,
      showReview,
      showAnswerReview,
      subjectId: topicId.split("/").slice(0, 2).join("/"),
      topicId,
    });
  }, [
    answers,
    currentIndex,
    data,
    activeTab,
    quizId,
    scoreData,
    showReview,
    showAnswerReview,
    topicId,
  ]);

  useEffect(() => {
    onReviewModeChange?.(showReview);
  }, [showReview, onReviewModeChange]);

  if (!data) {
    return <div className="empty-state">No Content Available</div>;
  }

  if (activeTab === "notes") {
    return <Notes data={data} />;
  }

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
    setAnswers((previous) => {
      const exists = previous.find(
        (item) => item.questionId === questionId
      );

      if (exists) {
        return previous.map((item) =>
          item.questionId === questionId
            ? { ...item, selectedAnswer }
            : item
        );
      }

      return [...previous, { questionId, selectedAnswer }];
    });
  };

  const handleSubmit = () => {
    const score = data.reduce(
      (sum, question) =>
        sum +
        (answers.find(
          (item) => item.questionId === question.id
        )?.selectedAnswer === question.answer
          ? 1
          : 0),
      0
    );

    setScoreData({
      score,
      totalQuestions: data.length,
      correctAnswers: score,
    });

    if (activeTab === "mcq") {
      saveQuizResult({
        quizId,
        score,
        totalQuestions: data.length,
        correctAnswers: score,
      });
    }

    if (activeTab === "fill-blanks") {
      saveFillBlankResult({
        exerciseId: quizId,
        completed: true,
        score,
      });
    }

    saveTopicProgress({ topicId, completed: true });
    setShowReview(true);
  };

  const handleRestart = () => {
    skipPersistRef.current = true;
    restartQuizSession(quizId);
    setCurrentIndex(0);
    setAnswers([]);
    setScoreData(null);
    setShowAnswerReview(false);
    setShowReview(false);
  };

  if (showReview) {
    return (
      <ReviewScreen
        data={data}
        answers={answers}
        onRetry={handleRestart}
        initialShowAnswers={showAnswerReview}
        onReviewViewChange={setShowAnswerReview}
      />
    );
  }

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
        onPrevious={() =>
          setCurrentIndex((previous) => previous - 1)
        }
        onNext={() =>
          setCurrentIndex((previous) => previous + 1)
        }
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default TopicContent;










