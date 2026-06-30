import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import learningData from "../data/learning";

import TopicTabs from "../components/topic/ui/TopicTabs";
import TopicContent from "../components/topic/TopicContent";
import TopicHeader from "../components/topic/ui/TopicHeader";
import { useLanguage } from "../hooks/useLanguage";
import {
  loadActiveQuizTab,
  persistActiveQuizTab,
} from "../services/quizSessionService";

import "../styles/topicdetails.css";

const buildTopicContent = (topic) => {
  if (topic.content) return topic.content;

  return {
    notes: topic.notes,
    mcq: topic.mcq,
    fillBlanks: topic.fillBlanks,
    translation: topic.translation,
    sentenceCorrection: topic.sentenceCorrection,
    aiPractice: topic.aiPractice,
    "fill-blanks": topic.fillBlanks,
    "sentence-correction": topic.sentenceCorrection,
    "ai-practice": topic.aiPractice,
  };
};

function TopicDetails() {
  const {
    levelSlug,
    subjectSlug,
    topicSlug,
  } = useParams();

  const { setIsLearningPage } = useLanguage();

  const topicId = levelSlug + "/" + subjectSlug + "/" + topicSlug;

  const [activeTab, setActiveTabState] =
    useState(() => loadActiveQuizTab(topicId));

  const setActiveTab = (nextTab) => {
    setActiveTabState(nextTab);
    persistActiveQuizTab(topicId, nextTab);
  };

  const [isReviewMode, setIsReviewMode] =
    useState(false);

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

  const topicContent = buildTopicContent(topic);

  const availableTabs = Object.keys(topicContent).filter(
    (tab) => topicContent[tab]
  );

  const currentData = topicContent[activeTab];

  return (
    <main className="topic-details-page">
      <TopicHeader
        isReviewMode={isReviewMode}
        onBackToNotes={() => {
          setActiveTab("notes");
          setIsReviewMode(false);
        }}
      />

      <TopicTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableTabs={availableTabs}
      />

      <TopicContent
        key={`${activeTab}-${currentData?.length || 0}`}
        activeTab={activeTab}
        data={currentData}
        onReviewModeChange={setIsReviewMode}
        topicId={topicId}
      />
    </main>
  );
}

export default TopicDetails;
