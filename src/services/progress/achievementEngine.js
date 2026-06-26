/**
 * Achievement Engine
 * Handles achievement checking, unlocking, and tracking
 */

import { ACHIEVEMENTS, RARITY_CONFIG } from "../../utils/achievementDefinitions";

/**
 * Calculate user statistics for achievement checking
 * @param {object} progressData - User progress data
 * @returns {object} User statistics
 */
export const calculateUserStats = (progressData) => {
  const { user, progress, quizResults, topicProgress, fillBlankProgress, translationProgress, sentenceCorrectionProgress, verbProgress, activityLogs } = progressData;

  // Count completed items
  const notesRead = topicProgress.filter((t) => t.completed).length;
  const quizzesCompleted = quizResults.length;
  const perfectQuizzes = quizResults.filter((q) => {
    const score = q.correctAnswers || q.score || 0;
    const total = q.totalQuestions || 10;
    return (score / total) * 100 === 100;
  }).length;
  
  const fillBlankCompleted = fillBlankProgress.filter((f) => f.completed).length;
  const translationCompleted = translationProgress.filter((t) => t.completed).length;
  const sentenceCorrectionCompleted = sentenceCorrectionProgress.filter((s) => s.completed).length;
  const verbFormsCompleted = verbProgress.filter((v) => v.completed).length;
  const practiceCompleted = fillBlankCompleted + translationCompleted + sentenceCorrectionCompleted + verbFormsCompleted;

  // Calculate quiz streak (consecutive perfect quizzes)
  let quizStreak = 0;
  let currentStreak = 0;
  const sortedQuizzes = [...quizResults].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  for (const quiz of sortedQuizzes) {
    const score = quiz.correctAnswers || quiz.score || 0;
    const total = quiz.totalQuestions || 10;
    if ((score / total) * 100 === 100) {
      currentStreak++;
    } else {
      break;
    }
  }
  quizStreak = currentStreak;

  // Calculate fastest quiz time (if available)
  const fastestQuizTime = quizResults
    .filter((q) => q.timeTaken)
    .reduce((min, q) => Math.min(min, q.timeTaken), Infinity);

  // Calculate topic completion by stage
  const beginnerTopicsCompleted = topicProgress.filter((t) => t.completed && t.topicId?.includes('beginner')).length;
  const intermediateTopicsCompleted = topicProgress.filter((t) => t.completed && t.topicId?.includes('intermediate')).length;
  const advancedTopicsCompleted = topicProgress.filter((t) => t.completed && t.topicId?.includes('advanced')).length;
  const masterTopicsCompleted = topicProgress.filter((t) => t.completed && t.topicId?.includes('master')).length;

  // Total topics (estimated - in real app, this would come from curriculum data)
  const totalBeginnerTopics = 30; // Adjust based on actual curriculum
  const totalIntermediateTopics = 25;
  const totalAdvancedTopics = 20;
  const totalMasterTopics = 15;

  // Overall completion percentage
  const totalTopics = totalBeginnerTopics + totalIntermediateTopics + totalAdvancedTopics + totalMasterTopics;
  const completedTopics = beginnerTopicsCompleted + intermediateTopicsCompleted + advancedTopicsCompleted + masterTopicsCompleted;
  const overallCompletion = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Calculate level from XP using level engine
  const totalXP = user.xp || 0;

  // Calculate activities today
  const today = new Date().toISOString().slice(0, 10);
  const lessonsToday = activityLogs.filter((log) => log.type === 'topic' && log.timestamp?.startsWith(today)).length;

  // Calculate early/late logins
  const earlyLogins = activityLogs.filter((log) => {
    const hour = new Date(log.timestamp).getHours();
    return hour >= 5 && hour < 8;
  }).length;
  const lateLogins = activityLogs.filter((log) => {
    const hour = new Date(log.timestamp).getHours();
    return hour >= 22 || hour < 2;
  }).length;

  // Total activities
  const totalActivities = activityLogs.length;

  return {
    totalXP,
    level: user.level || 1,
    currentStreak: user.streak || 0,
    longestStreak: user.longestStreak || 0,
    notesRead,
    quizzesCompleted,
    perfectQuizzes,
    quizStreak,
    fastestQuizTime: fastestQuizTime === Infinity ? null : fastestQuizTime,
    practiceCompleted,
    fillBlankCompleted,
    translationCompleted,
    sentenceCorrectionCompleted,
    verbFormsCompleted,
    aiPracticeCompleted: 0, // Track separately if needed
    beginnerTopicsCompleted,
    intermediateTopicsCompleted,
    advancedTopicsCompleted,
    masterTopicsCompleted,
    totalBeginnerTopics,
    totalIntermediateTopics,
    totalAdvancedTopics,
    totalMasterTopics,
    overallCompletion,
    lessonsToday,
    earlyLogins,
    lateLogins,
    totalActivities,
    achievementsUnlocked: progress.achievements?.length || 0,
  };
};

