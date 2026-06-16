import {
  FiBookOpen,
  FiHelpCircle,
  FiEdit3,
  FiCpu,
} from "react-icons/fi";

function TopicTabs({
  activeTab,
  setActiveTab,
  availableTabs = [],
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

    "ai-practice": {
      label: "AI",
      icon: <FiCpu />,
      comingSoon: true,
    },
  };

  const tabsToShow =
    availableTabs.length > 0
      ? availableTabs
      : Object.keys(tabConfig);

  return (
    <section className="topic-tabs">
      {tabsToShow.map((tab) => {
        const config = tabConfig[tab];

        if (!config) return null;

        return (
          <button
            key={tab}
            type="button"
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
              {config.icon}
            </span>

            <span className="topic-tabs__label">
              {config.label}
            </span>

            {config.comingSoon && (
              <span className="topic-tabs__badge">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
}

export default TopicTabs;