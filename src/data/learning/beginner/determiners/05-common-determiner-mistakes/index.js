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
  slug: "05-common-determiner-mistakes",
  title: "Common Determiner Mistakes",
  shortDescription: "Avoid determiner errors with countable, uncountable, singular, and plural nouns.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiAlertCircle",
  content,
};
