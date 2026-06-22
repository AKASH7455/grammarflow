import {
  clearQuizSession,
  getQuizSession,
  saveQuizSession,
} from "./grammarFlowStorage";

const emptySession = {
  currentIndex: 0,
  answers: [],
  score: null,
  completed: false,
  showReview: false,
  showAnswerReview: false,
};

export const loadQuizSession = (quizId, totalQuestions) => {
  const saved = getQuizSession(quizId);
  if (!saved) return { ...emptySession };

  const currentIndex = Number.isInteger(saved.currentIndex)
    ? Math.min(Math.max(saved.currentIndex, 0), Math.max(totalQuestions - 1, 0))
    : 0;

  return {
    ...emptySession,
    ...saved,
    currentIndex,
    answers: Array.isArray(saved.answers) ? saved.answers : [],
    completed: Boolean(saved.completed),
    showReview: Boolean(saved.showReview),
  };
};

export const persistQuizSession = (quizId, session) =>
  saveQuizSession(quizId, session);

export const restartQuizSession = (quizId) =>
  clearQuizSession(quizId);


const activeTabSessionId = (topicId) => `active-tab:${topicId}`;

export const loadActiveQuizTab = (topicId) => {
  const saved = getQuizSession(activeTabSessionId(topicId));
  const allowedTabs = ["notes", "mcq", "fill-blanks", "ai-practice"];
  return allowedTabs.includes(saved?.activeTab)
    ? saved.activeTab
    : "notes";
};

export const persistActiveQuizTab = (topicId, activeTab) =>
  saveQuizSession(activeTabSessionId(topicId), { activeTab });


