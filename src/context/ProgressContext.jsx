import { useState } from "react";
import * as progressService from "../services/grammarFlowStorage";
import { ProgressContext } from "./AppContexts";

export function ProgressProvider({ children }) {
  const [data, setData] = useState(progressService.getProgress);

  const run = (operation) => {
    const next = operation();
    setData(next);
    return next;
  };

  const value = {
    data,
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
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

