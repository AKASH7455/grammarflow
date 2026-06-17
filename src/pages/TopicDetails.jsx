import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import learningData from "../data/learning";

import TopicProgress from "../components/topic/ui/TopicProgress";
import TopicTabs from "../components/topic/ui/TopicTabs";
import TopicContent from "../components/topic/TopicContent";
import TopicHeader from "../components/topic/ui/TopicHeader";
import { useLanguage } from "../hooks/useLanguage";

import "../styles/topicdetails.css";

function TopicDetails() {
  const {
    levelSlug,
    subjectSlug,
    topicSlug,
  } = useParams();

  const { setIsLearningPage } = useLanguage();

  const [activeTab, setActiveTab] =
    useState("notes");

  const level = learningData.find(
    (level) =>
      level.slug === levelSlug
  );

  const subject =
    level?.subjects?.find(
      (subject) =>
        subject.slug === subjectSlug
    );

  const topic =
    subject?.topics?.find(
      (topic) =>
        topic.slug === topicSlug
    );

  useEffect(() => {
    setIsLearningPage(true);
    return () => setIsLearningPage(false);
  }, [setIsLearningPage]);

  if (!topic) {
    return (
      <main className="topic-details-page">
        <h2>Topic Not Found</h2>
      </main>
    );
  }

  const availableTabs =
    Object.keys(topic.content || {});

  const currentData =
    topic.content?.[activeTab];

  return (
    <main className="topic-details-page">
      <TopicHeader />

      <TopicTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableTabs={availableTabs}
      />

      <TopicContent
        key={`${activeTab}-${currentData?.length || 0}`}
        activeTab={activeTab}
        data={currentData}
      />
    </main>
  );
}

export default TopicDetails;