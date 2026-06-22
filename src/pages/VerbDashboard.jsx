import { FiBookOpen, FiZap, FiLayers, FiGrid, FiStar } from "react-icons/fi";

import VerbDashboardCard from "../components/verbs/VerbDashboardCard";
import verbService from "../services/verbService";

import "../styles/verbforms.css";

function VerbDashboard() {
  const dashboardCards = [
    {
      title: "Daily Verbs",
      description: "Today's essential verbs to learn",
      icon: FiZap,
      path: "/verbs/daily",
      count: verbService.getDailyVerbs().length,
      color: "primary"
    },
    {
      title: "Verb Set 1",
      description: "Basic movement and daily actions",
      icon: FiLayers,
      path: "/verbs/set1",
      count: verbService.getVerbsBySet("set1").length,
      color: "blue"
    },
    {
      title: "Verb Set 2",
      description: "Communication and mental actions",
      icon: FiLayers,
      path: "/verbs/set2",
      count: verbService.getVerbsBySet("set2").length,
      color: "green"
    },
    {
      title: "Verb Set 3",
      description: "Education and transaction verbs",
      icon: FiLayers,
      path: "/verbs/set3",
      count: verbService.getVerbsBySet("set3").length,
      color: "purple"
    },
    {
      title: "Verb Set 4",
      description: "Emotions and complex actions",
      icon: FiLayers,
      path: "/verbs/set4",
      count: verbService.getVerbsBySet("set4").length,
      color: "orange"
    },
    {
      title: "Verb Set 5",
      description: "Advanced movement verbs",
      icon: FiLayers,
      path: "/verbs/set5",
      count: verbService.getVerbsBySet("set5").length,
      color: "pink"
    },
    {
      title: "All Verbs",
      description: "Complete verb collection",
      icon: FiGrid,
      path: "/verbs/all",
      count: verbService.getAllVerbs().length,
      color: "gray"
    }
  ];

  return (
    <main className="verb-dashboard-page">
      <section className="verb-dashboard-page__header">
        <div className="verb-dashboard-page__icon-wrapper">
          <div className="verb-dashboard-page__icon">
            <FiBookOpen />
          </div>
        </div>

        <h1 className="verb-dashboard-page__title">Verb Forms</h1>

        <p className="verb-dashboard-page__description">
          Master English verb forms with organized learning sets
        </p>
      </section>

      <section className="verb-dashboard-page__cards">
        {dashboardCards.map((card) => (
          <VerbDashboardCard key={card.path} {...card} />
        ))}
      </section>
    </main>
  );
}

export default VerbDashboard;
