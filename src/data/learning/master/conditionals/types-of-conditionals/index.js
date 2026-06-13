import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";
import translation from "./translation";
import sentenceCorrection from "./sentenceCorrection";
import aiPractice from "./aiPractice";

const typesOfConditionals = {
  slug: "types-of-conditionals",
  title: "Types Of Conditionals",

  content: {
    notes,
    mcq,
    "fill-blanks": fillBlanks,
    translation,
    "sentence-correction": sentenceCorrection,
    "ai-practice": aiPractice,
  },
};

export default typesOfConditionals;
