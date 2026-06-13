import { useState } from "react";
import { useParams } from "react-router-dom";

import learningData from "../data/learning";

import TopicProgress from "../components/topic/TopicProgress";
import TopicTabs from "../components/topic/TopicTabs";
import TopicContent from "../components/topic/TopicContent";

import "../styles/topicdetails.css";

function TopicDetails() {
  const {
    levelSlug,
    subjectSlug,
    topicSlug,
  } = useParams();

  const [activeTab, setActiveTab] =
    useState("notes");

  const level = learningData.find(
    (level) =>
      level.slug === levelSlug
  );

  const subject =
    level?.subjects?.find(
      (subject) =>
        subject.slug ===
        subjectSlug
    );

  const topic =
    subject?.topics?.find(
      (topic) =>
        topic.slug === topicSlug
    );

  if (!topic) {
    return (
      <main className="topic-details-page">
        <h2>
          Topic Not Found
        </h2>
      </main>
    );
  }

  const availableTabs =
    Object.keys(
      topic.content || {}
    );

  const currentData =
    topic.content?.[
      activeTab
    ] || [];

  return (
    <main className="topic-details-page">

      <TopicProgress
        progress={35}
        completedLessons={7}
        totalLessons={20}
      />

      <TopicTabs
        activeTab={activeTab}
        setActiveTab={
          setActiveTab
        }
        availableTabs={
          availableTabs
        }
      />

      <TopicContent
        activeTab={activeTab}
        data={currentData}
        topic={topic}
      />

    </main>
  );
}

export default TopicDetails;