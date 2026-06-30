import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";
import translation from "./translation";
import sentenceCorrection from "./sentenceCorrection";
import aiPractice from "./aiPractice";

const content = {
  notes,
  mcq,
  fillBlanks,
  translation,
  sentenceCorrection,
  aiPractice,
  "fill-blanks": fillBlanks,
  "sentence-correction": sentenceCorrection,
  "ai-practice": aiPractice,
};

export {
  notes,
  mcq,
  fillBlanks,
  translation,
  sentenceCorrection,
  aiPractice,
  content,
};

export default {
  slug: "04-comparison-of-adverbs",
  title: "Comparison of Adverbs",
  shortDescription: "Learn how to compare actions using adverbs like faster, more carefully, and best.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiTrendingUp",
  content,
};
