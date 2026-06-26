/**
 * Level Engine
 * Handles level calculation and stage progression
 */

import {
  FaSeedling,
  FaBookOpen,
  FaBullseye,
  FaCrown,
} from "react-icons/fa";

export const LEVEL_STAGES = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  MASTER: 'Master',
};

export const LEVEL_CONFIG = {
  [LEVEL_STAGES.BEGINNER]: {
    icon: FaSeedling,
    color: 'var(--success-color)',
    description: 'Just starting your grammar journey',
  },
  [LEVEL_STAGES.INTERMEDIATE]: {
    icon: FaBookOpen,
    color: 'var(--primary-color)',
    description: 'Building strong foundations',
  },
  [LEVEL_STAGES.ADVANCED]: {
    icon: FaBullseye,
    color: 'var(--warning-color)',
    description: 'Mastering complex concepts',
  },
  [LEVEL_STAGES.MASTER]: {
    icon: FaCrown,
    color: 'var(--danger-color)',
    description: 'Grammar excellence achieved',
  },
};

/**
 * Level thresholds with progressive scaling
 * Each level requires more XP than the previous
 */
export const LEVEL_THRESHOLDS = [
  { level: 1, minXP: 0, maxXP: 99, stage: LEVEL_STAGES.BEGINNER },
  { level: 2, minXP: 100, maxXP: 249, stage: LEVEL_STAGES.BEGINNER },
  { level: 3, minXP: 250, maxXP: 449, stage: LEVEL_STAGES.BEGINNER },
  { level: 4, minXP: 450, maxXP: 699, stage: LEVEL_STAGES.INTERMEDIATE },
  { level: 5, minXP: 700, maxXP: 999, stage: LEVEL_STAGES.INTERMEDIATE },
  { level: 6, minXP: 1000, maxXP: 1349, stage: LEVEL_STAGES.INTERMEDIATE },
  { level: 7, minXP: 1350, maxXP: 1749, stage: LEVEL_STAGES.ADVANCED },
  { level: 8, minXP: 1750, maxXP: 2199, stage: LEVEL_STAGES.ADVANCED },
  { level: 9, minXP: 2200, maxXP: 2699, stage: LEVEL_STAGES.ADVANCED },
  { level: 10, minXP: 2700, maxXP: 3249, stage: LEVEL_STAGES.MASTER },
  { level: 11, minXP: 3250, maxXP: 3849, stage: LEVEL_STAGES.MASTER },
  { level: 12, minXP: 3850, maxXP: 4499, stage: LEVEL_STAGES.MASTER },
  { level: 13, minXP: 4500, maxXP: 5199, stage: LEVEL_STAGES.MASTER },
  { level: 14, minXP: 5200, maxXP: 5949, stage: LEVEL_STAGES.MASTER },
  { level: 15, minXP: 5950, maxXP: Infinity, stage: LEVEL_STAGES.MASTER },
];

/**
 * Calculate level from total XP
 * @param {number} totalXP - Total XP
 * @returns {object} Level information
 */
export const calculateLevel = (totalXP = 0) => {
  const safeXP = Math.max(0, totalXP);
  
  // Find the appropriate level
  const levelInfo = LEVEL_THRESHOLDS.find(
    (threshold) => safeXP >= threshold.minXP && safeXP <= threshold.maxXP
  ) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];

  return {
    level: levelInfo.level,
    stage: levelInfo.stage,
    minXP: levelInfo.minXP,
    maxXP: levelInfo.maxXP === Infinity ? levelInfo.minXP + 1000 : levelInfo.maxXP,
    config: LEVEL_CONFIG[levelInfo.stage],
  };
};

/**
 * Get level configuration
 * @param {string} stage - Stage name
 * @returns {object} Stage configuration
 */
export const getStageConfig = (stage) => {
  return LEVEL_CONFIG[stage] || LEVEL_CONFIG[LEVEL_STAGES.BEGINNER];
};

/**
 * Get next level information
 * @param {number} totalXP - Total XP
 * @returns {object} Next level info
 */
export const getNextLevelInfo = (totalXP = 0) => {
  const currentLevel = calculateLevel(totalXP);
  const currentIndex = LEVEL_THRESHOLDS.findIndex(
    (t) => t.level === currentLevel.level
  );

  // Check if at max level
  if (currentIndex >= LEVEL_THRESHOLDS.length - 1) {
    return {
      nextLevel: null,
      xpNeeded: 0,
      isMaxLevel: true,
    };
  }

  const nextThreshold = LEVEL_THRESHOLDS[currentIndex + 1];
  const xpNeeded = nextThreshold.minXP - totalXP;

  return {
    nextLevel: nextThreshold.level,
    nextStage: nextThreshold.stage,
    xpNeeded: Math.max(0, xpNeeded),
    isMaxLevel: false,
  };
};

/**
 * Get XP progress within current level
 * @param {number} totalXP - Total XP
 * @returns {object} Progress info
 */
export const getLevelProgress = (totalXP = 0) => {
  const currentLevel = calculateLevel(totalXP);
  const xpInLevel = totalXP - currentLevel.minXP;
  const totalXPInLevel = currentLevel.maxXP - currentLevel.minXP;
  const percentage = Math.min(100, Math.max(0, (xpInLevel / totalXPInLevel) * 100));

  return {
    xpInLevel,
    totalXPInLevel,
    percentage: Math.round(percentage),
  };
};

/**
 * Get all available stages
 * @returns {string[]} Array of stage names
 */
export const getAllStages = () => {
  return Object.values(LEVEL_STAGES);
};

/**
 * Check if user can unlock a stage
 * @param {string} stage - Stage to check
 * @param {number} totalXP - Total XP
 * @returns {boolean} Whether stage is unlocked
 */
export const isStageUnlocked = (stage, totalXP = 0) => {
  const currentLevel = calculateLevel(totalXP);
  const stageOrder = getAllStages();
  const currentStageIndex = stageOrder.indexOf(currentLevel.stage);
  const targetStageIndex = stageOrder.indexOf(stage);

  return targetStageIndex <= currentStageIndex;
};

/**
 * Get stage progression info
 * @param {number} totalXP - Total XP
 * @returns {object} Stage progression
 */
export const getStageProgression = (totalXP = 0) => {
  const currentLevel = calculateLevel(totalXP);
  const stages = getAllStages();

  return stages.map((stage) => ({
    stage,
    unlocked: isStageUnlocked(stage, totalXP),
    current: stage === currentLevel.stage,
    config: getStageConfig(stage),
  }));
};
