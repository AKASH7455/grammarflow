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
  slug: "01-introduction-to-adjectives",
  title: "Introduction to Adjectives",
  shortDescription: "Understand what adjectives are and how they describe nouns and pronouns.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiEdit3",
  content,
};
