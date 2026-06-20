/**
 * Streak Service
 * Manages learning streak data and calculations
 */

const STORAGE_KEY = "grammar_streak_data";

/**
 * Default streak object
 */
const defaultData = {
  currentStreak: 0,
  longestStreak: 0,
  completedDates: [],
  lastCompletedDate: null,
};

/**
 * Get today's date string
 */
const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Save streak information
 */
const saveStreakInfo = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving streak data:", error);
  }
};

/**
 * Get streak information
 */
export const getStreakInfo = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return { ...defaultData };
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading streak data:", error);
    return { ...defaultData };
  }
};

/**
 * Check if date is today
 */
const isToday = (date) => {
  return date === getTodayString();
};

/**
 * Check if date is yesterday
 */
const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    new Date(date).toDateString() === yesterday.toDateString()
  );
};

/**
 * Calculate streak from completed dates
 */
const calculateStreak = (completedDates) => {
  if (!completedDates?.length) {
    return 0;
  }

  const sortedDates = [...completedDates].sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const latestDate = sortedDates[0];

  if (!isToday(latestDate) && !isYesterday(latestDate)) {
    return 0;
  }

  let streak = 1;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i]);
    const next = new Date(sortedDates[i + 1]);

    const diffDays = Math.round(
      (current - next) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Recalculate streak
 */
export const checkAndRecalculateStreak = () => {
  const data = getStreakInfo();

  data.currentStreak = calculateStreak(
    data.completedDates
  );

  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

  saveStreakInfo(data);

  return data;
};

/**
 * Mark today as completed
 */
export const markTodayCompleted = () => {
  const data = getStreakInfo();

  const today = getTodayString();

  // Already completed today
  if (data.completedDates.includes(today)) {
    return checkAndRecalculateStreak();
  }

  data.completedDates.push(today);

  data.lastCompletedDate = today;

  data.currentStreak = calculateStreak(
    data.completedDates
  );

  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

  saveStreakInfo(data);

  return data;
};

/**
 * Reset streak data
 */
export const resetStreak = () => {
  saveStreakInfo(defaultData);

  return { ...defaultData };
};