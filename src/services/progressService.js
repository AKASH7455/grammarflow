/**
 * Progress Service
 * Manages progress data and calculations
 */

const PROGRESS_STORAGE_KEY = "grammar_progress_data";

/**
 * Get default progress data
 */
const getDefaultProgressData = () => ({
  overallProgress: 0,
  topicsCompleted: 0,
  notesRead: 0,
  mcqSolved: 0,
  practiceCompleted: 0,
  topicProgress: [],
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  achievements: [],
});

/**
 * Clamp progress value
 */
const clampProgress = (value) =>
  Math.min(100, Math.max(0, Number(value) || 0));

/**
 * Get progress information from localStorage
 */
export const getProgressData = () => {
  try {
    const data = localStorage.getItem(
      PROGRESS_STORAGE_KEY
    );

    if (!data) {
      return getDefaultProgressData();
    }

    return {
      ...getDefaultProgressData(),
      ...JSON.parse(data),
    };
  } catch (error) {
    console.error(
      "Error reading progress data:",
      error
    );

    return getDefaultProgressData();
  }
};

/**
 * Save progress information to localStorage
 */
const saveProgressData = (data) => {
  try {
    localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      "Error saving progress data:",
      error
    );
  }
};

/**
 * Update overall progress
 */
export const updateOverallProgress = (
  progress
) => {
  const data = getProgressData();

  data.overallProgress =
    clampProgress(progress);

  saveProgressData(data);

  return data;
};

/**
 * Update topic progress
 */
export const updateTopicProgress = (
  topicName,
  progress
) => {
  const data = getProgressData();

  const safeProgress =
    clampProgress(progress);

  const existingTopic =
    data.topicProgress.find(
      (t) => t.name === topicName
    );

  if (existingTopic) {
    existingTopic.progress =
      safeProgress;
  } else {
    data.topicProgress.push({
      name: topicName,
      progress: safeProgress,
    });
  }

  const totalProgress =
    data.topicProgress.reduce(
      (sum, t) => sum + t.progress,
      0
    );

  data.overallProgress =
    data.topicProgress.length > 0
      ? Math.round(
          totalProgress /
            data.topicProgress.length
        )
      : 0;

  saveProgressData(data);

  return data;
};

/**
 * Increment stat counter
 */
export const incrementStat = (
  statType
) => {
  const data = getProgressData();

  switch (statType) {
    case "topicsCompleted":
      data.topicsCompleted += 1;
      break;

    case "notesRead":
      data.notesRead += 1;
      break;

    case "mcqSolved":
      data.mcqSolved += 1;
      break;

    case "practiceCompleted":
      data.practiceCompleted += 1;
      break;

    default:
      return data;
  }

  saveProgressData(data);

  return data;
};

/**
 * Update weekly activity
 */
export const updateWeeklyActivity = (
  dayIndex,
  activity
) => {
  const data = getProgressData();

  if (
    dayIndex >= 0 &&
    dayIndex <= 6
  ) {
    data.weeklyActivity[dayIndex] =
      clampProgress(activity);
  }

  saveProgressData(data);

  return data;
};

/**
 * Add achievement
 */
export const addAchievement = (
  achievement
) => {
  const data = getProgressData();

  const exists =
    data.achievements.some(
      (item) =>
        item.title ===
        achievement.title
    );

  if (!exists) {
    data.achievements.push(
      achievement
    );

    saveProgressData(data);
  }

  return data;
};

/**
 * Get topic-wise progress data
 */
export const getTopicProgressData =
  () => {
    const defaultTopics = [
      { name: "Nouns", progress: 0 },
      { name: "Pronouns", progress: 0 },
      { name: "Verbs", progress: 0 },
      { name: "Tenses", progress: 0 },
      { name: "Adjectives", progress: 0 },
      { name: "Adverbs", progress: 0 },
      { name: "Articles", progress: 0 },
      { name: "Prepositions", progress: 0 },
      { name: "Conjunctions", progress: 0 },
      { name: "Voice", progress: 0 },
      { name: "Narration", progress: 0 },
      { name: "Vocabulary", progress: 0 },
    ];

    const data =
      getProgressData();

    if (
      !data.topicProgress ||
      data.topicProgress.length === 0
    ) {
      return defaultTopics;
    }

    return defaultTopics.map(
      (defaultTopic) => {
        const existing =
          data.topicProgress.find(
            (t) =>
              t.name ===
              defaultTopic.name
          );

        return (
          existing ||
          defaultTopic
        );
      }
    );
  };