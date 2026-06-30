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
  slug: "05-common-helping-verb-mistakes",
  title: "Common Helping Verb Mistakes",
  shortDescription: "Avoid common errors with do, be, have, and modal verbs.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiAlertCircle",
  content,
};
