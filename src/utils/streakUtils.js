/**
 * Streak Utility Functions
 * Pure functions for streak calculations and date manipulations
 */

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Get today's date
 * @returns {string}
 */
export const getTodayDate = () => {
  return formatDate(new Date());
};

/**
 * Get date n days ago
 * @param {number} daysAgo
 * @returns {string}
 */
export const getDateDaysAgo = (
  daysAgo
) => {
  const date = new Date();

  date.setDate(
    date.getDate() - daysAgo
  );

  return formatDate(date);
};

/**
 * Get Monday of current week
 * @returns {Date}
 */
export const getWeekStart = () => {
  const today = new Date();

  const day = today.getDay();

  const diff =
    today.getDate() -
    day +
    (day === 0 ? -6 : 1);

  const monday = new Date(today);

  monday.setDate(diff);

  monday.setHours(
    0,
    0,
    0,
    0
  );

  return monday;
};

/**
 * Get current week dates
 * @returns {string[]}
 */
export const getCurrentWeekDates =
  () => {
    const weekStart =
      getWeekStart();

    const weekDates = [];

    for (
      let i = 0;
      i < 7;
      i++
    ) {
      const date =
        new Date(weekStart);

      date.setDate(
        date.getDate() + i
      );

      weekDates.push(
        formatDate(date)
      );
    }

    return weekDates;
  };

/**
 * Calculate current streak
 * @param {string[]} completedDates
 * @returns {number}
 */
export const calculateStreak = (
  completedDates
) => {
  if (
    !completedDates ||
    completedDates.length === 0
  ) {
    return 0;
  }

  const dateSet = new Set(
    completedDates
  );

  const today =
    getTodayDate();

  const yesterday =
    getDateDaysAgo(1);

  const hasToday =
    dateSet.has(today);

  const hasYesterday =
    dateSet.has(yesterday);

  if (
    !hasToday &&
    !hasYesterday
  ) {
    return 0;
  }

  let streak = 0;

  const currentDate =
    new Date();

  if (!hasToday) {
    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  while (true) {
    const dateStr =
      formatDate(currentDate);

    if (
      dateSet.has(dateStr)
    ) {
      streak++;

      currentDate.setDate(
        currentDate.getDate() - 1
      );
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Check if date is today
 * @param {string} dateString
 * @returns {boolean}
 */
export const isToday = (
  dateString
) => {
  return (
    dateString ===
    getTodayDate()
  );
};

/**
 * Get short day name
 * @param {string} dateString
 * @returns {string}
 */
export const getDayName = (
  dateString
) => {
  return new Date(
    dateString
  ).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    }
  );
};

/**
 * Get current day index
 * Monday = 0
 * Sunday = 6
 *
 * @returns {number}
 */
export const getCurrentDayIndex =
  () => {
    const day =
      new Date().getDay();

    return day === 0
      ? 6
      : day - 1;
  };

/**
 * Check if dates are consecutive
 * @param {string} date1
 * @param {string} date2
 * @returns {boolean}
 */
export const areDatesConsecutive = (
  date1,
  date2
) => {
  const d1 =
    new Date(date1);

  const d2 =
    new Date(date2);

  d1.setHours(
    0,
    0,
    0,
    0
  );

  d2.setHours(
    0,
    0,
    0,
    0
  );

  const diffDays =
    (d2 - d1) /
    (1000 *
      60 *
      60 *
      24);

  return diffDays === 1;
};