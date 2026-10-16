import learningData from "../data/learning";

const courseTopics = learningData
  .filter((level) => level.slug === "beginner")
  .flatMap((level) =>
  (level.subjects || []).flatMap((subject) =>
    (subject.topics || []).map((topic) => `${level.slug}/${subject.slug}/${topic.slug}`)
  )
  );
const courseTopicIds = new Set(courseTopics);

export const getCourseProgress = (topicProgress = []) => {
  const completedIds = new Set(
    topicProgress
      .filter((topic) => topic.completed && courseTopicIds.has(topic.topicId))
      .map((topic) => topic.topicId)
  );
  const completed = completedIds.size;
  const total = courseTopicIds.size;

  return {
    completed,
    total,
    percentage: total ? Math.round((completed / total) * 100) : 0,
  };
};
