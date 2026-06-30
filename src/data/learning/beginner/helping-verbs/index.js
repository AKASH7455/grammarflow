import chapter01 from "./01-introduction-to-helping-verbs";
import chapter02 from "./02-primary-helping-verbs";
import chapter03 from "./03-modal-helping-verbs";
import chapter04 from "./04-uses-of-helping-verbs";
import chapter05 from "./05-common-helping-verb-mistakes";

const topics = [chapter01, chapter02, chapter03, chapter04, chapter05];

export {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
};

export default {
  slug: "helping-verbs",
  title: "Helping Verbs",
  description: "Learn how helping verbs support main verbs to form tense, questions, negatives, and meaning.",
  icon: "FiTool",
  colorTheme: "rose",
  difficulty: "Beginner",
  estimatedTime: "50 min",
  totalTopics: topics.length,
  topics,
};
