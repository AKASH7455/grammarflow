import {
  FaSeedling,
  FaBookOpen,
  FaBullseye,
  FaCrown,
} from "react-icons/fa";

export const LEVELS = [
  {
    name: "Beginner",
    min: 0,
    max: 25,
    nextThreshold: 26,
    icon: FaSeedling,
    color: "var(--success-color)",
    range: "0% - 25%",
  },
  {
    name: "Intermediate",
    min: 26,
    max: 50,
    nextThreshold: 51,
    icon: FaBookOpen,
    color: "var(--primary-color)",
    range: "26% - 50%",
  },
  {
    name: "Advanced",
    min: 51,
    max: 75,
    nextThreshold: 76,
    icon: FaBullseye,
    color: "var(--warning-color)",
    range: "51% - 75%",
  },
  {
    name: "Master",
    min: 76,
    max: 100,
    nextThreshold: null,
    icon: FaCrown,
    color: "var(--danger-color)",
    range: "76% - 100%",
  },
];

export const calculateLevel = (progress = 0) => {
  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  return (
    LEVELS.find(
      (level) =>
        safeProgress >= level.min &&
        safeProgress <= level.max
    )?.name || "Beginner"
  );
};

export const getLevelConfig = (level) => {
  return (
    LEVELS.find(
      (item) => item.name === level
    ) || LEVELS[0]
  );
};

export const getNextLevelInfo = (progress = 0) => {
  const currentLevel =
    calculateLevel(progress);

  const currentIndex =
    LEVELS.findIndex(
      (level) =>
        level.name === currentLevel
    );

  if (
    currentIndex ===
    LEVELS.length - 1
  ) {
    return {
      nextLevel: null,
      progressNeeded: 0,
      isMaxLevel: true,
    };
  }

  const nextLevel =
    LEVELS[currentIndex + 1];

  return {
    nextLevel: nextLevel.name,
    progressNeeded: Math.max(
      0,
      nextLevel.min - progress
    ),
    isMaxLevel: false,
  };
};

export const getAllLevels = () =>
  LEVELS.map(
    (level) => level.name
  );