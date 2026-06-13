import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";
import aiPractice from "./aiPractice";

const introduction = {
  slug: "introduction",
  title: "Introduction",

  content: {
    notes,
    mcq,
    "fill-blanks": fillBlanks,
    "ai-practice": aiPractice,
  },
};

export default introduction;
