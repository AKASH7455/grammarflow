import { useState, useCallback } from "react";
import * as progressService from "../services/grammarFlowStorage";
import { checkAchievements, getAchievementSummary } from "../services/progress/achievementEngine";
import { calculateLevel, getNextLevelInfo, getLevelProgress } from "../services/progress/levelEngine";
import { ProgressContext } from "./AppContexts";

export function ProgressProvider({ children }) {
  const [data, setData] = useState(progressService.getProgress);

  const refreshData = useCallback(() => {
    setData(progressService.getProgress());
  }, []);

  const run = (operation) => {
    const next = operation();
    setData(next);
    return next;
  };

  // Get achievements with unlock status
  const getAchievements = useCallback(() => {
    return checkAchievements(data);
  }, [data]);

  // Get achievement summary
  const getAchievementsSummary = useCallback(() => {
    return getAchievementSummary(data);
  }, [data]);

  // Get level information
  const getLevelInfo = useCallback(() => {
    const totalXP = data.user.xp || 0;
    return {
      ...calculateLevel(totalXP),
      ...getNextLevelInfo(totalXP),
      ...getLevelProgress(totalXP),
    };
  }, [data]);

  const value = {
    data,
    refreshData,
    saveQuizResult: (result) =>
      run(() => progressService.saveQuizResult(result)),
    saveTopicProgress: (result) =>
      run(() => progressService.saveTopicResult(result)),
    saveFillBlankResult: (result) =>
      run(() => progressService.saveFillBlankResult(result)),
    saveTranslationResult: (result) =>
      run(() => progressService.saveTranslationResult(result)),
    saveSentenceCorrectionResult: (result) =>
      run(() => progressService.saveSentenceCorrectionResult(result)),
    saveVerbResult: (result) =>
      run(() => progressService.saveVerbResult(result)),
    resetProgress: () => run(progressService.resetProgress),
    getAchievements,
    getAchievementsSummary,
    getLevelInfo,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

