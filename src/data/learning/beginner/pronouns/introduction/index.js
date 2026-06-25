import notes from "./notes";
import mcq from "./mcq";
import fillBlanks from "./fillBlanks";

const introduction = {
  slug: "introduction",
  title: "Introduction",

  content: {
    notes,
    mcq,
    "fill-blanks": fillBlanks,
    "ai-practice": [],
  },
};

export default introduction;