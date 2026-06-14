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
      label: "Notes",
      icon: <FiBookOpen />,
    },

    mcq: {
      label: "MCQ",
      icon: <FiHelpCircle />,
    },

    "fill-blanks": {
      label: "Fill",
      icon: <FiEdit3 />,
    },

    translation: {
      label: "Translation",
      icon: <FiGlobe />,
    },

    "sentence-correction": {
      label: "Correction",
      icon: <FiCheckSquare />,
    },

    "ai-practice": {
      label: "AI",
      icon: <FiCpu />,
    },
  };

  return (
    <section className="topic-tabs">
      {availableTabs.map((tab) => (
        <button
          key={tab}
          className={`topic-tabs__button ${
            activeTab === tab
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(tab)
          }
        >
          <span className="topic-tabs__icon">
            {tabConfig[tab]?.icon}
          </span>

          <span className="topic-tabs__label">
            {tabConfig[tab]?.label}
          </span>
        </button>
      ))}
    </section>
  );
}

export default TopicTabs;