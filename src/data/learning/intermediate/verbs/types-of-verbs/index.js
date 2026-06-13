import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";
import translation from "./translation";
import sentenceCorrection from "./sentenceCorrection";
import aiPractice from "./aiPractice";

const typesOfVerbs = {
  slug: "types-of-verbs",
  title: "Types Of Verbs",

  content: {
    notes,
    mcq,
    "fill-blanks": fillBlanks,
    translation,
    "sentence-correction": sentenceCorrection,
    "ai-practice": aiPractice,
  },
};

export default typesOfVerbs;
