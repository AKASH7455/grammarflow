import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";
import translation from "./translation";
import sentenceCorrection from "./sentenceCorrection";
import aiPractice from "./aiPractice";

const typesOfNouns = {
  slug: "types-of-nouns",
  title: "Types Of Nouns",

  content: {
    notes,
    mcq,
    "fill-blanks": fillBlanks,
    translation,
    "sentence-correction": sentenceCorrection,
    "ai-practice": aiPractice,
  },
};

export default typesOfNouns;