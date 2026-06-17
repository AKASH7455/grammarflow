/**
 * useStreak Custom Hook
 * Manages streak state and provides streak-related operations
 */

import { useState, useEffect } from 'react';
import {
  getStreakInfo,
  markTodayCompleted,
  checkAndRecalculateStreak,
} from '../services/streakService';

export const useStreak = () => {
  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize streak data on mount
  useEffect(() => {
    const initializeStreak = () => {
      // Check and recalculate streak on app load
      checkAndRecalculateStreak();
      
      // Get current streak info
      const data = getStreakInfo();
      setStreakData(data);
      setLoading(false);
    };

    initializeStreak();
  }, []);

  // Mark today as completed
  const completeToday = () => {
    const updatedData = markTodayCompleted();
    setStreakData(getStreakInfo());
    return updatedData;
  };

  // Refresh streak data
  const refreshStreak = () => {
    const data = getStreakInfo();
    setStreakData(data);
  };

  return {
    streakData,
    loading,
    completeToday,
    refreshStreak,
    currentStreak: streakData?.currentStreak || 0,
    longestStreak: streakData?.longestStreak || 0,
    weekProgress: streakData?.weekProgress || [],
    completedDays: streakData?.completedDays || 0,
    totalDays: streakData?.totalDays || 7,
  };
};
