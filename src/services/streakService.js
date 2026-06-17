/**
 * Streak Service Layer
 * Handles all streak data operations with Local Storage
 * Designed to be easily replaceable with API calls in the future
 */

import {
  getTodayDate,
  calculateStreak,
  getCurrentWeekDates,
  isToday,
} from '../utils/streakUtils';

const STORAGE_KEY = 'grammarflow_streak_data';

/**
 * Get streak data from Local Storage
 * @returns {Object} Streak data object
 */
export const getStreakData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getInitialStreakData();
  } catch (error) {
    console.error('Error reading streak data:', error);
    return getInitialStreakData();
  }
};

/**
 * Save streak data to Local Storage
 * @param {Object} data - Streak data object
 */
export const saveStreakData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving streak data:', error);
  }
};

/**
 * Get initial streak data structure
 * @returns {Object} Initial streak data
 */
export const getInitialStreakData = () => ({
  currentStreak: 0,
  longestStreak: 0,
  completedDates: [],
  lastStudyDate: null,
});

/**
 * Mark today as completed
 * @returns {Object} Updated streak data
 */
export const markTodayCompleted = () => {
  const data = getStreakData();
  const today = getTodayDate();
  
  // If today is already marked, return existing data
  if (data.completedDates.includes(today)) {
    return data;
  }
  
  // Add today to completed dates
  data.completedDates.push(today);
  data.lastStudyDate = today;
  
  // Recalculate streak
  data.currentStreak = calculateStreak(data.completedDates);
  
  // Update longest streak if needed
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }
  
  saveStreakData(data);
  return data;
};

/**
 * Get current streak count
 * @returns {number} Current streak
 */
export const getCurrentStreak = () => {
  const data = getStreakData();
  return calculateStreak(data.completedDates);
};

/**
 * Get current week progress
 * @returns {Object} Week progress data
 */
export const getWeekProgress = () => {
  const data = getStreakData();
  const weekDates = getCurrentWeekDates();
  const today = getTodayDate();
  
  const weekProgress = weekDates.map(date => ({
    date,
    dayName: getDayName(date),
    isCompleted: data.completedDates.includes(date),
    isToday: isToday(date),
  }));
  
  return {
    weekProgress,
    completedDays: weekProgress.filter(day => day.isCompleted).length,
    totalDays: 7,
  };
};

/**
 * Reset streak (for testing or manual reset)
 */
export const resetStreak = () => {
  const initialData = getInitialStreakData();
  saveStreakData(initialData);
  return initialData;
};

/**
 * Get complete streak information
 * @returns {Object} Complete streak info
 */
export const getStreakInfo = () => {
  const data = getStreakData();
  const weekProgress = getWeekProgress();
  
  return {
    currentStreak: calculateStreak(data.completedDates),
    longestStreak: data.longestStreak,
    lastStudyDate: data.lastStudyDate,
    ...weekProgress,
  };
};

/**
 * Check if streak needs to be recalculated (called on app load)
 * This handles cases where the app wasn't opened for multiple days
 */
export const checkAndRecalculateStreak = () => {
  const data = getStreakData();
  const today = getTodayDate();
  const yesterday = getDateDaysAgo(1);
  
  // If neither today nor yesterday is completed, streak is broken
  if (!data.completedDates.includes(today) && !data.completedDates.includes(yesterday)) {
    data.currentStreak = 0;
    saveStreakData(data);
  } else {
    // Recalculate streak to ensure accuracy
    data.currentStreak = calculateStreak(data.completedDates);
    saveStreakData(data);
  }
  
  return data;
};

// Helper function for getWeekProgress
const getDayName = (dateString) => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

// Helper function for checkAndRecalculateStreak
const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
