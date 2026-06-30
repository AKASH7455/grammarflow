import chapter01 from "./01-introduction-to-determiners";
import chapter02 from "./02-types-of-determiners";
import chapter03 from "./03-quantifiers";
import chapter04 from "./04-demonstratives-and-possessives";
import chapter05 from "./05-common-determiner-mistakes";

const topics = [chapter01, chapter02, chapter03, chapter04, chapter05];

export {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
};

export default {
  slug: "determiners",
  title: "Determiners",
  description: "Learn small words that introduce nouns and make meaning specific.",
  icon: "FiSliders",
  colorTheme: "violet",
  difficulty: "Beginner",
  estimatedTime: "50 min",
  totalTopics: topics.length,
  topics,
};
