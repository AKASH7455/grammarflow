import {
  FiBookOpen,
  FiHelpCircle,
  FiEdit3,
  FiCpu,
  FiGlobe,
  FiCheckSquare,
} from "react-icons/fi";

function TopicTabs({
  activeTab,
  setActiveTab,
  availableTabs,
}) {
  const tabConfig = {
    notes: {
      id: "notes",
      label: "Notes",
      icon: <FiBookOpen />,
    },
    mcq: {
      id: "mcq",
      label: "MCQ",
      icon: <FiHelpCircle />,
    },
    "fill-blanks": {
      id: "fill-blanks",
      label: "Fill",
      icon: <FiEdit3 />,
    },
    "ai-practice": {
      id: "ai-practice",
      label: "AI",
      icon: <FiCpu />,
    },
    translation: {
      id: "translation",
      label: "Translation",
      icon: <FiGlobe />,
    },
    "sentence-correction": {
      id: "sentence-correction",
      label: "Correction",
      icon: <FiCheckSquare />,
    },
  };

  const tabs = availableTabs
    ? availableTabs.map((tabKey) => tabConfig[tabKey])
    : Object.values(tabConfig);

  return (
    <section className="topic-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`topic-tabs__button ${
            activeTab === tab.id
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(tab.id)
          }
        >
          <span className="topic-tabs__icon">
            {tab.icon}
          </span>

          <span className="topic-tabs__label">
            {tab.label}
          </span>
        </button>
      ))}
    </section>
  );
}

export default TopicTabs;