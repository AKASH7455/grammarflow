import { readStorage, writeStorage } from "../utils/localStorage";
import { getCourseProgress } from "../utils/learningProgress";

export const STORAGE_KEY = "grammarflow-data";

export const defaultData = {
  user: {
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

const toDateKey = (date) => date.toISOString().slice(0, 10);

export const getCurrentStreak = (completedDates, today = new Date()) => {
  const activeDays = new Set(Array.isArray(completedDates) ? completedDates : []);
  const cursor = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  ));
  const todayKey = toDateKey(cursor);

  // A streak remains active through the day after the latest activity.
  if (!activeDays.has(todayKey)) cursor.setUTCDate(cursor.getUTCDate() - 1);

  let streak = 0;
  while (activeDays.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
};

const getLongestStreak = (completedDates) => {
  const sortedDates = [...new Set(completedDates)].sort();
  let longest = 0;
  let current = 0;
  let previous = null;

  sortedDates.forEach((dateKey) => {
    const date = new Date(`${dateKey}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) return;
    const previousDate = previous && new Date(`${previous}T00:00:00.000Z`);
    const isConsecutive = previousDate &&
      date.getTime() - previousDate.getTime() === 86400000;
    current = isConsecutive ? current + 1 : 1;
    longest = Math.max(longest, current);
    previous = dateKey;
  });
  return longest;
};

const getCleanTitle = (id, type) => {
  if (!id) return "Activity";
  
  const parts = id.split("/");
  const lastPart = parts[parts.length - 1];
  
  switch (type) {
    case "quiz":
      const topicName = parts.length > 1 ? parts[parts.length - 2] : lastPart;
      return `${formatTitle(topicName)} Quiz`;
    case "topic":
      return formatTitle(lastPart);
    case "practice":
      if (id.includes("translation")) return "Translation Practice";
      if (id.includes("fillblank")) return "Fill in the Blanks";
      if (id.includes("sentence")) return "Sentence Correction";
      if (id.includes("verb")) return "Verb Forms Practice";
      return "Practice Exercise";
    default:
      return formatTitle(lastPart);
  }
};

const formatTitle = (text) => {
  if (!text) return "Activity";
  return text
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

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
  calculateProgress(normalize(readStorage(STORAGE_KEY, freshData())));

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
  const courseProgress = getCourseProgress(data.topicProgress);
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
  data.progress = {
    ...data.progress,
    completedTopics: topics,
    completedSubjects: unique(
      topics.map((topicId) => topicId.split("/").slice(0, 2).join("/"))
    ),
    completedQuizzes: quizzes,
    completedPractice: practice,
    overallProgress: courseProgress.percentage,
  };
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

const recordActivity = (data, type, id, metadata = {}, timestamp) => {
  const activityId = `${type}:${id}:${timestamp.slice(0, 10)}`;
  const cleanTitle = getCleanTitle(id, type);

  if (!data.activityLogs.some((item) => item.id === activityId)) {
    data.activityLogs.unshift({
      id: activityId,
      type,
      text: cleanTitle,
      timestamp,
    });
  }
  const date = timestamp.slice(0, 10);
  data.user.completedDates = unique([...data.user.completedDates, date]);
  data.user.streak = getCurrentStreak(data.user.completedDates);
  data.user.longestStreak = Math.max(
    data.user.longestStreak,
    getLongestStreak(data.user.completedDates)
  );
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
    recordActivity(data, "quiz", result.quizId, {}, completedAt);
    return data;
  });

export const saveTopicResult = (result) =>
  updateProgress((data) => {
    const completedAt = result.completedAt || new Date().toISOString();
    const record = { completed: true, ...result, completedAt };
    data.topicProgress = upsert(data.topicProgress, "topicId", record);
    recordActivity(data, "topic", result.topicId, {}, completedAt);
    return data;
  });

const saveExercise = (collection, key, result, activityType) =>
  updateProgress((data) => {
    const completedAt = new Date().toISOString();
    const record = { ...result, completedAt };
    data[collection] = upsert(data[collection], key, record);
    if (result.completed) {
      recordActivity(data, activityType, result[key], {}, completedAt);
    }
    return data;
  });

export const saveFillBlankResult = (result) =>
  saveExercise("fillBlankProgress", "exerciseId", result, "fillblank");
export const saveTranslationResult = (result) =>
  saveExercise("translationProgress", "exerciseId", result, "translation");
export const saveSentenceCorrectionResult = (result) =>
  saveExercise("sentenceCorrectionProgress", "exerciseId", result, "sentence");
export const saveVerbResult = (result) =>
  saveExercise("verbProgress", "verbId", result, "verb");

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




