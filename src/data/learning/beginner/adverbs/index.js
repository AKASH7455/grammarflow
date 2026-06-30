import chapter01 from "./01-introduction-to-adverbs";
import chapter02 from "./02-types-of-adverbs";
import chapter03 from "./03-position-of-adverbs";
import chapter04 from "./04-comparison-of-adverbs";
import chapter05 from "./05-common-adverb-mistakes";

const topics = [chapter01, chapter02, chapter03, chapter04, chapter05];

export {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
};

export default {
  slug: "adverbs",
  title: "Adverbs",
  description: "Learn how adverbs describe actions, adjectives, and other adverbs.",
  icon: "FiZap",
  colorTheme: "blue",
  difficulty: "Beginner",
  estimatedTime: "50 min",
  totalTopics: topics.length,
  topics,
};
