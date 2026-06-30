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
  slug: "03-modal-helping-verbs",
  title: "Modal Helping Verbs",
  shortDescription: "Practice can, could, may, might, must, should, will, and would.",
  estimatedTime: "10 min",
  difficulty: "Beginner",
  icon: "FiMessageCircle",
  content,
};
