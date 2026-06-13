import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";
import translation from "./translation";
import sentenceCorrection from "./sentenceCorrection";
import aiPractice from "./aiPractice";

const typesOfTenses = {
  slug: "types-of-tenses",
  title: "Types Of Tenses",

  content: {
    notes,
    mcq,
    "fill-blanks": fillBlanks,
    translation,
    "sentence-correction": sentenceCorrection,
    "ai-practice": aiPractice,
  },
};

export default typesOfTenses;
