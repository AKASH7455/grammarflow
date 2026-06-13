import { useState } from "react";
import { useParams } from "react-router-dom";

import learningData from "../data/learning";

import TopicProgress from "../components/topic/TopicProgress";
import TopicTabs from "../components/topic/TopicTabs";
import TopicContent from "../components/topic/TopicContent";

import "../styles/topicdetails.css";

function TopicDetails() {
  const { levelSlug, subjectSlug, topicSlug } = useParams();
  const [activeTab, setActiveTab] =
    useState("notes");

  const level = learningData.find(
    (item) => item.slug === levelSlug
  );

  const subject = level?.subjects.find(
    (item) => item.slug === subjectSlug
  );

  const topic = subject?.topics.find(
    (item) => item.slug === topicSlug
  );

  const currentData = topic?.content[activeTab];
  const availableTabs = topic?.content ? Object.keys(topic.content) : [];

  if (!level || !subject || !topic) {
    return <h2>Topic Not Found</h2>;
  }

  return (
    <main className="topic-details-page">

      <TopicProgress
        progress={35}
        completedLessons={7}
        totalLessons={20}
      />

      <TopicTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableTabs={availableTabs}
      />

      <TopicContent
        activeTab={activeTab}
        data={currentData}
      />

    </main>
  );
}

export default TopicDetails;