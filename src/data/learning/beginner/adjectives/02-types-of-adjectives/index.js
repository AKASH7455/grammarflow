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
  slug: "02-types-of-adjectives",
  title: "Types of Adjectives",
  shortDescription: "Learn common adjective types such as quality, quantity, number, demonstrative, and possessive adjectives.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiLayers",
  content,
};
