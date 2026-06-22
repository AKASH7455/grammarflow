import { readStorage, writeStorage } from "../utils/localStorage";

export const STORAGE_KEY = "grammarflow-data";

export const defaultData = {
  user: {
    xp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    lastActivity: null,
    completedDates: [],
  },
  progress: {
    overallProgress: 0,
    completedTopics: [],
    completedSubjects: [],
    completedQuizzes: [],
    completedPractice: [],
    achievements: [],
  },
  quizResults: [],
  quizSessions: {},
  topicProgress: [],
  translationProgress: [],
  fillBlankProgress: [],
  sentenceCorrectionProgress: [],
  verbProgress: [],
  activityLogs: [],
  settings: { theme: "light", language: "hinglish" },
};

const freshData = () => JSON.parse(JSON.stringify(defaultData));
const unique = (items) => [...new Set(items)];

const normalize = (value) => {
  const safe =
    value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};

  return {
    ...freshData(),
    ...safe,
    user: {
      ...defaultData.user,
      ...(safe.user && typeof safe.user === "object" ? safe.user : {}),
    },
    progress: {
      ...defaultData.progress,
      ...(safe.progress && typeof safe.progress === "object"
        ? safe.progress
        : {}),
    },
    quizResults: Array.isArray(safe.quizResults) ? safe.quizResults : [],
    topicProgress: Array.isArray(safe.topicProgress) ? safe.topicProgress : [],
    translationProgress: Array.isArray(safe.translationProgress)
      ? safe.translationProgress
      : [],
    fillBlankProgress: Array.isArray(safe.fillBlankProgress)
      ? safe.fillBlankProgress
      : [],
    sentenceCorrectionProgress: Array.isArray(safe.sentenceCorrectionProgress)
      ? safe.sentenceCorrectionProgress
      : [],
    verbProgress: Array.isArray(safe.verbProgress) ? safe.verbProgress : [],
    activityLogs: Array.isArray(safe.activityLogs) ? safe.activityLogs : [],
    settings: {
      ...defaultData.settings,
      ...(safe.settings && typeof safe.settings === "object"
        ? safe.settings
        : {}),
    },
    quizSessions:
      safe.quizSessions &&
      typeof safe.quizSessions === "object" &&
      !Array.isArray(safe.quizSessions)
        ? safe.quizSessions
        : {},
  };
};

export const getProgress = () =>
  normalize(readStorage(STORAGE_KEY, freshData()));

export const saveProgress = (value) => {
  const data = normalize(value);
  writeStorage(STORAGE_KEY, data);
  return data;
};

const upsert = (items, key, record) => {
  const index = items.findIndex((item) => item[key] === record[key]);
  if (index < 0) return [...items, record];
  const next = [...items];
  next[index] = { ...next[index], ...record };
  return next;
};

const calculateProgress = (data) => {
  const topics = unique(
    data.topicProgress.filter((item) => item.completed).map((item) => item.topicId)
  );
  const quizzes = unique(data.quizResults.map((item) => item.quizId));
  const practice = unique([
    ...data.fillBlankProgress.filter((item) => item.completed).map((item) => item.exerciseId),
    ...data.translationProgress.filter((item) => item.completed).map((item) => item.exerciseId),
    ...data.sentenceCorrectionProgress.filter((item) => item.completed).map((item) => item.exerciseId),
    ...data.verbProgress.filter((item) => item.completed).map((item) => item.verbId),
  ]);
  const total =
    data.topicProgress.length +
    data.quizResults.length +
    data.fillBlankProgress.length +
    data.translationProgress.length +
    data.sentenceCorrectionProgress.length +
    data.verbProgress.length;

  data.progress = {
    ...data.progress,
    completedTopics: topics,
    completedSubjects: unique(
      topics.map((topicId) => topicId.split("/").slice(0, 2).join("/"))
    ),
    completedQuizzes: quizzes,
    completedPractice: practice,
    overallProgress: total
      ? Math.round(((topics.length + quizzes.length + practice.length) / total) * 100)
      : 0,
  };
  data.user.level = Math.floor(data.user.xp / 500) + 1;
  return data;
};

export const updateProgress = (updater) => {
  const current = getProgress();
  const next =
    typeof updater === "function"
      ? updater(current)
      : normalize({ ...current, ...updater });
  return saveProgress(calculateProgress(next));
};

const recordActivity = (data, type, id, xp, timestamp) => {
  const activityId = `${type}:${id}`;
  if (!data.activityLogs.some((item) => item.id === activityId)) {
    data.user.xp += xp;
    data.activityLogs.unshift({
      id: activityId,
      type,
      text: `Completed ${id}`,
      timestamp,
      xp,
    });
  }
  const date = timestamp.slice(0, 10);
  data.user.completedDates = unique([...data.user.completedDates, date]);
  data.user.streak = data.user.completedDates.length;
  data.user.longestStreak = Math.max(data.user.longestStreak, data.user.streak);
  data.user.lastActivity = timestamp;
};

export const saveQuizResult = (result) =>
  updateProgress((data) => {
    const completedAt = result.completedAt || new Date().toISOString();
    data.quizResults = upsert(data.quizResults, "quizId", {
      ...result,
      correctAnswers: result.correctAnswers ?? result.score,
      completedAt,
    });
    recordActivity(data, "quiz", result.quizId, 50, completedAt);
    return data;
  });

export const saveTopicResult = (result) =>
  updateProgress((data) => {
    const completedAt = result.completedAt || new Date().toISOString();
    const record = { completed: true, ...result, completedAt };
    data.topicProgress = upsert(data.topicProgress, "topicId", record);
    recordActivity(data, "topic", result.topicId, 25, completedAt);
    return data;
  });

const saveExercise = (collection, key, result) =>
  updateProgress((data) => {
    const completedAt = new Date().toISOString();
    const record = { ...result, completedAt };
    data[collection] = upsert(data[collection], key, record);
    if (result.completed) {
      recordActivity(data, "practice", result[key], 30, completedAt);
    }
    return data;
  });

export const saveFillBlankResult = (result) =>
  saveExercise("fillBlankProgress", "exerciseId", result);
export const saveTranslationResult = (result) =>
  saveExercise("translationProgress", "exerciseId", result);
export const saveSentenceCorrectionResult = (result) =>
  saveExercise("sentenceCorrectionProgress", "exerciseId", result);
export const saveVerbResult = (result) =>
  saveExercise("verbProgress", "verbId", result);

export const saveQuizSession = (quizId, session) =>
  updateProgress((data) => {
    data.quizSessions[quizId] = {
      ...session,
      quizId,
      updatedAt: new Date().toISOString(),
    };
    return data;
  });

export const getQuizSession = (quizId) => {
  const session = getProgress().quizSessions[quizId];
  return session && typeof session === "object" ? session : null;
};

export const clearQuizSession = (quizId) =>
  updateProgress((data) => {
    delete data.quizSessions[quizId];
    return data;
  });

export const saveSetting = (key, value) =>
  updateProgress((data) => {
    data.settings[key] = value;
    return data;
  });

export const resetProgress = () => saveProgress(freshData());




