/**
 * Progress Storage Service
 * Handles local storage operations for progress data
 * This is the current implementation that will be replaced by API calls
 */

const PROGRESS_STORAGE_KEY = 'grammar_progress_data';

/**
 * Get default progress data structure
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
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  currentLevel: 1,
  currentXP: 0,
  xpToNextLevel: 100,
  totalXP: 0,
  mistakesFixed: 0,
  activityLogs: [],
  monthlyActivity: [],
});

/**
 * Clamp progress value between 0 and 100
 */
const clampProgress = (value) => Math.min(100, Math.max(0, Number(value) || 0));

/**
 * Get progress data from local storage
 */
export const getProgressData = () => {
  try {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!data) {
      return getDefaultProgressData();
    }
    return {
      ...getDefaultProgressData(),
      ...JSON.parse(data),
    };
  } catch (error) {
    console.error('Error reading progress data:', error);
    return getDefaultProgressData();
  }
};

/**
 * Save progress data to local storage
 */
export const saveProgressData = (data) => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
};

/**
 * Clear all progress data (for testing/reset)
 */
export const clearProgressData = () => {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing progress data:', error);
  }
};

export default {
  getProgressData,
  saveProgressData,
  clearProgressData,
};
