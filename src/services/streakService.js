import { getProgress, updateProgress } from "./grammarFlowStorage";

const today = () => new Date().toISOString().slice(0, 10);

const streakShape = (data) => ({
  currentStreak: data.user.streak || 0,
  longestStreak: data.user.longestStreak || data.user.streak || 0,
  completedDates: data.user.completedDates || [],
  lastCompletedDate: data.user.lastActivity?.slice(0, 10) || null,
});

export const getStreakInfo = () => streakShape(getProgress());

export const checkAndRecalculateStreak = () => getStreakInfo();

export const markTodayCompleted = () => {
  const updated = updateProgress((data) => {
    data.user.completedDates = [...new Set([...(data.user.completedDates || []), today()])];
    data.user.streak = data.user.completedDates.length;
    data.user.longestStreak = Math.max(data.user.longestStreak || 0, data.user.streak);
    data.user.lastActivity = new Date().toISOString();
    return data;
  });
  return streakShape(updated);
};

export const resetStreak = () => {
  const updated = updateProgress((data) => {
    data.user.streak = 0;
    data.user.longestStreak = 0;
    data.user.completedDates = [];
    data.user.lastActivity = null;
    return data;
  });
  return streakShape(updated);
};

