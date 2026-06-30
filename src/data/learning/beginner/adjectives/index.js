import chapter01 from "./01-introduction-to-adjectives";
import chapter02 from "./02-types-of-adjectives";
import chapter03 from "./03-degrees-of-comparison";
import chapter04 from "./04-position-of-adjectives";
import chapter05 from "./05-common-adjective-mistakes";

const topics = [chapter01, chapter02, chapter03, chapter04, chapter05];

export {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
};

export default {
  slug: "adjectives",
  title: "Adjectives",
  description: "Learn how describing words add detail to nouns and make sentences clearer.",
  icon: "FiEdit3",
  colorTheme: "teal",
  difficulty: "Beginner",
  estimatedTime: "50 min",
  totalTopics: topics.length,
  topics,
};
