/**
 * Progress API Service Layer
 * Backend-ready architecture for future migration to Express API + MongoDB
 * 
 * Current: Local Storage
 * Future: API Layer → Express API → MongoDB
 * 
 * Collections (future):
 * - users
 * - user_progress
 * - user_streaks
 * - user_achievements
 * - user_activity_logs
 * - user_levels
 * - user_quiz_progress
 */

import { getProgressData, saveProgressData } from './progressStorageService';

/**
 * Progress API Service
 * All data operations go through this layer
 * Easy to swap storage implementation later
 */
class ProgressApiService {
  /**
   * Get user progress data
   * @returns {Promise<Object>} Progress data
   */
  async getUserProgress() {
    // Future: const response = await fetch('/api/progress/user');
    // Future: return response.json();
    return getProgressData();
  }

  /**
   * Get user streaks
   * @returns {Promise<Object>} Streak data
   */
  async getUserStreaks() {
    // Future: const response = await fetch('/api/streaks/user');
    // Future: return response.json();
    const data = getProgressData();
    return {
      currentStreak: data.currentStreak || 0,
      longestStreak: data.longestStreak || 0,
      lastActiveDate: data.lastActiveDate || null,
    };
  }

  /**
   * Get user achievements
   * @returns {Promise<Array>} Achievements array
   */
  async getUserAchievements() {
    // Future: const response = await fetch('/api/achievements/user');
    // Future: return response.json();
    const data = getProgressData();
    return data.achievements || [];
  }

  /**
   * Get user activity logs
   * @param {number} limit - Number of recent activities
   * @returns {Promise<Array>} Activity logs
   */
  async getActivityLogs(limit = 50) {
    // Future: const response = await fetch(`/api/activity/user?limit=${limit}`);
    // Future: return response.json();
    const data = getProgressData();
    return (data.activityLogs || []).slice(0, limit);
  }

  /**
   * Get user level information
   * @returns {Promise<Object>} Level data
   */
  async getUserLevel() {
    // Future: const response = await fetch('/api/levels/user');
    // Future: return response.json();
    const data = getProgressData();
    return {
      currentLevel: data.currentLevel || 1,
      currentXP: data.currentXP || 0,
      xpToNextLevel: data.xpToNextLevel || 100,
      totalXP: data.totalXP || 0,
    };
  }

  /**
   * Get monthly activity heatmap data
   * @param {number} year - Year
   * @param {number} month - Month
   * @returns {Promise<Array>} Daily activity data
   */
  async getMonthlyActivity(year, month) {
    // Future: const response = await fetch(`/api/activity/monthly?year=${year}&month=${month}`);
    // Future: return response.json();
    const data = getProgressData();
    return data.monthlyActivity || [];
  }

  /**
   * Update user progress
   * @param {Object} progressData - Progress data to update
   * @returns {Promise<Object>} Updated progress
   */
  async updateProgress(progressData) {
    // Future: const response = await fetch('/api/progress/user', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(progressData)
    // });
    // Future: return response.json();
    const currentData = getProgressData();
    const updatedData = { ...currentData, ...progressData };
    saveProgressData(updatedData);
    return updatedData;
  }

  /**
   * Add activity log
   * @param {Object} activity - Activity to log
   * @returns {Promise<Object>} Updated data
   */
  async addActivityLog(activity) {
    // Future: const response = await fetch('/api/activity/log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(activity)
    // });
    // Future: return response.json();
    const data = getProgressData();
    const activityLogs = data.activityLogs || [];
    activityLogs.unshift({
      ...activity,
      timestamp: new Date().toISOString(),
    });
    data.activityLogs = activityLogs.slice(0, 1000); // Keep last 1000
    saveProgressData(data);
    return data;
  }

  /**
   * Unlock achievement
   * @param {string} achievementId - Achievement ID
   * @returns {Promise<Object>} Updated data
   */
  async unlockAchievement(achievementId) {
    // Future: const response = await fetch('/api/achievements/unlock', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ achievementId })
    // });
    // Future: return response.json();
    const data = getProgressData();
    const achievements = data.achievements || [];
    if (!achievements.includes(achievementId)) {
      achievements.push(achievementId);
      data.achievements = achievements;
      saveProgressData(data);
    }
    return data;
  }

  /**
   * Update streak
   * @param {Object} streakData - Streak data
   * @returns {Promise<Object>} Updated data
   */
  async updateStreak(streakData) {
    // Future: const response = await fetch('/api/streaks/user', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(streakData)
    // });
    // Future: return response.json();
    const data = getProgressData();
    data.currentStreak = streakData.currentStreak || data.currentStreak || 0;
    data.longestStreak = streakData.longestStreak || data.longestStreak || 0;
    data.lastActiveDate = streakData.lastActiveDate || data.lastActiveDate;
    saveProgressData(data);
    return data;
  }

  /**
   * Get learning stats
   * @returns {Promise<Object>} Learning statistics
   */
  async getLearningStats() {
    // Future: const response = await fetch('/api/stats/learning');
    // Future: return response.json();
    const data = getProgressData();
    return {
      topicsCompleted: data.topicsCompleted || 0,
      quizzesCompleted: data.mcqSolved || 0,
      practiceSessions: data.practiceCompleted || 0,
      totalXP: data.totalXP || 0,
      mistakesFixed: data.mistakesFixed || 0,
      notesRead: data.notesRead || 0,
    };
  }
}

// Export singleton instance
export const progressApiService = new ProgressApiService();
export default progressApiService;
