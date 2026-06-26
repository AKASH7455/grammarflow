// Re-export from new level engine for backward compatibility
export {
  calculateLevel,
  getStageConfig,
  getStageConfig as getLevelConfig,
  getNextLevelInfo,
  getLevelProgress,
  getAllStages,
  getAllStages as getAllLevels,
  getStageProgression,
  LEVEL_STAGES,
  LEVEL_CONFIG,
  LEVEL_THRESHOLDS,
  isStageUnlocked,
} from "../services/progress/levelEngine";