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
  slug: "04-uses-of-helping-verbs",
  title: "Uses of Helping Verbs",
  shortDescription: "Use helping verbs for questions, negatives, tenses, and possibility.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiCheckSquare",
  content,
};
