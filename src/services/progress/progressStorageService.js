import { getProgress, saveProgress, resetProgress } from "../grammarFlowStorage";

export const getProgressData = getProgress;
export const saveProgressData = saveProgress;
export const clearProgressData = resetProgress;

export default { getProgressData, saveProgressData, clearProgressData };

