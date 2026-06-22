import { getProgress, saveProgress, updateProgress, resetProgress } from "./grammarFlowStorage";

export { getProgress, saveProgress, updateProgress, resetProgress };

export const getProgressData = () => {
  const data = getProgress();
  return {
    ...data.progress,
    topicsCompleted: data.progress.completedTopics.length,
    notesRead: data.progress.completedTopics.length,
    mcqSolved: data.progress.completedQuizzes.length,
    practiceCompleted: data.progress.completedPractice.length,
    topicProgress: data.topicProgress.map((item) => ({
      name: item.topicId,
      progress: item.completed ? 100 : 0,
    })),
    weeklyActivity: data.user.completedDates,
    achievements: data.progress.achievements,
    currentStreak: data.user.streak,
    longestStreak: data.user.longestStreak || data.user.streak,
    currentXP: data.user.xp,
    xpToNextLevel: 500 - (data.user.xp % 500),
    activityLogs: data.activityLogs,
  };
};

export const updateOverallProgress = () => getProgressData();
export const updateTopicProgress = (topicId, progress) =>
  updateProgress((data) => {
    const completedAt = new Date().toISOString();
    const existing = data.topicProgress.find((item) => item.topicId === topicId);
    if (existing) Object.assign(existing, { completed: progress >= 100, completedAt });
    else data.topicProgress.push({ topicId, completed: progress >= 100, completedAt });
    return data;
  });
export const incrementStat = () => getProgressData();
export const updateWeeklyActivity = () => getProgressData();
export const addAchievement = (achievement) =>
  updateProgress((data) => {
    if (!data.progress.achievements.some((item) => item.title === achievement.title)) {
      data.progress.achievements.push(achievement);
    }
    return data;
  });
export const getTopicProgressData = () => getProgressData().topicProgress;

