import chapter01 from "./01-introduction-to-articles";
import chapter02 from "./02-definite-and-indefinite-articles";
import chapter03 from "./03-uses-of-a-and-an";
import chapter04 from "./04-uses-of-the";
import chapter05 from "./05-common-article-mistakes";

const topics = [chapter01, chapter02, chapter03, chapter04, chapter05];

export {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
};

export default {
  slug: "articles",
  title: "Articles",
  description: "Build confidence with a, an, and the in everyday sentences.",
  icon: "FiBookOpen",
  colorTheme: "amber",
  difficulty: "Beginner",
  estimatedTime: "50 min",
  totalTopics: topics.length,
  topics,
};
