/**
 * Experience Engine
 * Handles all XP calculation and awarding logic
 */

export const XP_VALUES = {
  NOTE: 10,
  QUIZ: 25,
  PERFECT_QUIZ_BONUS: 15,
  FILL_BLANK: 20,
  TRANSLATION: 20,
  SENTENCE_CORRECTION: 25,
  VERB_FORMS: 20,
  AI_PRACTICE: 30,
  DAILY_STREAK: 5,
};

export const ACTIVITY_TYPES = {
  NOTE: 'note',
  QUIZ: 'quiz',
  PERFECT_QUIZ: 'perfect_quiz',
  FILL_BLANK: 'fill_blank',
  TRANSLATION: 'translation',
  SENTENCE_CORRECTION: 'sentence_correction',
  VERB_FORMS: 'verb_forms',
  AI_PRACTICE: 'ai_practice',
  DAILY_STREAK: 'daily_streak',
};

/**
 * Calculate XP for an activity type
 * @param {string} activityType - Type of activity
 * @param {object} metadata - Additional metadata (e.g., quiz score)
 * @returns {number} XP to award
 */
export const calculateXP = (activityType, metadata = {}) => {
  let xp = 0;

  switch (activityType) {
    case ACTIVITY_TYPES.NOTE:
      xp = XP_VALUES.NOTE;
      break;
    
    case ACTIVITY_TYPES.QUIZ:
      xp = XP_VALUES.QUIZ;
      // Add perfect quiz bonus if score is 100%
      if (metadata.score === 100 || metadata.percentage === 100) {
        xp += XP_VALUES.PERFECT_QUIZ_BONUS;
      }
      break;
    
    case ACTIVITY_TYPES.FILL_BLANK:
      xp = XP_VALUES.FILL_BLANK;
      break;
    
    case ACTIVITY_TYPES.TRANSLATION:
      xp = XP_VALUES.TRANSLATION;
      break;
    
    case ACTIVITY_TYPES.SENTENCE_CORRECTION:
      xp = XP_VALUES.SENTENCE_CORRECTION;
      break;
    
    case ACTIVITY_TYPES.VERB_FORMS:
      xp = XP_VALUES.VERB_FORMS;
      break;
    
    case ACTIVITY_TYPES.AI_PRACTICE:
      xp = XP_VALUES.AI_PRACTICE;
      break;
    
    case ACTIVITY_TYPES.DAILY_STREAK:
      xp = XP_VALUES.DAILY_STREAK;
      break;
    
    default:
      console.warn(`Unknown activity type: ${activityType}`);
      xp = 0;
  }

  return xp;
};

/**
 * Get XP required for next level
 * @param {number} currentLevel - Current level
 * @returns {number} XP required for next level
 */
export const getXPForNextLevel = (currentLevel) => {
  // Progressive scaling: each level requires more XP
  // Formula: base * level^1.5
  const base = 100;
  return Math.floor(base * Math.pow(currentLevel, 1.5));
};

/**
 * Get total XP required for a specific level
 * @param {number} level - Target level
 * @returns {number} Total XP required
 */
export const getTotalXPForLevel = (level) => {
  let totalXP = 0;
  for (let i = 1; i < level; i++) {
    totalXP += getXPForNextLevel(i);
  }
  return totalXP;
};

/**
 * Calculate level from total XP
 * @param {number} totalXP - Total XP
 * @returns {object} Level info
 */
export const calculateLevelFromXP = (totalXP) => {
  let level = 1;
  let xpForCurrentLevel = 0;
  let xpForNextLevel = getXPForNextLevel(level);

  while (totalXP >= xpForNextLevel) {
    totalXP -= xpForNextLevel;
    level++;
    xpForCurrentLevel = xpForNextLevel;
    xpForNextLevel = getXPForNextLevel(level);
  }

  return {
    level,
    currentLevelXP: totalXP,
    xpForNextLevel,
    xpForCurrentLevel,
  };
};

/**
 * Format XP number for display
 * @param {number} xp - XP value
 * @returns {string} Formatted XP
 */
export const formatXP = (xp) => {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
};
