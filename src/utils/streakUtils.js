/**
 * Streak Utility Functions
 * Pure functions for streak calculations and date manipulations
 */

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date string
 */
export const getTodayDate = () => {
  const today = new Date();
  return formatDate(today);
};

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get date string for n days ago
 * @param {number} daysAgo - Number of days ago
 * @returns {string} Date string
 */
export const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};

/**
 * Get the start of the current week (Monday)
 * @returns {Date} Monday of current week
 */
export const getWeekStart = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

/**
 * Get current week's dates (Mon-Sun)
 * @returns {Array} Array of date strings for current week
 */
export const getCurrentWeekDates = () => {
  const weekStart = getWeekStart();
  const weekDates = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    weekDates.push(formatDate(date));
  }
  
  return weekDates;
};

/**
 * Calculate streak from completed dates
 * @param {Array} completedDates - Array of completed date strings
 * @returns {number} Current streak count
 */
export const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) return 0;
  
  const sortedDates = [...completedDates].sort().reverse();
  const today = getTodayDate();
  const yesterday = getDateDaysAgo(1);
  
  // Check if today or yesterday is in the list
  const hasToday = sortedDates.includes(today);
  const hasYesterday = sortedDates.includes(yesterday);
  
  // If neither today nor yesterday is completed, streak is broken
  if (!hasToday && !hasYesterday) return 0;
  
  // Start counting from the most recent date
  let streak = 0;
  let currentDate = hasToday ? new Date() : new Date();
  currentDate.setDate(currentDate.getDate() - (hasToday ? 0 : 1));
  
  for (let i = 0; i < sortedDates.length; i++) {
    const dateStr = formatDate(currentDate);
    if (sortedDates.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Check if a date is today
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean} True if date is today
 */
export const isToday = (dateString) => {
  return dateString === getTodayDate();
};

/**
 * Get day name from date string
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Day name (e.g., "Mon", "Tue")
 */
export const getDayName = (dateString) => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

/**
 * Check if two dates are consecutive
 * @param {string} date1 - First date string
 * @param {string} date2 - Second date string
 * @returns {boolean} True if dates are consecutive
 */
export const areDatesConsecutive = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};