/**
 * Check which achievements are unlocked
 * @param {object} progressData - User progress data
 * @returns {array} Array of achievement objects with unlock status
 */
export const checkAchievements = (progressData) => {
  const stats = calculateUserStats(progressData);
  const unlockedIds = (progressData.progress.achievements || []).map((a) => a.id);

  return ACHIEVEMENTS.map((achievement) => {
    const isUnlocked = unlockedIds.includes(achievement.id);
    const conditionMet = achievement.condition(stats);

    return {
      ...achievement,
      unlocked: isUnlocked,
      conditionMet,
      progress: calculateAchievementProgress(achievement, stats),
    };
  });
};

/**
 * Calculate progress toward an achievement (0-100)
 * @param {object} achievement - Achievement definition
 * @param {object} stats - User statistics
 * @returns {number} Progress percentage
 */
export const calculateAchievementProgress = (achievement, stats) => {
  // Extract the target value from the condition
  const conditionStr = achievement.condition.toString();
  const match = conditionStr.match(/>=\s*(\d+)/);
  
  if (!match) return achievement.condition(stats) ? 100 : 0;
  
  const target = parseInt(match[1], 10);
  
  // Find the relevant stat
  let current = 0;
  if (achievement.id.includes('lesson') || achievement.id.includes('bookworm')) {
    current = stats.notesRead;
  } else if (achievement.id.includes('quiz')) {
    current = stats.quizzesCompleted;
  } else if (achievement.id.includes('practice')) {
    current = stats.practiceCompleted;
  } else if (achievement.id.includes('streak')) {
    current = stats.currentStreak;
  } else if (achievement.id.includes('xp')) {
    current = stats.totalXP;
  } else if (achievement.id.includes('fill_blank')) {
    current = stats.fillBlankCompleted;
  } else if (achievement.id.includes('translation')) {
    current = stats.translationCompleted;
  } else if (achievement.id.includes('sentence')) {
    current = stats.sentenceCorrectionCompleted;
  } else if (achievement.id.includes('verb')) {
    current = stats.verbFormsCompleted;
  } else if (achievement.id.includes('level')) {
    current = stats.level;
  } else if (achievement.id.includes('achievement')) {
    current = stats.achievementsUnlocked;
  }

  return Math.min(100, Math.round((current / target) * 100));
};

/**
 * Get newly unlocked achievements
 * @param {object} progressData - User progress data
 * @returns {array} Newly unlocked achievements
 */
export const getNewlyUnlockedAchievements = (progressData) => {
  const achievements = checkAchievements(progressData);
  return achievements.filter((a) => a.conditionMet && !a.unlocked);
};

/**
 * Unlock an achievement
 * @param {string} achievementId - Achievement ID
 * @param {object} progressData - User progress data
 * @returns {object} Updated progress data
 */
export const unlockAchievement = (achievementId, progressData) => {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  if (!achievement) return progressData;

  // Check if already unlocked
  const alreadyUnlocked = progressData.progress.achievements?.some((a) => a.id === achievementId);
  if (alreadyUnlocked) return progressData;

  // Add achievement to list
  const newAchievement = {
    id: achievement.id,
    title: achievement.title,
    description: achievement.description,
    category: achievement.category,
    xp: achievement.xp,
    rarity: achievement.rarity,
    unlockedAt: new Date().toISOString(),
  };

  return {
    ...progressData,
    progress: {
      ...progressData.progress,
      achievements: [...(progressData.progress.achievements || []), newAchievement],
    },
    user: {
      ...progressData.user,
      xp: (progressData.user.xp || 0) + achievement.xp,
    },
  };
};

/**
 * Get achievement rarity config
 * @param {string} rarity - Rarity name
 * @returns {object} Rarity configuration
 */
export const getRarityConfig = (rarity) => {
  return RARITY_CONFIG[rarity] || RARITY_CONFIG.common;
};

/**
 * Get achievements summary
 * @param {object} progressData - User progress data
 * @returns {object} Achievement summary
 */
export const getAchievementSummary = (progressData) => {
  const achievements = checkAchievements(progressData);
  const total = achievements.length;
  const unlocked = achievements.filter((a) => a.unlocked).length;
  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  // Count by rarity
  const byRarity = {};
  Object.keys(RARITY_CONFIG).forEach((rarity) => {
    byRarity[rarity] = {
      total: achievements.filter((a) => a.rarity === rarity).length,
      unlocked: achievements.filter((a) => a.rarity === rarity && a.unlocked).length,
    };
  });

  // Count by category
  const byCategory = {};
  achievements.forEach((a) => {
    if (!byCategory[a.category]) {
      byCategory[a.category] = { total: 0, unlocked: 0 };
    }
    byCategory[a.category].total++;
    if (a.unlocked) byCategory[a.category].unlocked++;
  });

  return {
    total,
    unlocked,
    percentage,
    byRarity,
    byCategory,
  };
};
